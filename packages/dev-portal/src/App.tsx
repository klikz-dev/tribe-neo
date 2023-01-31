import './App.css'
import '@tribeplatform/react-ui-kit/components.min.css'
import './typography.css'
import './variables.css'

import { Provider } from '@tribeplatform/react-sdk/Provider'
import { ToastContainer } from '@tribeplatform/react-ui-kit/Toast'

import { getRuntimeConfigVariable } from './config'
import { Routes } from './pages'
import { getGlobalToken } from './utils/masterCookies.utils'

export function App() {
  const globalToken = getGlobalToken()

  const config = {
    baseUrl: getRuntimeConfigVariable('TRIBE_GQL_ENDPOINT'),
    networkDomain: '',
    accessToken: globalToken,
  }

  return (
    <Provider config={config}>
      <Routes />
      <ToastContainer />
    </Provider>
  )
}
