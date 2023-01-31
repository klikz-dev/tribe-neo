import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationConfirmResetPasswordArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'

export const useConfirmResetPassword = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationConfirmResetPasswordArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()

  return useMutation<Action, ClientError, MutationConfirmResetPasswordArgs>(
    input => client.auth.confirmResetPassword(input),
    useMutationOptions,
  )
}
