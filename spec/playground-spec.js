var properties = require('../app/properties')
var Playground = require('../app/classes/playground')

describe('The playground', () => {
  beforeAll(() => {
    this.playground = new Playground(properties.playground)
  })

  it('should return true if xAxis is out of field', () => {
    expect(this.playground.isOutOfField(this.playground.height, 0)).toBe(true)
  })

  it('should return true if yAxis is out of field', () => {
    expect(this.playground.isOutOfField(0, this.playground.width)).toBe(true)
  })

  it('should return true if xAxis and yAxis are out of field', () => {
    expect(this.playground.isOutOfField(this.playground.height, this.playground.width)).toBe(true)
  })

  it('should return false if xAxis and yAxis are in the field', () => {
    expect(this.playground.isOutOfField(--this.playground.height, --this.playground.width)).toBe(false)
  })
})
