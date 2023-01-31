import { ClientError } from '@tribeplatform/gql-client'
import {
  AppAction,
  MutationUpdateAppNetworkSettingsArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppNetworkSettingsKey } from '../../utils/keys'

export const useUpdateAppNetworkSettings = (options?: {
  useMutationOptions?: UseMutationOptions<
    AppAction,
    ClientError,
    MutationUpdateAppNetworkSettingsArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    AppAction,
    ClientError,
    MutationUpdateAppNetworkSettingsArgs
  >(input => client.app.updateNetworkSettings(input), {
    onMutate: variables => {
      const appInstallationsKey = getAppNetworkSettingsKey({
        appId: variables.appId,
      })
      queryClient.setQueriesData<string>(
        appInstallationsKey,
        () => variables.settings,
      )
    },
    onSettled: () => {
      const appInstallationsKey = getAppNetworkSettingsKey()
      queryClient.invalidateQueries(appInstallationsKey)
    },
    ...useMutationOptions,
  })
}
