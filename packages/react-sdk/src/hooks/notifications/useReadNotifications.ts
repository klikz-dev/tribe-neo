import { InfiniteData } from 'react-query'

import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationReadNotificationsArgs,
  PaginatedNotification,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getNotificationsCountKey,
  getNotificationsKey,
  getReadNotificationsKey,
} from '../../utils/keys'

export const useReadNotifications = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationReadNotificationsArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError, MutationReadNotificationsArgs>(
    input => client.notifications.readNotifications(input),
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
                    variables.ids.length === 0 ||
                    variables.ids.includes(notification.id)
                      ? true
                      : notification.read,
                })),
                edges: page.edges.map(edge => ({
                  ...edge,
                  node: {
                    ...edge.node,
                    read:
                      variables.ids.length === 0 ||
                      variables.ids.includes(edge.node.id)
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
      mutationKey: getReadNotificationsKey(),
      ...useMutationOptions,
    },
  )
}
