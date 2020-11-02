const WebSocket = require('ws')
const axois = require('axios')
const { sockets, webhook_urls } = require('./config')
const { parse } = require('yargs')
const argv = require('yargs').alias('s', 'socket').alias('w', 'webhook').argv

const registerSocket = function (url, websoket) {
  const ws = new WebSocket(`wss://stream.pushbullet.com/websocket/${websoket}`)

  ws.on('message', function incoming(data) {
    const parsedData = JSON.parse(data)
    console.log(parsedData)
    if (
      parsedData.type &&
      parsedData.type === 'push' &&
      parsedData.push &&
      parsedData.push.notifications &&
      parsedData.push.notifications.length > 0
    )
      parsedData.push.notifications.forEach((notification) => {
        try {
          axois({
            method: 'post',
            url: url,
            data: {
              text: `${notification.title}:\n${notification.body}`,
              icon_emoji: ':envelope:'
            },
          })
        } catch (error) {
          console.log(error)
        }
      })
  })
  ws.on('error', function(e) {
    console.log("Pushbulletr error: ", e);
  });
}
if (argv.w && argv.s) [argv.w].forEach((u) => [argv.s].forEach((s) => registerSocket(u, s)))
else if (!argv.w && !argv.s && sockets.length > 0 && webhook_urls.length > 0)
  webhook_urls.forEach((u) => sockets.forEach((s) => registerSocket(u, s)))
