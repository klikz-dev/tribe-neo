import { AuthTokenFields, ClientError } from '@tribeplatform/gql-client'
import {
  AuthToken,
  MutationJoinNetworkWithInvitationLinkArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getJoinNetworkWithLinkKey } from '../../utils/keys'

export const useJoinNetworkWithLink = (options?: {
  fields?: AuthTokenFields
  useMutationOptions?: UseMutationOptions<
    AuthToken,
    ClientError,
    MutationJoinNetworkWithInvitationLinkArgs,
    { snapshot: AuthToken }
  >
}) => {
  const { useMutationOptions, fields = 'default' } = options || {}
  const { client } = useTribeClient()
  const joinNetworkKey = getJoinNetworkWithLinkKey()

  return useMutation<
    AuthToken,
    ClientError,
    MutationJoinNetworkWithInvitationLinkArgs,
    { snapshot: AuthToken }
  >(
    (input: MutationJoinNetworkWithInvitationLinkArgs) =>
      client.auth.joinNetworkWithInvitationLink(input, fields),
    { mutationKey: joinNetworkKey, ...useMutationOptions },
  )
}
