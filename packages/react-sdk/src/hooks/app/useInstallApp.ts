import { ClientError, AppInstallationFields } from '@tribeplatform/gql-client'
import {
  App,
  AppInstallation,
  MutationInstallAppArgs,
  PaginatedApp,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppInstallationsKey, getAppKey, getAppsKey } from '../../utils/keys'

export const useInstallApp = (options?: {
  fields?: AppInstallationFields
  useMutationOptions?: UseMutationOptions<
    AppInstallation,
    ClientError,
    MutationInstallAppArgs
  >
}) => {
  const { useMutationOptions, fields = 'basic' } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<AppInstallation, ClientError, MutationInstallAppArgs>(
    input => client.app.install(input, fields),
    {
      onMutate: variables => {
        const appKey = getAppKey({ id: variables.appId })
        queryClient.setQueriesData<App>(appKey, old => ({
          ...old,
          installed: true,
        }))

        const appsKey = getAppsKey()
        queryClient.setQueriesData<PaginatedApp>(appsKey, old => ({
          ...old,
          edges: old?.edges?.map(edge => ({
            ...edge,
            node: {
              ...edge.node,
              installed:
                edge.node.id === variables.appId ? true : edge.node.installed,
            },
          })),
          nodes: old.nodes.map(node => ({
            ...node,
            installed: node.id === variables.appId ? true : node.installed,
          })),
        }))
      },
      onSettled: (data, error, variables) => {
        const appKey = getAppKey({ id: variables.appId })
        queryClient.invalidateQueries(appKey)

        const appsKey = getAppsKey()
        queryClient.invalidateQueries(appsKey)

        const appInstallationsKey = getAppInstallationsKey()
        queryClient.invalidateQueries(appInstallationsKey)
      },
      ...useMutationOptions,
    },
  )
}
