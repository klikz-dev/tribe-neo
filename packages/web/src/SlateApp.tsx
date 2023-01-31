import { useEffect } from 'react'

import loadable from '@loadable/component'
import { Route, Switch, useLocation } from 'react-router-dom'

import { useAuthToken } from '@tribeplatform/react-sdk/hooks'
import { Container } from '@tribeplatform/react-ui-kit/Layout'
import { ToastContainer } from '@tribeplatform/react-ui-kit/Toast'
import SlateKit from '@tribeplatform/slate-kit'
import { SlateKitProvider } from '@tribeplatform/slate-kit/components'

import { AppInitialProps } from './@types'
import {
  CookieConsent,
  CookieContextProvider,
} from './components/Apps/CookieConsent'
import { DesktopNotification } from './components/DesktopNotification'
import { GenericMeta } from './components/GenericMeta'
import { MainMenu } from './components/MainMenu'
import { Unsubscribe } from './components/Settings/Unsubscribe'
import { ZapierSettings } from './dynamic-block/ZapierSettings'
import { MobileSidebarProvider } from './MobileSidebarProvider'
import {
  ComponentAdder,
  ComponentWrapper,
} from './page-builder/component-editor'
import { Routes } from './page-builder/Routes.component'
import { SLATE_COMPONENTS } from './slate-components'

const CanaryPageBuilder = loadable(
  () => import('./components/CanaryPageBuilder'),
  {
    resolveComponent: components => components.CanaryPageBuilder,
  },
)
const PageEditor = loadable(
  () => import('./page-builder/PageEditor.component'),
  {
    resolveComponent: components => components.PageEditor,
  },
)

const Admin = loadable(() => import('./components/Admin'), {
  resolveComponent: components => components.Admin,
})

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export const SlateApp = ({ pageProps }: { pageProps: AppInitialProps }) => {
  const slateKit = new SlateKit()

  slateKit.registerComponentAdder(ComponentAdder)
  slateKit.registerComponentWrapper(ComponentWrapper)
  slateKit.registerComponents(SLATE_COMPONENTS)
  const {
    data: { network },
  } = useAuthToken({
    useQueryOptions: {
      // this is here to prevent the whole page from re-rendering
      notifyOnChangeProps: ['data'],
    },
  })

  return (
    <SlateKitProvider
      kit={slateKit}
      context={{
        network,
        visitor: pageProps?.authToken?.member,
      }}
    >
      <MobileSidebarProvider navigationSlates={network?.navigationSlates}>
        <GenericMeta />
        <ScrollToTop />
        <DesktopNotification />
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/test-admin">
            <Route path="/test-admin/zapier">
              <div className="bg-surface-200 min-h-screen pb-10">
                {/* <Navbar query="" /> */}
                <Container
                  size="md"
                  className="grid grid-cols-12 gap-3 pt-5 sm:pt-7"
                >
                  <nav
                    className="lg:block lg:col-span-3 xl:col-span-2"
                    aria-label="Sidebar"
                  >
                    <MainMenu />
                  </nav>
                  <main className="col-span-12 lg:col-span-9 xl:col-span-10">
                    <div className="grid grid-cols-12 gap-5">
                      <div className="col-span-12 sm:col-span-8">
                        <ZapierSettings />
                      </div>
                    </div>
                  </main>
                </Container>
              </div>
            </Route>
          </Route>
          <Route path="/settings/notifications/unsubscribe" exact>
            <Unsubscribe />
          </Route>
          <Route path="/builder">
            <CanaryPageBuilder />
          </Route>
          <Route path="/customizer">
            <PageEditor />
          </Route>
          <Route path="/">
            <Routes />
          </Route>
        </Switch>
        <ToastContainer />
        <CookieContextProvider>
          <CookieConsent />
        </CookieContextProvider>
      </MobileSidebarProvider>
    </SlateKitProvider>
  )
}
