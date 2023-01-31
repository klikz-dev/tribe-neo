import { ClientError } from '@tribeplatform/gql-client'
import {
  App,
  AppAction,
  MutationUpdateAppNetworkSettingsArgs,
} from '@tribeplatform/gql-client/types'
import { UseMutateAsyncFunction } from '@tribeplatform/react-sdk/lib'

export interface AppSettingsProps {
  app: App
  appSettings: any
  updateSettings: UseMutateAsyncFunction<
    AppAction,
    ClientError,
    MutationUpdateAppNetworkSettingsArgs
  >
  isUpdating: boolean
}
