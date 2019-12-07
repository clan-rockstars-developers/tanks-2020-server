class Action {
  constructor(name, action) {
    this.name = name
    this.action = action
  }

  run = (data) => {
    try {
      this.action(data)
    } catch (error) {
      throw new Error(`Can't run Action '${this.name}', error: ${error.message}`)
    }
  }

}

module.exports = Action