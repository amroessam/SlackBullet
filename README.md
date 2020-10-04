# Simple Pushbullet to Slack integration service

## Steps

1. Signup for pushbullet and activate it on mobile (Android only for SMS)
2. Get websocket key from [pushbullet account settings](https://www.pushbullet.com/#settings/account)
3. Add websocket key to `config.json` under `sockets`
4. Add slack webhook address to `config.json` under `webhook_urls`
5. run the service using `npm run start`
