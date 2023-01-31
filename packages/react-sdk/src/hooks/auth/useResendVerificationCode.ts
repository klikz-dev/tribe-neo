import { ClientError } from '@tribeplatform/gql-client'
import { Action } from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getResendVerificationCode } from '../../utils/keys'

export const useResendVerificationCode = (options?: {
  useMutationOptions?: UseMutationOptions<Action, ClientError>
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const resendVerificationCodeKey = getResendVerificationCode()

  return useMutation<Action, ClientError>(
    () => client.auth.resendVerification(),
    {
      mutationKey: resendVerificationCodeKey,
      ...useMutationOptions,
    },
  )
}
