let ToyRobotProgram = require('./classes/toy-robot-program')

/**
 * This is the main app class that initiates the toy robot program
 */

class App {
  constructor () {
    this._toyRobotProgram = new ToyRobotProgram()
  }

  runApp () {
    this._toyRobotProgram.run()
  }
}

module.exports = App
