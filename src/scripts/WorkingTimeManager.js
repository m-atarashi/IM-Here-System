'use strict'

class WorkingTimeManager {
  constructor() {
    this.workingMinute = 0
    this.attendanceMinute = 0
  }

  getCurrentMinute() {
    const date = new Date()
    return date.getDate()*24*60 + date.getHours()*60 + date.getMinutes() + date.getSeconds()/60
  }

  update(currentLocation, prevLocation) {
    if (prevLocation === 'HOME') {
      this.workingMinute = 0
      this.attendanceMinute = this.getCurrentMinute()
    }
    if (currentLocation === 'OUT') this.workingMinute +=  this.getCurrentMinute() - this.attendanceMinute
    if (prevLocation === 'OUT') this.attendanceMinute = this.getCurrentMinute()
    if (currentLocation === 'HOME') this.workingMinute += this.getCurrentMinute() - this.attendanceMinute
  }
}

module.exports = WorkingTimeManager