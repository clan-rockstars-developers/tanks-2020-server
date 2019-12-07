class Tick {
  constructor() {
    this.timer = false
  }

  run(getClients, task, interval = 1000 / 50) {
    if (this.timer) return
    this.timer = setInterval(() => this.tick(getClients, task), interval);
  }

  close() {
    clearInterval(this.timer)
    this.timer = false
  }

  tick(getClients, handler = client => client.send('Tick')) {
    const clients = getClients()
    if (!clients.length) return this.close()
    getClients().forEach(handler)
  }
}

module.exports = Tick