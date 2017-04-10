/**
 * The Playground class
 */

class Playground {
  constructor (settings) {
    this._originalXAxis = settings.originalXAxis
    this._originalYAxis = settings.originalYAxis
    this._height = settings.height
    this._width = settings.width
  }

  /**
   * Make sure X & Y are within playground range
   * @param {INT} xAxis
   * @param {INT} yAxis
   * @return {Boolean}
   */
  isOutOfField (xAxis, yAxis) {
    if ((xAxis >= this._height || yAxis >= this._width) ||
    (xAxis < 0 || yAxis < 0)) {
      return true
    } else {
      return false
    }
  }

  /**
   * Getters
   */
  get originalXAxis () {
    return this._originalXAxis
  }

  get originalYAxis () {
    return this._originalYAxis
  }

  get height () {
    return this._height
  }

  get width () {
    return this._width
  }
}

module.exports = Playground
