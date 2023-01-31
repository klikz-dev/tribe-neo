import { AppFields, Types } from '@tribeplatform/gql-client'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getUpdateAppKey, getAppKey, getAppsKey } from '../../utils/keys'

export const useGlobalUpdateApp = (options?: {
  fields?: AppFields
  useMutationOptions?: UseMutationOptions<
    Types.App,
    Error,
    Types.MutationGlobalUpdateAppArgs,
    { snapshot: Types.App }
  >
}) => {
  const { useMutationOptions, fields } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  const updateAppKey = getUpdateAppKey()
  const appsKey = getAppsKey()

  return useMutation<
    Types.App,
    Error,
    Types.MutationGlobalUpdateAppArgs,
    { snapshot: Types.App }
  >(
    (input: Types.MutationGlobalUpdateAppArgs) =>
      client?.dev.updateApp(input, fields),
    {
      mutationKey: updateAppKey,
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
