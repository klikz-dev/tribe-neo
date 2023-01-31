import { Action } from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAuthTokensKey } from '../../utils/keys'

export const useClearNewDomain = (options?: {
  useMutationOptions?: UseMutationOptions<Action, Error>
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, Error>(() => client.network.clearNewDomain(), {
    onSettled: () => {
      const authTokenKey = getAuthTokensKey()
      queryClient.invalidateQueries(authTokenKey)
    },
    ...useMutationOptions,
  })
}
