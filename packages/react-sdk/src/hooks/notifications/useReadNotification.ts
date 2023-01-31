import { InfiniteData } from 'react-query'

import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationReadNotificationArgs,
  PaginatedNotification,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getNotificationsCountKey,
  getNotificationsKey,
  getReadNotificationKey,
} from '../../utils/keys'

export const useReadNotification = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationReadNotificationArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError, MutationReadNotificationArgs>(
    input => client.notifications.readNotification(input),
    {
      onMutate: variables => {
        const notificationsKey = getNotificationsKey()
        queryClient.setQueriesData<InfiniteData<PaginatedNotification>>(
          notificationsKey,
          input => {
            const updatedInput: InfiniteData<PaginatedNotification> = {
              ...input,
              pages: input.pages.map(page => ({
                ...page,
                nodes: page.nodes.map(notification => ({
                  ...notification,
                  read:
                    notification.id === variables.notificationId
                      ? true
                      : notification.read,
                })),
                edges: page.edges.map(edge => ({
                  ...edge,
                  node: {
                    ...edge.node,
                    read:
                      edge.node.id === variables.notificationId
                        ? true
                        : edge.node.read,
                  },
                })),
              })),
            }
            return updatedInput
          },
        )
      },
      onSettled: () => {
        const notificationsKey = getNotificationsKey()
        queryClient.invalidateQueries(notificationsKey)

        const notificationsCountKey = getNotificationsCountKey()
        queryClient.invalidateQueries(notificationsCountKey)
      },
      mutationKey: getReadNotificationKey(),
      ...useMutationOptions,
    },
  )
}
