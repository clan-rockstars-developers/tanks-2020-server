const Room = require('./Room')

class Rooms {
  constructor() {
    this.idIncr = 0
    this.rooms = {}
  }

  getAll() {
    return Object.values(this.rooms)
  }

  createRoom() {
    const roomId = this.idIncr++
    this.rooms[roomId] = new Room(roomId, {
      maxPlayers: 16,

    })
  }

  removeRoom(id) {
    delete this.rooms[id]
  }

  getRoom(id) {
    return this.rooms[id]
  }
  
}

module.exports = Rooms