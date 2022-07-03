'use strict'

class StayTimeManager {
  constructor() {
    this.stayTimeMillisec = 0
    this.attendanceTimeMillisec = 0
    this.lastMovedTime = undefined
  }

  init() {
    this.stayTimeMillisec = 0
    this.attendanceTimeMillisec = Date.now()
  }

  setStayMinute() {
    this.stayTimeMillisec = Date.now() - this.attendanceTimeMillisec
  }

  updateLastMovedTime() {
    this.lastMovedTime = new Date()
  }
}

module.exports = StayTimeManager