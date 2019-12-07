const Player = require('./Player')

class PlayersController {
  constructor() {
    this.playersInMenu = []
  }
  
  connectPlayer(playerSocket) {
    const newPlayer = new Player(playerSocket)
    this.playersInMenu.push(newPlayer)
    return newPlayer
  }

  getPlayer(socket) {
    const result = this.playersInMenu(el=>el.socket===socket)
    if (result) return result
    else throw new Error('Not Exist Player')
  }

  disconnectPlayer(playerSocket) {
    this.playersInMenu.filter(el=>el!==playerSocket.socket)
  }
}

module.exports = PlayersController