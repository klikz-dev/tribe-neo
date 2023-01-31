import { createContext, useMemo } from 'react'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { useApp, useAuthToken } from '@tribeplatform/react-sdk/hooks'

import { DefaultApps } from '../DefaultApps'
import { getCookieSettings } from './utils/cookie-settings'

type CookieContextProps = {
  isCookieInstalled: boolean
  shouldShowCookiePopup: boolean
  shouldAnonymizeTracking: boolean
}

export const CookieContext = createContext<CookieContextProps>({
  isCookieInstalled: false,
  shouldShowCookiePopup: false,
  shouldAnonymizeTracking: false,
})

export const CookieContextProvider = ({ children }) => {
  const {
    data: { network },
  } = useAuthToken()
  const [hasFetchAppAccess] = hasScopesPermission(network, ['app'])

  const { data: cookieConsentApp, isLoading: loading } = useApp({
    variables: {
      slug: DefaultApps.CookieConsentManager,
    },
    useQueryOptions: {
      enabled: typeof window !== 'undefined' && hasFetchAppAccess,
    },
  })
  const cookieSettings = getCookieSettings()
  const isCookieInstalled = useMemo(
    () => Boolean(!loading && cookieConsentApp?.installed),
    [cookieConsentApp, loading],
  )
  // const { isEnabled: cookieFeatureEnabled } = useTribeFeature(
  //   Features.CookieConsentManager,
  // )
  const cookieFeatureEnabled = true

  const shouldShowCookiePopup = useMemo(
    () =>
      Boolean(
        cookieFeatureEnabled &&
          isCookieInstalled &&
          cookieSettings &&
          !cookieSettings.hasUserConsent,
      ),
    [cookieFeatureEnabled, cookieSettings, isCookieInstalled],
  )

  const shouldAnonymizeTracking = useMemo(
    () =>
      Boolean(
        cookieFeatureEnabled &&
          isCookieInstalled &&
          !cookieSettings?.ANALYTICS_AND_FUNCTIONAL?.enabled,
      ),
    [cookieFeatureEnabled, cookieSettings, isCookieInstalled],
  )
  return useMemo(
    () => (
      <CookieContext.Provider
        value={{
          isCookieInstalled,
          shouldShowCookiePopup,
          shouldAnonymizeTracking,
        }}
      >
        {children}
      </CookieContext.Provider>
    ),
    [
      children,
      isCookieInstalled,
      shouldAnonymizeTracking,
      shouldShowCookiePopup,
    ],
  )
}
