/* eslint-disable import/no-default-export */
import express from 'express'
import helmet from 'helmet'

import { StaticConfigs } from './config'
import { errorHandler } from './server/middlewares/serverErrorHandler'
import { router } from './server/routes'

const nintyDaysInSeconds = 7776000
const isProduction = StaticConfigs.IS_PROD
const version = StaticConfigs.APP_VERSION
const server = express()

server
  .disable('x-powered-by')
  .use(express.static(StaticConfigs.RAZZLE_PUBLIC_DIR))
  .use(
    helmet({
      frameguard: false,
      contentSecurityPolicy: false,
    }),
  )

if (isProduction) {
  server.use(
    helmet.hsts({
      maxAge: nintyDaysInSeconds,
      includeSubDomains: true,
    }),
  )
}

server
  .use((req, res, next) => {
    res.set('X-Tribe-UI-Version', version)
    next()
  })
  .get('/.well-known/version', (req, res) => res.json({ version }))

server.use(router)
server.use(errorHandler)

export default server
