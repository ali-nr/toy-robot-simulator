var properties = require('../properties')
var Playground = require('./playground')
var MessageManager = require('./message-manager')
var Robot = require('./robot')

/**
 * This class is responsible for simulating the toy robot app.
 * It needs an instance of the robot and will use its methods
 */

class ToyRobotProgram {
  constructor () {
    this._stdout = process.stdout
    this._stdin = process.stdin
    this._robot = new Robot(
    properties.robot,
    new Playground(properties.playground),
    new MessageManager(properties.messages)
    )
  }

  run () {
    this._stdout.write(this._robot.messageManager.getMessage('appStarted') + '\n')
    this._stdin.resume()
    this._stdin.setEncoding('utf8')
    this._stdin.on('data', input => {
      this._processCommand(input)
    })
  }

  _processCommand (cliInput) {
    let command = cliInput.trim()
    if (command.match(/(q|quit|exit)/i)) {
      process.exit()
    }

    /**
     * PLACE X, Y, Direction/Face
     * PlACE Direction/Face (X & Y are taken from original x,y values of playground)
     * MOVE
     * LEFT
     * RIGHT
     * REPORT
     */
    let commandArgs = command.split(/[ ,]+/)
    let direction
    let axisValues = []

    // grabs the arguments of the place command
    for (let i = 1; i < commandArgs.length; i++) {
      if (!Number.isInteger(parseInt(commandArgs[i]))) { // grabs direction
        direction = commandArgs[i].toUpperCase()
      } else { // grabs X & Y
        axisValues.push(commandArgs[i])
      }
    }
    // If X & Y not provided, use the original playground values
    let xAxis = !axisValues[0] ? this._robot.playground.originalXAxis : parseInt(axisValues[0])
    let yAxis = !axisValues[1] ? this._robot.playground.originalYAxis : parseInt(axisValues[1])
    let result = ''
    switch (commandArgs[0].toUpperCase()) {
      case this._robot.properties.commands[0]:// PLACE
        result = this._robot.place(xAxis, yAxis, direction)
        this._stdout.write(result + '\n')
        break
      case this._robot.properties.commands[1]:// MOVE
        result = this._robot.move()
        this._stdout.write(result + '\n')
        break
      case this._robot.properties.commands[2]:// LEFT
        result = this._robot.left()
        this._stdout.write(result + '\n')
        break
      case this._robot.properties.commands[3]:// RIGHT
        result = this._robot.right()
        this._stdout.write(result + '\n')
        break
      case this._robot.properties.commands[4]:// REPORT
        result = this._robot.report()
        this._stdout.write(result + '\n')
        break
      default: // Invalid command
        result = this._robot.messageManager.getMessage('invalidCommand')
        this._stdout.write(result + '\n')
        break
    }
  }
}

module.exports = ToyRobotProgram
