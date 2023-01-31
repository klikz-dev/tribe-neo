import { AuthTokenFields, ClientError } from '@tribeplatform/gql-client'
import {
  AuthToken,
  MutationJoinNetworkWithTokenArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getJoinNetworkWithTokenKey } from '../../utils/keys'

export const useJoinNetworkWithToken = (options?: {
  fields?: AuthTokenFields
  useMutationOptions?: UseMutationOptions<
    AuthToken,
    ClientError,
    MutationJoinNetworkWithTokenArgs,
    { snapshot: AuthToken }
  >
}) => {
  const { useMutationOptions, fields = 'default' } = options || {}
  const { client } = useTribeClient()
  const joinNetworkKey = getJoinNetworkWithTokenKey()

  return useMutation<
    AuthToken,
    ClientError,
    MutationJoinNetworkWithTokenArgs,
    { snapshot: AuthToken }
  >(
    (input: MutationJoinNetworkWithTokenArgs) =>
      client.auth.joinNetworkWithToken(input, fields),
    { mutationKey: joinNetworkKey, ...useMutationOptions },
  )
}
