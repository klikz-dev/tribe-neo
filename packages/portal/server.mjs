import { error, log } from 'console'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import ejs from 'ejs'
import express from 'express'

// eslint-disable-next-line no-restricted-imports
import { RuntimeConfigs, StaticConfigs } from './dist/src/config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const boot = index => {
  const server = express()

  server
    .disable('x-powered-by')
    .get('/.well-known/version', (req, res) =>
      res.json({
        version: StaticConfigs.APP_VERSION,
      }),
    )
    .use(
      express.static(path.resolve(__dirname, './dist/client'), {
        index: false,
      }),
    )
    .get('*', (req, res) => {
      res.send(index)
    })

  const port = process.env.PORT || 4003

  server.listen(port, () => {
    log({
      RuntimeConfigs,
      StaticConfigs,
    })
    log(`> Started on port ${port}`)
  })
}

ejs
  .renderFile(path.resolve(__dirname, './dist/client/index.html'), {
    env: RuntimeConfigs,
  })
  .then(boot)
  .catch(e => {
    error(e)
    process.exit(1)
  })
