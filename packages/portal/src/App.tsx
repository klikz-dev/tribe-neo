import { Redirect, Route, Switch } from 'wouter'

import { Provider } from '@tribeplatform/react-sdk/Provider'
import { ToastContainer } from '@tribeplatform/react-ui-kit/Toast'

import './App.css'
import '@tribeplatform/react-ui-kit/components.min.css'
import './typography.css'
import './variables.css'
import { AuthorizedRoute } from './AuthorizedRoute'
import { LoginContainer, VerifyContainer, LogoutContainer } from './components'
import { CommunitiesList } from './components/Communities'
import { NotFoundContainer } from './components/Error/NotFoundContainer'
import { Navbar } from './components/Navbar'
import { getRuntimeConfigVariable } from './config'
import { UnauthorizedRoute } from './UnauthorizedRoute'
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
      <div className="bg-main-50 min-h-screen">
        <Navbar />
        <Switch>
          <Route path="/">
            <AuthorizedRoute>
              <CommunitiesList />
            </AuthorizedRoute>
          </Route>
          <Route path="/auth/:rest*">
            <Route path="/auth/login">
              <UnauthorizedRoute>
                <LoginContainer />
              </UnauthorizedRoute>
            </Route>
            <Route path="/auth/verify">
              <UnauthorizedRoute>
                <VerifyContainer />
              </UnauthorizedRoute>
            </Route>
            <Route path="/auth/logout">
              <LogoutContainer />
            </Route>
            <Route path="/auth">
              <Redirect to="/auth/login" />
            </Route>
          </Route>
          <Route>
            <NotFoundContainer />
          </Route>
        </Switch>
      </div>
      <ToastContainer />
    </Provider>
  )
}
