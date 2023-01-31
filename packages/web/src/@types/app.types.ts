import { Request, Response } from 'express'
import { DehydratedState } from 'react-query/hydration'
import { match } from 'react-router'

import { TribeClient } from '@tribeplatform/gql-client'
import { AuthToken } from '@tribeplatform/gql-client/types'

export type AppContext = {
  queryClient: any
  req: Request
  res: Response
  authToken?: AuthToken
  client?: TribeClient
}

export type AppInitialProps = {
  authToken?: AuthToken
  dehydratedState?: DehydratedState
  intercomUserHash?: string
  optimizelyDataFile: string | null
}

export type PageProps = {
  path: match<{ [x: string]: string }>
  context: AppContext
}

export interface Locals {
  appInitialProps?: AppInitialProps
  client: AppContext['client']
  queryClient: AppContext['queryClient']
}

declare module 'express' {
  export interface Response {
    locals: Locals
  }
}
