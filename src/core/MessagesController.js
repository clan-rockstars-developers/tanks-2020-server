const textEncoding = require('text-encoding')
const Player = require('./Menu/Player')

class MessagesController {
  constructor() {
    this.reader = new textEncoding.TextDecoder("utf-8")
  }

  read(buff) {
    try {
      return this.reader.decode(buff)
    } catch (error) {
      console.error(`Error read buffer: ${error.message}`)
    }
  }

  encode(message) {
    return JSON.stringify(message)
  }

  decode(message) {
    let readed = message instanceof ArrayBuffer ? this.read(message) : message
    if (typeof readed === 'string') {
      try {
        return JSON.parse(readed)
      } catch {
        return readed
      }
    } else {
      throw new Error('Error decode message')
    }
  }

  send(message, player) {
    if (player instanceof Player) {
      player.socket.send(this.encode(message))
    } else {
      throw new Error('Invalid Player')
    }
  }
}

module.exports = MessagesController