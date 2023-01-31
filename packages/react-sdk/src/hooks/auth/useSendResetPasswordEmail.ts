import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationSendResetPasswordEmailArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getSendResetPasswordEmailKey } from '../../utils/keys'

export const useSendResetPasswordEmail = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationSendResetPasswordEmailArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()

  return useMutation<Action, ClientError, MutationSendResetPasswordEmailArgs>(
    input => client.auth.sendResetPasswordEmail(input),
    {
      mutationKey: getSendResetPasswordEmailKey(),
      ...useMutationOptions,
    },
  )
}
