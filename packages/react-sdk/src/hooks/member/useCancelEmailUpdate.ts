import { ClientError } from '@tribeplatform/gql-client'
import {
  MutationCancelEmailUpdateArgs,
  Action,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAuthTokensKey, getMembersKey } from '../../utils/keys'
import { getAuthMemberKey } from '../../utils/keys/authToken.keys'

export const useCancelEmailUpdate = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationCancelEmailUpdateArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError, MutationCancelEmailUpdateArgs>(
    input => client.members.cancelEmailUpdate(input),
    {
      onSettled: () => {
        queryClient.invalidateQueries(getMembersKey())
        queryClient.invalidateQueries(getAuthTokensKey())
        queryClient.invalidateQueries(getAuthMemberKey())
      },
      ...useMutationOptions,
    },
  )
}
