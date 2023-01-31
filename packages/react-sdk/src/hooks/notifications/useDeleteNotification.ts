import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationDeleteNotificationArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getDeleteNotificationKey,
  getNotificationsCountKey,
  getNotificationsKey,
} from '../../utils/keys'

export const useDeleteNotification = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationDeleteNotificationArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError, MutationDeleteNotificationArgs>(
    input => client.notifications.deleteNotification(input),
    {
      onSettled: () => {
        const notificationKey = getNotificationsKey()
        queryClient.invalidateQueries(notificationKey)

        const notificationsCountKey = getNotificationsCountKey()
        queryClient.invalidateQueries(notificationsCountKey)
      },
      mutationKey: getDeleteNotificationKey(),
      ...useMutationOptions,
    },
  )
}
