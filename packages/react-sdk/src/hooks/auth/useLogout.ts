import {
  Action,
  Member,
  MutationLogoutNetworkArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAuthMemberKey, getAuthMemberSessionsKey } from '../../utils/keys'

export const useLogout = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    Error,
    MutationLogoutNetworkArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const queryClient = useQueryClient()
  const { client } = useTribeClient()

  return useMutation<Action, Error, MutationLogoutNetworkArgs>(
    input => client.auth.logout(input),
    {
      onMutate: variables => {
        const authMemberSessionKey = getAuthMemberSessionsKey()
        queryClient.setQueriesData<Member>(authMemberSessionKey, old => ({
          ...old,
          sessions: old.sessions.filter(
            session => session.id !== variables.input.sessionId,
          ),
        }))
      },
      onSettled: () => {
        const authMemberKey = getAuthMemberKey()
        queryClient.invalidateQueries(authMemberKey)

        const authMemberSessionKey = getAuthMemberSessionsKey()
        queryClient.invalidateQueries(authMemberSessionKey)
      },
      ...useMutationOptions,
    },
  )
}
