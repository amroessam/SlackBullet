const WebSocket = require('ws')
const axois = require('axios')
const { sockets, webhook_urls } = require('./config')

const registerSocket = function (url, websoket) {
  const ws = new WebSocket(`wss://stream.pushbullet.com/websocket/${websoket}`)

  ws.on('message', function incoming(data) {
    const parsedData = JSON.parse(data)
    console.log(parsedData)
    try {
      axois({
        method: 'post',
        url: url,
        data: {
          text: `\`\`\`${JSON.stringify(parsedData)}\`\`\``,
        },
      })
    } catch (error) {
      console.log(error)
    }
  })
}

webhook_urls.forEach((u) => sockets.forEach((s) => registerSocket(u, s)))
