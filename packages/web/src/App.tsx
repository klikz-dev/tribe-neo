import './lib/wdyr'
import './App.css'
import '@tribeplatform/react-ui-kit/components.min.css'

import loadable from '@loadable/component'
import axios from 'axios'

import { ApiErrorCodes } from '@tribeplatform/gql-client'
import { AuthToken } from '@tribeplatform/gql-client/types'
import { Hydrate, Provider } from '@tribeplatform/react-sdk'

import { AppInitialProps } from './@types'
import { RuntimeConfigs } from './config'
import { Intercom } from './lib/intercom/provider'
import { ThemeProvider } from './themes/ThemeProvider.component'
import { TribeWeb } from './TribeWeb'

const SlateApp = loadable(() => import('./SlateApp'), {
  resolveComponent: module => module.SlateApp,
})

export const App = ({ pageProps }: { pageProps: AppInitialProps }) => (
  <Provider
    config={{
      baseUrl: RuntimeConfigs.TRIBE_GQL_ENDPOINT,
      networkDomain: pageProps?.authToken?.network?.domain,
      accessToken: pageProps?.authToken?.accessToken,
      onError: async (errors, client) => {
        try {
          const isInvalidToken =
            Array.isArray(errors) &&
            errors?.some(e => e.code === ApiErrorCodes.INVALID_ACCESS_TOKEN)

          if (isInvalidToken) {
            const response = await axios.post<AuthToken>(
              '/api/auth/refresh-token',
              {
                networkDomain: pageProps?.authToken?.network?.domain,
              },
            )

            if (response?.data) {
              client.setToken(response.data.accessToken)
            }
          }
        } catch (e) {
          console.warn(
            'Could not update the access token on global error handler',
            e,
          )
        }
      },
    }}
  >
    <Hydrate state={pageProps.dehydratedState}>
      <Intercom authToken={pageProps?.authToken}>
        <ThemeProvider>
          <TribeWeb pageProps={pageProps}>
            <SlateApp pageProps={pageProps} />
          </TribeWeb>
        </ThemeProvider>
      </Intercom>
    </Hydrate>
  </Provider>
)
