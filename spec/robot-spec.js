var properties = require('../app/properties')
var Playground = require('../app/classes/playground')
var MessageManager = require('../app/classes/message-manager')
let Robot = require('../app/classes/robot.js')

describe('The Robot', () => {
  beforeEach(() => {
    this.robot = new Robot(
    properties.robot,
    new Playground(properties.playground),
    new MessageManager(properties.messages))
  })

  it('should show "noInitialPlacement" message if user is trying to type move, left, right or report before placing robot', () => {
    expect(this.robot.move()).toEqual(new Error(this.robot._messageManager.getMessage('noInitialPlacement')))
    expect(this.robot.left()).toEqual(new Error(this.robot._messageManager.getMessage('noInitialPlacement')))
    expect(this.robot.right()).toEqual(new Error(this.robot._messageManager.getMessage('noInitialPlacement')))
    expect(this.robot.report()).toEqual(new Error(this.robot._messageManager.getMessage('noInitialPlacement')))
  })

  it('should not set _robotCurrentPosition properties to any values when robot is created and not yet placed', () => {
    expect(this.robot._robotCurrentPosition.xAxis == null &&
    this.robot._robotCurrentPosition.yAxis == null &&
    this.robot._robotCurrentPosition.direction == null).toBe(true)
  })

  it('should NOT set _robotIsPlacedAtLeastOnce to true when robot is created and not yet placed', () => {
    expect(this.robot._robotIsPlacedAtLeastOnce).toBe(false)
  })

  it('should not accept undefined direction when it\'s being placed', () => {
    let xAxis = 0
    let yAxis = 0
    let direction

    expect(this.robot.place(xAxis, yAxis, direction)).toEqual(this.robot._messageManager.getMessage('noDirectionProvided'))
  })

  it('should not accept non string direction when it\'s being placed', () => {
    let xAxis = 0
    let yAxis = 0
    let direction = 0

    expect(this.robot.place(xAxis, yAxis, direction)).toEqual(this.robot._messageManager.getMessage('noStringDirectionProvided'))
  })

  it('should not accept string for X & Y axis when it\'s being placed', () => {
    let xAxis = '0'
    let yAxis = '0'
    let direction = 'south'

    expect(this.robot.place(xAxis, yAxis, direction)).toEqual(this.robot._messageManager.getMessage('noIntAxisProvided'))
  })

  it('should not accept negative values for X & Y axis when it\'s being placed', () => {
    let xAxis = -1
    let yAxis = -1
    let direction = 'south'

    expect(this.robot.place(xAxis, yAxis, direction)).toEqual(this.robot._messageManager.getMessage('noNegativeAxisAllowed'))
  })

  it('should not accept any directions except EAST,NORTH,WEST,SOUTH', () => {
    let xAxis = 0
    let yAxis = 0
    let direction = 'south west'

    expect(this.robot.place(xAxis, yAxis, direction)).toEqual(this.robot._messageManager.getMessage('directionDoesNotExist'))
  })

  it('should not let itself out of playground', () => {
    this.robot._robotCurrentPosition.xAxis = 0
    this.robot._robotCurrentPosition.yAxis = 4
    this.robot._robotCurrentPosition.direction = 'NORTH'

    this.robot.place(this.robot._robotCurrentPosition.xAxis, this.robot._robotCurrentPosition.yAxis, this.robot._robotCurrentPosition.direction)

    expect(this.robot.move()).toEqual(new Error(this.robot._messageManager.getMessage('outOfField')))
  })

  it('should set _robotCurrentPosition properties xAxis, yAxis and direction when it is placed', () => {
    let newPosition = {
      xAxis: 0,
      yAxis: 0,
      direction: 'SOUTH'
    }

    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)

    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis &&
    this.robot._robotCurrentPosition.direction === this.robot._properties.directions.indexOf(newPosition.direction)).toBe(true)
  })

  it('should set _robotIsPlacedAtLeastOnce to true when robot is created and not yet placed', () => {
    let newPosition = {
      xAxis: 0,
      yAxis: 0,
      direction: 'SOUTH'
    }

    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)

    expect(this.robot._robotIsPlacedAtLeastOnce).toBe(true)
  })

  it('should place itself with the new position properties given', () => {
    let newPosition = {
      xAxis: 0,
      yAxis: 0,
      direction: 'SOUTH'
    }
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    expect(this.robot._robotCurrentPosition.xAxis != null &&
    this.robot._robotCurrentPosition.yAxis != null &&
    this.robot._robotCurrentPosition.direction != null).toBe(true)
  })

  it('should make the right move', () => {
    let newPosition = {
      xAxis: 1,
      yAxis: 1
    }
    // if direction is west
    newPosition.direction = 'WEST'
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    this.robot.move()
    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis - 1 &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis &&
    this.robot._properties.directions[this.robot._robotCurrentPosition.direction] === newPosition.direction).toBe(true)

    // if direction is north
    newPosition.direction = 'NORTH'
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    this.robot.move()
    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis + 1 &&
    this.robot._properties.directions[this.robot._robotCurrentPosition.direction] === newPosition.direction).toBe(true)

    // if direction is east
    newPosition.direction = 'EAST'
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    this.robot.move()
    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis + 1 &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis &&
    this.robot._properties.directions[this.robot._robotCurrentPosition.direction] === newPosition.direction).toBe(true)

    // if direction is south
    newPosition.direction = 'SOUTH'
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    this.robot.move()
    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis - 1 &&
    this.robot._properties.directions[this.robot._robotCurrentPosition.direction] === newPosition.direction).toBe(true)
  })

  it('should make the correct left turn', () => {
    let newPosition = {
      xAxis: 0,
      yAxis: 0
    }

    // if direction is west
    newPosition.direction = 'WEST'
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    this.robot.left()
    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis &&
    this.robot._properties.directions[this.robot._robotCurrentPosition.direction] === 'SOUTH').toBe(true)

    // if direction is north
    newPosition.direction = 'NORTH'
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    this.robot.left()
    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis &&
    this.robot._properties.directions[this.robot._robotCurrentPosition.direction] === 'WEST').toBe(true)

    // if direction is east
    newPosition.direction = 'EAST'
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    this.robot.left()
    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis &&
    this.robot._properties.directions[this.robot._robotCurrentPosition.direction] === 'NORTH').toBe(true)

    // if direction is south
    newPosition.direction = 'SOUTH'
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    this.robot.left()
    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis &&
    this.robot._properties.directions[this.robot._robotCurrentPosition.direction] === 'EAST').toBe(true)
  })

  it('should make the correct right turn', () => {
    let newPosition = {
      xAxis: 0,
      yAxis: 0
    }

    // if direction is west
    newPosition.direction = 'WEST'
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    this.robot.right()
    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis &&
    this.robot._properties.directions[this.robot._robotCurrentPosition.direction] === 'NORTH').toBe(true)

    // if direction is north
    newPosition.direction = 'NORTH'
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    this.robot.right()
    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis &&
    this.robot._properties.directions[this.robot._robotCurrentPosition.direction] === 'EAST').toBe(true)

    // if direction is east
    newPosition.direction = 'EAST'
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    this.robot.right()
    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis &&
    this.robot._properties.directions[this.robot._robotCurrentPosition.direction] === 'SOUTH').toBe(true)

    // if direction is south
    newPosition.direction = 'SOUTH'
    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    this.robot.right()
    expect(this.robot._robotCurrentPosition.xAxis === newPosition.xAxis &&
    this.robot._robotCurrentPosition.yAxis === newPosition.yAxis &&
    this.robot._properties.directions[this.robot._robotCurrentPosition.direction] === 'WEST').toBe(true)
  })

  it('should report its position', () => {
    let newPosition = {
      xAxis: 0,
      yAxis: 0,
      direction: 'SOUTH'
    }

    this.robot.place(newPosition.xAxis, newPosition.yAxis, newPosition.direction)
    expect(this.robot.report()).toEqual(
      this.robot._messageManager.buildReportStatusMessage(
        this.robot._robotCurrentPosition.xAxis, this.robot._robotCurrentPosition.yAxis, this.robot._properties.directions[this.robot._robotCurrentPosition.direction]))
  })
})
