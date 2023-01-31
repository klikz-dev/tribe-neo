import os from 'os'
import path from 'path'

import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { Request, Response } from 'express'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import { StaticRouterContext } from 'react-router'
import { StaticRouter } from 'react-router-dom'
import serialize from 'serialize-javascript'

import { App } from '../App'
import { RuntimeConfigs } from '../config'
import { APP_DATA_KEY, STATIC_SERVER_STYLES } from '../constants/app.constants'
import { BASE_THEME } from '../themes/base.theme'
import { ThemeConvertor } from '../themes/theme-convertor'
import { Typography } from '../themes/typography/typography'
import { getThemeColors } from '../themes/utils'
import { getCustomCodesScripts } from './utils/customCodes'

export const renderApp = async (
  req: Request,
  res: Response,
): Promise<{
  html?: string
  context?: StaticRouterContext
}> => {
  const context = {}
  const appProps = res.locals.appInitialProps

  const __TRIBE_DATA__ = serialize({ appProps }, { isJSON: true })

  // We create an extractor from the statsFile
  const extractor = new ChunkExtractor({
    statsFile: path.resolve('build/loadable-stats.json'),
    // razzle client bundle entrypoint is client.js
    entrypoints: ['client'],
  })

  const markup = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter context={context} location={req.url}>
        <App pageProps={appProps} />
      </StaticRouter>
    </ChunkExtractorManager>,
  )

  const helmet = Helmet.renderStatic()
  // collect script tags
  const scriptTags = extractor.getScriptTags()
  // collect "preload/prefetch" links
  const linkTags = extractor.getLinkTags()
  // collect style tags
  const styleTags = extractor.getStyleTags()

  const { headScripts, bodyScripts } = getCustomCodesScripts(
    (appProps as any)?.authToken,
  )
  const { network } = (appProps as any)?.authToken
  const theme = new ThemeConvertor({
    base: BASE_THEME,
    networkOldTheme: network?.themes?.active,
    networkTheme: network?.activeTheme,
  }).toTheme()
  const typography = new Typography(theme)
  const lightColorsStyle = getThemeColors(theme, false)
  const darkColorsStyle = getThemeColors(theme, true)

  const html = `<!doctype html>
  <html ${helmet.htmlAttributes.toString()}>
  <head>
      <script>window.process = ${serialize({ env: RuntimeConfigs })};</script>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style id="${STATIC_SERVER_STYLES}">
      :root {${lightColorsStyle}}
      html.dark {${darkColorsStyle}}
       </style>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${linkTags}
      ${styleTags}
      ${headScripts}
      <style>${typography.toString()}</style>
  </head>
  <body ${helmet.bodyAttributes.toString()}>
      <div id="root">${markup}</div>
      <script id="${APP_DATA_KEY}" type="application/json">${__TRIBE_DATA__}</script>
      <script>
        if('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js')
            .then(function() {});
        }
      </script>
      ${scriptTags}
      ${bodyScripts}
      <div id="headlessui-portal-root"></div>
      ${os && os.hostname ? `<!-- ${os.hostname()} -->` : ''}
  </body>
</html>`
  return { context, html }
}
