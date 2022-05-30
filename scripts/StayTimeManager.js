'use strict'

class StayTimeManager {
  constructor() {
    this.stayMinute = 0
    this.attendanceMinute = 0
    this.lastMovedTime = undefined
  }

  getCurrentMinute() {
    const date = new Date()
    return date.getDate()*24*60 + date.getHours()*60 + date.getMinutes() + date.getSeconds()/60
  }

  init() {
    this.stayMinute = 0
    this.attendanceMinute = this.getCurrentMinute()
  }

  setStayMinute() {
    this.stayMinute = this.getCurrentMinute() - this.attendanceMinute
  }

  updateLastMovedTime() {
    this.lastMovedTime = new Date()
  }
}

module.exports = StayTimeManager