const Action = require('./Action')

class ActionsController {
  constructor() {
    this.actions = {}
  }

  checkHaveAction(name) {
    if (Object.keys(this.actions).includes(name)) return true
    else return false
  }

  registerAction(name, action) {
    if (typeof name === 'string' && typeof action === 'function') {
      if (!this.checkHaveAction(name)) {
        this.actions[name] = new Action(name, action)
      } else {
        throw new Error(`Action with name "${name}" exists!`)
      }
    } else {
      throw new Error(`Arguments type invalid`)
    }
  }

  runAction(name) {
    if (this.checkHaveAction(name)) {
      return this.actions[name].run
    } else {
      throw new Error(`Action with name "${name}" exists!`)
    }
  }

  deleteAction(name) {
    if (this.checkHaveAction(name)) {
      delete this.actions[name]
    } else {
      throw new Error(`Action with name "${name}" exists!`)
    }
  }

}

module.exports = ActionsController