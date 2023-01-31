import { loadableReady } from '@loadable/component'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { APP_DATA_KEY } from './constants/app.constants'

const appDataScript = document.getElementById(APP_DATA_KEY)
let appData
try {
  appData = JSON.parse(appDataScript.innerHTML)
  appDataScript.remove()
} catch (e) {
  appData = {}
}

// Load all components needed before rendering
loadableReady().then(() => {
  hydrate(
    <BrowserRouter>
      <App pageProps={appData?.appProps} />
    </BrowserRouter>,
    document.getElementById('root'),
  )
})

if (module.hot) {
  module.hot.accept()
}
