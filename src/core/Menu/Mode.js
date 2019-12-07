const utils = require('../../utils/functions')

class Mode {
  constructor(params = {}) {
    const requiredParams = ['time', 'maxKills']
    if (utils.arraysContains(params, requiredParams)) {
      this.time = params.time
      this.maxKills = params.maxKills
    }
  }
}

module.exports = Mode