import {
  MutationUpdateCustomSsoArgs,
  Sso,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'

export const useUpdateCustomSso = (options?: {
  useMutationOptions?: UseMutationOptions<
    Sso,
    Error,
    MutationUpdateCustomSsoArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()

  return useMutation<Sso, Error, MutationUpdateCustomSsoArgs>(
    input => client.auth.updateCustomSso(input),
    useMutationOptions,
  )
}
