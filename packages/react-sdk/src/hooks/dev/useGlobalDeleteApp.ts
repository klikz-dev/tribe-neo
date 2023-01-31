import { AppFields, Types } from '@tribeplatform/gql-client'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppKey, getAppsKey, getUpdateAppKey } from '../../utils/keys'

export const useGlobalDeleteApp = (options?: {
  fields?: AppFields
  useMutationOptions?: UseMutationOptions<
    Types.App,
    Error,
    Types.MutationGlobalDeleteAppArgs,
    { snapshot: Types.App }
  >
}) => {
  const { useMutationOptions, fields } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  const deleteAppKey = getUpdateAppKey()
  const appsKey = getAppsKey()

  return useMutation<
    Types.App,
    Error,
    Types.MutationGlobalDeleteAppArgs,
    { snapshot: Types.App }
  >(
    (input: Types.MutationGlobalDeleteAppArgs) =>
      client?.dev.deleteApp(input, fields),
    {
      mutationKey: deleteAppKey,
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
