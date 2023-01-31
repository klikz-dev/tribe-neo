import { InfiniteData } from 'react-query'

import { ClientError, AppInstallationFields } from '@tribeplatform/gql-client'
import {
  AppInstallation,
  MutationUninstallAppArgs,
  PaginatedApp,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppInstallationsKey, getAppsKey } from '../../utils/keys'

export const useUninstallApp = (options?: {
  fields?: AppInstallationFields
  useMutationOptions?: UseMutationOptions<
    AppInstallation,
    ClientError,
    MutationUninstallAppArgs
  >
}) => {
  const { useMutationOptions, fields = 'basic' } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<AppInstallation, ClientError, MutationUninstallAppArgs>(
    input => client.app.uninstall(input, fields),
    {
      onMutate: variables => {
        const appInstallationsKey = getAppInstallationsKey()
        queryClient.setQueriesData<InfiniteData<PaginatedApp>>(
          appInstallationsKey,
          old => ({
            ...old,
            pages: old?.pages?.map(page => ({
              ...page,
              edges: page?.edges?.filter(
                edge => edge?.node?.id !== variables?.appInstallationId,
              ),
              nodes: page?.nodes?.filter(
                node => node?.id !== variables?.appInstallationId,
              ),
            })),
          }),
        )
      },
      onSettled: () => {
        const appsKey = getAppsKey()
        queryClient.invalidateQueries(appsKey)

        const appInstallationsKey = getAppInstallationsKey()
        queryClient.invalidateQueries(appInstallationsKey)
      },
      ...useMutationOptions,
    },
  )
}
