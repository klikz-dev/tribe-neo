import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationDeleteNotificationsArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getDeleteNotificationsKey,
  getNotificationsCountKey,
  getNotificationsKey,
} from '../../utils/keys'

export const useDeleteNotifications = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationDeleteNotificationsArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError, MutationDeleteNotificationsArgs>(
    input => client.notifications.deleteNotifications(input),
    {
      onSettled: () => {
        const notificationKey = getNotificationsKey()
        queryClient.invalidateQueries(notificationKey)

        const notificationsCountKey = getNotificationsCountKey()
        queryClient.invalidateQueries(notificationsCountKey)
      },
      mutationKey: getDeleteNotificationsKey(),
      ...useMutationOptions,
    },
  )
}
