import { Action } from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'

export const useTransferToNewDomain = (options?: {
  useMutationOptions?: UseMutationOptions<Action, Error>
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()

  return useMutation<Action, Error>(
    () => client.network.transferToNewDomain(),
    useMutationOptions,
  )
}
