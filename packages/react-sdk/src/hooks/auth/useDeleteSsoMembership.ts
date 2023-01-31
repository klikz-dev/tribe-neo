import { ClientError } from '@tribeplatform/gql-client/@types'
import {
  Action,
  MutationDeleteSsoMembershipArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'

export const useDeleteSsoMembership = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationDeleteSsoMembershipArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()

  return useMutation<Action, ClientError, MutationDeleteSsoMembershipArgs>(
    input => client.auth.deleteSsoMembership(input),

    useMutationOptions,
  )
}
