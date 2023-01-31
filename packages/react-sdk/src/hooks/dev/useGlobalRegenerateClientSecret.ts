import { ClientError, Types } from '@tribeplatform/gql-client'
import {
  App,
  MutationGlobalRegenerateClientSecretArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppKey } from '../../utils/keys'

export const useGlobalRegenerateClientSecret = (options?: {
  useMutationOptions?: UseMutationOptions<
    App,
    ClientError,
    MutationGlobalRegenerateClientSecretArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    App,
    ClientError,
    MutationGlobalRegenerateClientSecretArgs
  >(input => client.dev.regenerateClientSecret(input), {
    onSuccess: async data => {
      const appKey = getAppKey({ slug: data.slug })

      queryClient.setQueryData<Types.App>(appKey, _ => data)
      queryClient.invalidateQueries(appKey)
    },
    ...useMutationOptions,
  })
}
