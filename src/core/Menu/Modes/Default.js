const Mode = require('../Mode')

class DefaultMode {
  constructor () {
    this.params = new Mode({
      time: 1000 * 60 * 15,
      maxKills: Infinity
    })
  }
}

module.exports = DefaultMode