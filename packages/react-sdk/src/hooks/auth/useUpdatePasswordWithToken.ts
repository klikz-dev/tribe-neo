import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationUpdatePasswordWithTokenArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'

export const useUpdatePasswordWithToken = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationUpdatePasswordWithTokenArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()

  return useMutation<Action, ClientError, MutationUpdatePasswordWithTokenArgs>(
    input => client.auth.updatePasswordWithToken(input),
    useMutationOptions,
  )
}
