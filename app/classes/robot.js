/**
 * The Robot class
 */

class Robot {
  constructor (properties, playground, messageManager) {
    this._properties = properties
    this._playground = playground
    this._messageManager = messageManager
    this._robotIsPlacedAtLeastOnce = false // determines if the robot has been placed yet
    this._robotCurrentPosition = { // robot's position props are null until it is placed
      xAxis: null,
      yAxis: null,
      direction: null // robot's direction will be saved as an int, it references indexs in properties.robot.directions
    }
  }

  /**
   * Place the robot
   * @param {INT} xAxis
   * @param {INT} yAxis
   * @param {String} direction [WEST,NORTH,EAST,SOUTH]
   * @return {String|Error} if successful, it returns success message, else returns error
   */
  place (xAxis, yAxis, direction) {
    try {
      // validate user input before continuing
      this._validateInputs(xAxis, yAxis, direction)
    } catch (error) {
      return error.message
    }

    // robot should be insidne the field
    if (this._playground.isOutOfField(xAxis, yAxis)) {
      return this._isOutOfField()
    }
    // set robot's position
    this._setRobotCurrntPosition(xAxis, yAxis, direction)

    // robot has now been placed
    this._robotIsPlacedAtLeastOnce = true

    // let user know that robot is placed
    return this._messageManager.getMessage('isPlaced')
  }

  /**
   * Rotate robot to the left
   * @return {String|Error} if successful, it returns success message, else returns error
   */
  left () {
    // make sure robot is placed already
    if (!this._robotIsPlacedAtLeastOnce) {
      return this._noInitialPlacement()
    }
    switch (this._robotCurrentPosition.direction) {
      case 0:// WEST
        this._robotCurrentPosition.direction = this._properties.directions.length - 1
        break
      default: // NORTH, EAST, SOUTH
        this._robotCurrentPosition.direction--
        break
    }
    // let user know that robot has rotated to the left
    return this._messageManager.getMessage('hasTurnedLeft')
  }

  /**
   * Rotate robot to the right
   * @return {String|Error} if successful, it returns success message, else returns error
   */
  right () {
    // make sure robot is placed already
    if (!this._robotIsPlacedAtLeastOnce) {
      return this._noInitialPlacement()
    }
    switch (this._robotCurrentPosition.direction) {
      case (this._properties.directions.length - 1):// SOUTH
        this._robotCurrentPosition.direction = 0
        break
      default:// WEST,NORTH,EAST
        this._robotCurrentPosition.direction++
        break
    }
    // let user know that robot has rotated to the right
    return this._messageManager.getMessage('hasTurnedRight')
  }

  /**
   * Move robot based on its direction
   * @return {String|Error} if successful, it returns success message, else returns error
   */
  move () {
    // make sure robot is placed already
    if (!this._robotIsPlacedAtLeastOnce) {
      return this._noInitialPlacement()
    }

    let xAxis = this._robotCurrentPosition.xAxis
    let yAxis = this._robotCurrentPosition.yAxis
    let direction = this._properties.directions[this._robotCurrentPosition.direction]

    switch (this._robotCurrentPosition.direction) {
      case 0:// WEST
        xAxis--
        break
      case 1:// NORTH
        yAxis++
        break
      case 2:// EAST
        xAxis++
        break
      case 3:// SOUTH
        yAxis--
        break
    }

    // robot should be insidne the field
    if (this._playground.isOutOfField(xAxis, yAxis)) {
      return this._isOutOfField()
    }

    // set robot's new position
    this._setRobotCurrntPosition(xAxis, yAxis, direction)

    return this._messageManager.getMessage('isMoved')
  }

  /**
   * Report robot's current position
   * @return {String|Error} if successful, it returns a report of robot's position, else returns error
   */
  report () {
    // make sure robot is placed already
    if (!this._robotIsPlacedAtLeastOnce) {
      return this._noInitialPlacement()
    }
    // build the report
    return this._messageManager.buildReportStatusMessage(this._robotCurrentPosition.xAxis,
    this._robotCurrentPosition.yAxis,
    this._properties.directions[this._robotCurrentPosition.direction])
  }

  // Private methods

  /**
   * validate user input
   * @param {INT} xAxis
   * @param {INT} yAxis
   * @param {String} direction [WEST,NORTH,EAST,SOUTH]
   */
  _validateInputs (xAxis, yAxis, direction) {
    // direction is needed
    if (direction === undefined) {
      throw new Error(this._messageManager.getMessage('noDirectionProvided'))
    }
    // direction has to be string
    if (typeof direction !== 'string') {
      throw new Error(this._messageManager.getMessage('noStringDirectionProvided'))
    }
    // X & Y cannot be string
    if (!Number.isInteger(xAxis) || !Number.isInteger(yAxis)) {
      throw new Error(this._messageManager.getMessage('noIntAxisProvided'))
    }
    // X & Y need to be positive
    if (xAxis < 0 || yAxis < 0) {
      throw new Error(this._messageManager.getMessage('noNegativeAxisAllowed'))
    }
    // direction must be one of [WEST,NORTH,EAST,SOUTH]
    if (this._properties.directions.indexOf(direction) === -1) {
      throw new Error(this._messageManager.getMessage('directionDoesNotExist'))
    }
  }

  /**
   * Make sure X & Y are within playground range
   * @param {INT} xAxis
   * @param {INT} yAxis
   */
  _isOutOfFiled (xAxis, yAxis) {
    if (this._playground.isOutOfField(xAxis, yAxis)) {
      throw new Error(this._messageManager.getMessage('outOfField'))
    }
  }

  /**
   * Set robot's position
   * @param {INT} xAxis
   * @param {INT} yAxis
   * @param {String} direction [WEST,NORTH,EAST,SOUTH]
   */
  _setRobotCurrntPosition (xAxis, yAxis, direction) {
    this._robotCurrentPosition.xAxis = xAxis == null ? this._playground.originalXAxis : xAxis
    this._robotCurrentPosition.yAxis = yAxis == null ? this._playground.originalYAxis : yAxis
    this._robotCurrentPosition.direction = this._properties.directions.indexOf(direction.toUpperCase())
  }

  /**
   * Get noInitialPlacement message
   */
  _noInitialPlacement () {
    return new Error(this._messageManager.getMessage('noInitialPlacement'))
  }

  /**
   * Get outOfField message
   */
  _isOutOfField () {
    return new Error(this._messageManager.getMessage('outOfField'))
  }

  /**
 * Getters
 */
  get messageManager () {
    return this._messageManager
  }

  get properties () {
    return this._properties
  }

  get playground () {
    return this._playground
  }
}

module.exports = Robot
