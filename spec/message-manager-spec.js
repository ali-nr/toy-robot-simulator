var properties = require('../app/properties')
var MessageManager = require('../app/classes/message-manager')

describe('The message manager', () => {
  beforeAll(() => {
    this.messageManager = new MessageManager(properties.messages)
  })

  it('should return "appStarted" message', () => {
    expect(this.messageManager.getMessage('appStarted')).toEqual(properties.messages.appStarted)
  })

  it('should return "outOfField" message', () => {
    expect(this.messageManager.getMessage('outOfField')).toEqual(properties.messages.outOfField)
  })

  it('should return "invalidAxisInput" message', () => {
    expect(this.messageManager.getMessage('invalidAxisInput')).toEqual(properties.messages.invalidAxisInput)
  })

  it('should return "noInitialPlacement" message', () => {
    expect(this.messageManager.getMessage('noInitialPlacement')).toEqual(properties.messages.noInitialPlacement)
  })

  it('should return "noIntAxisProvided" message', () => {
    expect(this.messageManager.getMessage('noIntAxisProvided')).toEqual(properties.messages.noIntAxisProvided)
  })

  it('should return "noNegativeAxisAllowed" message', () => {
    expect(this.messageManager.getMessage('noNegativeAxisAllowed')).toEqual(properties.messages.noNegativeAxisAllowed)
  })

  it('should return "noStringDirectionProvided" message', () => {
    expect(this.messageManager.getMessage('noStringDirectionProvided')).toEqual(properties.messages.noStringDirectionProvided)
  })

  it('should return "noDirectionProvided" message', () => {
    expect(this.messageManager.getMessage('noDirectionProvided')).toEqual(properties.messages.noDirectionProvided)
  })

  it('should return "directionDoesNotExist" message', () => {
    expect(this.messageManager.getMessage('directionDoesNotExist')).toEqual(properties.messages.directionDoesNotExist)
  })

  it('should return "invalidCommand" message', () => {
    expect(this.messageManager.getMessage('invalidCommand')).toEqual(properties.messages.invalidCommand)
  })

  it('should return "isPlaced" message', () => {
    expect(this.messageManager.getMessage('isPlaced')).toEqual(properties.messages.isPlaced)
  })

  it('should return "isMoved" message', () => {
    expect(this.messageManager.getMessage('isMoved')).toEqual(properties.messages.isMoved)
  })

  it('should build output message for robot position', () => {
    let currentPosition = {
      xAxis: 0,
      yAxis: 0,
      direction: 'SOUTH'
    }

    expect(this.messageManager.buildReportStatusMessage(currentPosition.xAxis, currentPosition.yAxis, currentPosition.direction))
    .toEqual(`Output: x:${currentPosition.xAxis}, y:${currentPosition.yAxis}, direction:${currentPosition.direction}`)
  })
})
