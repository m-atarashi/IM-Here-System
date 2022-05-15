'use strict'

const http = require('http')
const next = require('next')
const Server = require('socket.io')
const { IncomingWebhook } = require('@slack/webhook');
const sendSlackNotification = require('./scripts/slackNotification')
const WorkingTimeManager = require('./scripts/WorkingTimeManager')


const config = require('js-yaml').load(require('fs').readFileSync('public/config.yml'))
const members = Object.keys(config.members)

const memberLocations = {}
members.forEach(member => memberLocations[member] = 'HOME')
const workingTimeManagers = {}
members.forEach(member => workingTimeManagers[member] = new WorkingTimeManager())

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
      socket.emit('sendConfig', config)
      socket
        .on('memberMoved', (member, location) => {
          workingTimeManagers[member].update(location, memberLocations[member])
          //sendSlackNotification(webhook, member, config.locations.map(e => e[location]).filter(e => e)[0], config.locations.map(e => e[memberLocations[member]]).filter(e => e)[0], workingTimeManagers[member].workingMinute)
          // update user's location
          memberLocations[member] = location
          io.emit('updateMemberLocations', memberLocations)
        })
    })
  },
  err => {
    console.error(err)
    process.exit(1)
  }
)