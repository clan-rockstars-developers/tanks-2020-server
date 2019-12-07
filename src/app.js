const uWS = require('uWebSockets.js')
const config = require('./config')

const PlayersController = require('./core/Menu/PlayersController')
const MessageController = require('./core/MessagesController')
const ActionsController = require('./core/Actions/ActionsController')

const playersController = new PlayersController()
const messageController = new MessageController()
const actionsController = new ActionsController()

actionsController.registerAction('register', ({name}) => {
  console.log(name)
})

const app = uWS.App().ws('/*', {
  /* Options */
  compression: 0,
  maxPayloadLength: 16 * 1024 * 1024,
  idleTimeout: 300,
  /* Handlers */
  open: (ws, req) => {
    console.log(messageController.decode(ws.getRemoteAddress()))
    messageController.send({action: 'init'}, playersController.connectPlayer(ws))
    // client.push(ws)
    // ticker.run(()=>client,(client)=>client.send('Hello'), 1000 / 2)
  },
  message: (ws, message, isBinary) => {
    const {action, data} = messageController.decode(message)
    if (action && data) {
      actionsController.runAction(action)(data)
    }
  },
  drain: (ws) => {
    console.log('WebSocket backpressure: ' + ws.getBufferedAmount())
  },
  close: (ws, code, message) => {
    playersController.disconnectPlayer(ws)
    console.log('WebSocket closed')
  }
}).any('/*', (res, req) => {
  res.end('Nothing to see here!')
}).listen(config.port, (token) => {
  if (token) { console.log('Listening to port ' + config.port) }
  else { console.log('Failed to listen to port ' + config.port) }
})