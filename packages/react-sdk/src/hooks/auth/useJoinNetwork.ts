import { AuthTokenFields, ClientError } from '@tribeplatform/gql-client'
import {
  AuthToken,
  MutationJoinNetworkArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getJoinNetworkKey } from '../../utils/keys'

export const useJoinNetwork = (options?: {
  fields?: AuthTokenFields
  useMutationOptions?: UseMutationOptions<
    AuthToken,
    ClientError,
    MutationJoinNetworkArgs,
    { snapshot: AuthToken }
  >
}) => {
  const { useMutationOptions, fields = 'default' } = options || {}
  const { client } = useTribeClient()
  const joinNetworkKey = getJoinNetworkKey()

  return useMutation<
    AuthToken,
    ClientError,
    MutationJoinNetworkArgs,
    { snapshot: AuthToken }
  >(
    (input: MutationJoinNetworkArgs) => client.auth.joinNetwork(input, fields),
    { mutationKey: joinNetworkKey, ...useMutationOptions },
  )
}
