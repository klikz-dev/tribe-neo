import { AppFields, Types } from '@tribeplatform/gql-client'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getCreateAppKey, getAppKey, getAppsKey } from '../../utils/keys'

export const useGlobalCreateApp = (options?: {
  fields?: AppFields
  useMutationOptions?: UseMutationOptions<
    Types.App,
    Error,
    Types.MutationGlobalCreateAppArgs,
    { snapshot: Types.App }
  >
}) => {
  const { useMutationOptions, fields } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  const createAppKey = getCreateAppKey()
  const appsKey = getAppsKey()

  return useMutation<
    Types.App,
    Error,
    Types.MutationGlobalCreateAppArgs,
    { snapshot: Types.App }
  >(
    (input: Types.MutationGlobalCreateAppArgs) =>
      client?.dev.createApp(input, fields),
    {
      mutationKey: createAppKey,
      onSuccess: async data => {
        const appKey = getAppKey({ slug: data.slug })

        queryClient.setQueryData<Types.App>(appKey, _ => data)
        queryClient.invalidateQueries(appsKey)
        queryClient.invalidateQueries(appKey)
      },
      ...useMutationOptions,
    },
  )
}
