const DefaultMode = require('./Modes/Default')

class Room {
  constructor(id, params) {
    this.id = id
    this.players = []
    this.maxPlayers = params.maxPlayers || 10
    this.map = params.map || 'default'
    this.mode = params.mode || new DefaultMode()
  }

  joinPlayer(player) {
    if (this.players.length < this.maxPlayers) {
      this.players.push(player)
    } else {
      throw new Error('No places in game room')
    }
  }

  leavePlayer(player) {
    if (this.players.includes(player)) {
      this.players = this.players.filter(el=>el!==player)
    } else {
      throw new Error('Player not exists!')
    }
  }

}

module.exports = Room