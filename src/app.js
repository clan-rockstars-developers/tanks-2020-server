const uWS = require('uWebSockets.js')
const port = 9001
const textEncoding = require('text-encoding')
const TextDecoder = new textEncoding.TextDecoder("utf-8");

const Tick = require('./tick')

let client = []

const ticker = new Tick()

const app = uWS.App().ws('/*', {
  /* Options */
  compression: 0,
  maxPayloadLength: 16 * 1024 * 1024,
  idleTimeout: 10,
  /* Handlers */
  open: (ws, req) => {
    ws.send('New client')
    client.push(ws)
    ticker.run(()=>client,(client)=>client.send('Hello'), 1000 / 2)
  },
  message: (ws, message, isBinary) => {
    // let ok = ws.send(message, isBinary);
    console.log(TextDecoder.decode(message))
  },
  drain: (ws) => {
    console.log('WebSocket backpressure: ' + ws.getBufferedAmount())
  },
  close: (ws, code, message) => {
    client = client.filter(el=>el!==ws)
    console.log('WebSocket closed')
  }
}).any('/*', (res, req) => {
  res.end('Nothing to see here!')
}).listen(port, (token) => {
  if (token) {
    console.log('Listening to port ' + port)
  } else {
    console.log('Failed to listen to port ' + port)
  }
})