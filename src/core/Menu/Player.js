const Room = require('./Room')

class Player {
  constructor(socket) {
    this.status = 'in_menu'
    this.location = false
    this.socket = socket
  }
  joinRoom(room) {
    try {
      room.joinPlayer(this)
      this.status = 'in_room'
      this.location = room
      return {status:true}
    } catch (error) {
      return {status:false, message: error.message}
    }
  }

  leaveRoom() {
    if (this.status === 'in_room' && this.location instanceof Room) {
      try {
        this.location.leavePlayer(this)
      } catch (error) {
        console.error(error.message)
      }
    } else {
      throw new Error('The player is not in the room!')
    }
  }
}

module.exports = Player