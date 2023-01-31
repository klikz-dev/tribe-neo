import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationUnsubscribeFromNotificationArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getUnsubscribeFromNotificationKey } from '../../utils/keys'

export const useUnsubscribeFromNotification = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationUnsubscribeFromNotificationArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()

  return useMutation<
    Action,
    ClientError,
    MutationUnsubscribeFromNotificationArgs
  >(input => client.notifications.unsubscribe(input), {
    mutationKey: getUnsubscribeFromNotificationKey(),
    ...useMutationOptions,
  })
}
