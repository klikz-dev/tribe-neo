import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationGlobalTestAppWebhookArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'

export const useGlobalTestAppWebhook = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationGlobalTestAppWebhookArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()

  return useMutation<Action, ClientError, MutationGlobalTestAppWebhookArgs>(
    input => client.dev.testAppWebhook(input),
    {
      ...useMutationOptions,
    },
  )
}
