/**
 * The properties Object consists of static data for:
 * Robot class
 * MessageManager class
 * Playground class
 */

let properties = {}

properties.playground = {
  originalXAxis: 0,
  originalYAxis: 0,
  height: 5,
  width: 5
}

properties.messages = {
  appStarted: 'Hi, please start by placing the robot on the playground, using command PLACE X, Y, F. X & Y are positive integers, and F is one fo the following: WEST, NORTH, EAST, SOUTH',
  outOfField: "Oops, you can't drop the robot out of the field, please make another move",
  invalidAxisInput: 'Oops, a and y values should be positive and within the range of field',
  noInitialPlacement: 'Oops, you have to first place the robot in the playground, please try again!',
  noIntAxisProvided: 'Oops, x & y axis have to be numbers',
  noNegativeAxisAllowed: 'Oops, axis values have to be positive integers',
  noStringDirectionProvided: 'Oops, direction/face has to be a string (WEST, NORTH, EAST, SOUTH)',
  noDirectionProvided: 'Oops, you have to provide one of these directions/faces: WEST, NORTH, EAST, SOUTH',
  directionDoesNotExist: 'Oops, the direction/face you have entered does not exist. It should be one of these: WEST, NORTH, EAST, SOUTH',
  invalidCommand: 'Oops, the command is invalid, please try again',
  isPlaced: 'Robot is placed!',
  isMoved: 'Robot has been moved',
  hasTurnedRight:'Robot has turned right',
  hasTurnedLeft: 'Robot has turned left',
  reportStatus: function (xAxis, yAxis, direction) {
    return `Output: x:${xAxis}, y:${yAxis}, direction:${direction}`
  }
}

properties.robot = {
  commands: ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'],
  directions: ['WEST', 'NORTH', 'EAST', 'SOUTH']
}

module.exports = properties
