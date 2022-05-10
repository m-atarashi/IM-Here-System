<<<<<<< HEAD:draft/src/app.js
'use strict'
const http = require('http')
const next = require('next')
const Server = require('socket.io')
const { IncomingWebhook } = require('@slack/webhook');
const sendSlackNotification = require('./scripts/slackNotification')
const WorkingTimeManager = require('./scripts/WorkingTimeManager')


const config = require('js-yaml').load(require('fs').readFileSync('assets/config.yml'))
const memberLocations = {}
config.members.forEach(member => memberLocations[member] = 'HOME')

const workingTimeManagers = {}
config.members.forEach(member => workingTimeManagers[member] = new WorkingTimeManager())

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
        // update user's location
        .on('memberMoved', (member, location) => {
          workingTimeManagers[member].update(location, memberLocations[member])
          sendSlackNotification(webhook, member, config.locations.map(e => e[location]).filter(e => e)[0], config.locations.map(e => e[memberLocations[member]]).filter(e => e)[0], workingTimeManagers[member].workingMinute)
          
          memberLocations[member] = location
          io.emit('updateMemberLocations', memberLocations)
        })
    })
  },
  err => {
    console.error(err)
    process.exit(1)
  }
=======
'use strict'
const http = require('http')
const next = require('next')
const Server = require('socket.io')
const { IncomingWebhook } = require('@slack/webhook');
const sendSlackNotification = require('./scripts/slackNotification')
const WorkingTimeManager = require('./scripts/WorkingTimeManager')


const config = require('js-yaml').load(require('fs').readFileSync('assets/config.yml'))
const memberLocations = {}
config.members.forEach(member => memberLocations[member] = 'HOME')

const workingTimeManagers = {}
config.members.forEach(member => workingTimeManagers[member] = new WorkingTimeManager())

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
        // update user's location
        .on('memberMoved', (member, location) => {
          workingTimeManagers[member].update(location, memberLocations[member])
          // sendSlackNotification(webhook, member, config.locations.map(e => e[location]).filter(e => e)[0], config.locations.map(e => e[memberLocations[member]]).filter(e => e)[0], workingTimeManagers[member].workingMinute)
          
          memberLocations[member] = location
          io.emit('updateMemberLocations', memberLocations)
        })
    })
  },
  err => {
    console.error(err)
    process.exit(1)
  }
>>>>>>> draft_m-atarashi_fix_img_dispalying_problem:src/app.js
)