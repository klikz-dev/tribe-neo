import { ClientError } from '@tribeplatform/gql-client'
import { Action } from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getClearNotificationsCountKey,
  getNotificationsCountKey,
} from '../../utils/keys'

export const useClearNotificationsCount = (options?: {
  useMutationOptions?: UseMutationOptions<Action, ClientError>
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError>(
    () => client.notifications.clearNotificationsCount(),
    {
      onMutate: () => {
        const notificationsCountKey = getNotificationsCountKey()
        queryClient.setQueryData(notificationsCountKey, () => 0)
      },
      onSettled: () => {
        const notificationsCountKey = getNotificationsCountKey()
        queryClient.invalidateQueries(notificationsCountKey)
      },
      mutationKey: getClearNotificationsCountKey(),
      ...useMutationOptions,
    },
  )
}
