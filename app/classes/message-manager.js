/**
 * The Message Manager class
 */

class MessageManager {
  constructor (messages) {
    this._messages = messages
  }

  /**
   * Get specified message
   * @param {String} message // message identifier
   * @return {String}
   */
  getMessage (message) {
    return this._messages[message]
  }

  /**
   * build robot output
   * @param {INT} xAxis
   * @param {INT} yAxis
   * @param {String} direction
   * @return {String}
   */
  buildReportStatusMessage (xAxis, yAxis, direction) {
    return this._messages.reportStatus(xAxis, yAxis, direction)
  }
}

module.exports = MessageManager
