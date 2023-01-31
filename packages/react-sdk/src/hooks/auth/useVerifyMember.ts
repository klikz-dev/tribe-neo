import { AuthTokenFields, ClientError } from '@tribeplatform/gql-client'
import {
  AuthToken,
  MutationVerifyMemberArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getVerifyMemberKey } from '../../utils/keys'

export const useVerifyMember = (options?: {
  fields?: AuthTokenFields
  useMutationOptions?: UseMutationOptions<
    AuthToken,
    ClientError,
    MutationVerifyMemberArgs,
    { snapshot: AuthToken }
  >
}) => {
  const { useMutationOptions, fields = 'default' } = options || {}
  const { client } = useTribeClient()
  const verifyMemberKey = getVerifyMemberKey()

  return useMutation<
    AuthToken,
    ClientError,
    MutationVerifyMemberArgs,
    { snapshot: AuthToken }
  >(
    (input: MutationVerifyMemberArgs) =>
      client.auth.verifyMember(input, fields),
    { mutationKey: verifyMemberKey, ...useMutationOptions },
  )
}
