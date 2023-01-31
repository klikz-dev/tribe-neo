/* eslint-disable import/no-default-export, no-console, global-require */
import fs from 'fs'
import https from 'https'

import express from 'express'

import { ServerOnlyConfigs, StaticConfigs } from './config'

let server = require('./server').default

if (module.hot) {
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...')
    try {
      server = require('./server').default
    } catch (error) {
      console.error(error)
    }
  })
  console.info('✅  Server-side HMR Enabled!')
}

const port = ServerOnlyConfigs.PORT
const sslPort = ServerOnlyConfigs.SSL_PORT
const isProduction = StaticConfigs.IS_PROD

const app = express().use((req, res) => server.handle(req, res))

if (!isProduction) {
  const credentials = {
    key: fs.readFileSync('certs/star_dev_tribe_so.key', 'utf8'),
    cert: fs.readFileSync('certs/star_dev_tribe_so.crt', 'utf8'),
  }
  https.createServer(credentials, app).listen(sslPort, () => {
    console.log(`> Started SSL on port ${sslPort}`)
  })
}

export default app.listen(port, () => {
  console.log(`> Started on port ${port}`)
})
