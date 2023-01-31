import { createContext, useCallback, useEffect, useRef, useState } from 'react'

import { TribeClient } from '@tribeplatform/gql-client'

import { ClientContextProps, ClientProviderType } from './@types'
import { getTokens } from './lib/getTokens'

export const ClientContext = createContext<ClientContextProps>({
  client: null,
  ready: undefined,
  boot: null,
  config: null,
})

const SSR = typeof window === 'undefined'

export const ClientProvider: ClientProviderType = ({
  children,
  config,
  autoBoot = true,
  onTokenUpdate,
}) => {
  const { accessToken, baseUrl } = config
  const loadingRef = useRef<boolean>(false)

  let graphqlUrl = baseUrl
  if (!graphqlUrl && typeof process !== 'undefined') {
    graphqlUrl = process?.env?.TRIBE_GQL_ENDPOINT
  }

  const [client, setClient] = useState<TribeClient>(
    new TribeClient({
      accessToken,
      graphqlUrl,
      onError: config.onError,
      notifyOnTokenExpiration: !SSR,
    }),
  )
  const ready = !!(client as any)?.client?.accessToken
  const update = useCallback(
    async config => {
      const res = await getTokens(config)
      const { client: newClient } = res
      setClient(newClient)
      loadingRef.current = false
      return res
    },
    [setClient, loadingRef],
  )

  useEffect(() => {
    if (autoBoot && !loadingRef.current && !ready) {
      loadingRef.current = true
      update(config)
    }
  }, [loadingRef, update, client, ready, config, autoBoot])

  const boot = () => {
    update(config)
  }

  return (
    <ClientContext.Provider
      value={{ client, ready, boot, config, onTokenUpdate }}
    >
      {children}
    </ClientContext.Provider>
  )
}
