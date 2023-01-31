import { ReactNode } from 'react'

import { DefaultOptions, MutationCache, QueryCache } from 'react-query/types'

import { TribeClient, Types } from '@tribeplatform/gql-client'
import { TribeClientOptions } from '@tribeplatform/gql-client/clients'
import { AuthToken } from '@tribeplatform/gql-client/types'

export type TribeClientConfig = {
  baseUrl?: TribeClientOptions['graphqlUrl']
  accessToken?: TribeClientOptions['accessToken']
  onError?: TribeClientOptions['onError']
  networkDomain?: string
  networkId?: string
  clientId?: string
  clientSecret?: string
  otp?: string
}

export type ProviderProps = {
  children: ReactNode
  queryConfig?: {
    queryCache?: QueryCache
    mutationCache?: MutationCache
    defaultOptions?: DefaultOptions
  }
  config: TribeClientConfig
  onTokenUpdate?: (token: AuthToken) => void
}

export type getTokensType = (
  config: TribeClientConfig,
) => Promise<{ client: TribeClient; authToken: Types.AuthToken }>

export type ClientContextProps = {
  client: TribeClient
  config: TribeClientConfig
  ready: boolean
  boot: () => void
  onTokenUpdate?: ProviderProps['onTokenUpdate']
}

export type ClientProviderType = React.FC<{
  children: ReactNode
  config: TribeClientConfig
  autoBoot?: boolean
  onTokenUpdate?: ProviderProps['onTokenUpdate']
}>
