"use strict";

const http = require("http");
const next = require("next");
const Server = require("socket.io");
const { IncomingWebhook } = require("@slack/webhook");
const {
  notifyLocation,
  notifyInClassTurned,
} = require("./scripts/slackNotification");
const StayTimeManager = require("./scripts/StayTimeManager");

const config = require("./public/config.json");
const members = config.members.map((e) => Object.keys(e)[0]);
const memberLocations = members.reduce((obj, member, _) => {
  obj[member] = "HOME";
  return obj;
}, {});
const membersInClass = members.reduce((obj, member, _) => {
  obj[member] = false;
  return obj;
}, {});
const stayTimeManagers = members.reduce((obj, member, _) => {
  obj[member] = new StayTimeManager();
  return obj;
}, {});

const getLocationSlackDisplayName = (location) =>
  config.locations.filter((e) => e[location])[0][location];
const webhook =
  config.slackWebhookURL === ""
    ? undefined
    : new IncomingWebhook(config.slackWebhookURL);

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
nextApp.prepare().then(
  () => {
    const server = http.createServer(nextApp.getRequestHandler()).listen(3000);
    const io = Server(server);

    io.on("connection", (socket) => {
      // send data to a new connected client
      socket.emit("updateMemberLocations", memberLocations);
      socket.emit("updateMembersInClass", membersInClass);

      socket
        .on("memberMoved", (member, location) => {
          const prevLoc = memberLocations[member];
          const stayTimeManager = stayTimeManagers[member];

          if (prevLoc === location) return;
          // come to school
          if (prevLoc === "HOME") stayTimeManager.init();
          // go home
          if (location === "HOME") {
            stayTimeManager.setStayMinute();
            stayTimeManager.updateLastMovedTime();
            // turn off class toggle
            membersInClass[member] = false;
            io.emit("updateMembersInClass", membersInClass);
          }

          // notify to Slack
          notifyLocation(
            webhook,
            member,
            getLocationSlackDisplayName(prevLoc),
            getLocationSlackDisplayName(location),
            stayTimeManager
          );
          // update stay time
          stayTimeManager.updateLastMovedTime();
          // update a member's location
          memberLocations[member] = location;

          io.emit("updateMemberLocations", memberLocations);
        })
        .on("classTurned", (member, location) => {
          // update whether the member is in class or not
          membersInClass[member] = !membersInClass[member];
          // notify to Slack
          notifyInClassTurned(
            webhook,
            member,
            getLocationSlackDisplayName(location),
            membersInClass[member]
          );

          io.emit("updateMembersInClass", membersInClass);
        });
    });
  },
  (err) => {
    console.error(err);
    process.exit(1);
  }
);
