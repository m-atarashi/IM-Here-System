'use strict'

const http = require('http')
const next = require('next')
const Server = require('socket.io')
const { IncomingWebhook } = require('@slack/webhook');
const { notifyLocation, notifyInClassTurned } = require('./scripts/slackNotification')
const WorkingTimeManager = require('./scripts/WorkingTimeManager')


const config = require('js-yaml').load(require('fs').readFileSync('public/config.yml'))
const members = Object.keys(config.members)

const memberLocations = members.reduce((obj, member, _) => {obj[member] = 'HOME'; return obj}, {})
const membersInClass = members.reduce((obj, member, _) => {obj[member] = false; return obj}, {})
const workingTimeManagers = members.reduce((obj, member, _) => {obj[member] = new WorkingTimeManager(); return obj}, {})

const getLocationSlackDisplayName = (location) => config.locations.filter(e => e[location])[0][location]

const webhook = new IncomingWebhook(config.slackWebhookURL)

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
nextApp.prepare().then(
  () => {
    const server = http.createServer(nextApp.getRequestHandler()).listen(3000)
    const io = Server(server)

    io.on('connection', socket => {
      // send data to a new connected client
      socket.emit('updateMemberLocations', memberLocations)
      socket.emit('updateMembersInClass', membersInClass)
      socket.emit('sendConfig', config)
      socket
        .on('memberMoved', (member, location) => {
          const prevLoc = memberLocations[member]
          const workingTimeManager = workingTimeManagers[member]
          
          // come to school
          if (prevLoc === 'HOME') workingTimeManager.init()
          // go home
          if (location === 'HOME') {
            workingTimeManager.setWorkingMinute()
            workingTimeManager.updateLastMovedTime()
            // turn off class toggle
            membersInClass[member] = false
            io.emit('updateMembersInClass', membersInClass)
          }

          // notify to Slack
          //notifyLocation(webhook, member, getLocationSlackDisplayName(prevLoc), getLocationSlackDisplayName(location), workingTimeManager)
          workingTimeManager.updateLastMovedTime()

          // update a member's location
          memberLocations[member] = location
          io.emit('updateMemberLocations', memberLocations)
        })
        .on('classTurned', (member, location) => {
          // update a member is in class or not
          membersInClass[member] = !membersInClass[member]
          // notify to Slack
          const currentLoc = getLocationSlackDisplayName(location)
          //notifyInClassTurned(webhook, member, currentLoc, membersInClass[member])
          
          io.emit('updateMembersInClass', membersInClass)
        })
    })
  },
  err => {
    console.error(err)
    process.exit(1)
  }
)
