import { Types, NotificationFields } from '@tribeplatform/gql-client'

import { useInfiniteQuery, UseInfiniteQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getNotificationsKey } from '../../utils/keys'

export const DefaultNotificationLimit = 10

export const useNotifications = (options: {
  variables: Types.QueryNotificationsArgs
  fields?: NotificationFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<Types.PaginatedNotification>
}) => {
  const {
    variables = { limit: DefaultNotificationLimit },
    fields = {
      target: { media: 'basic' },
      space: 'basic',
      actor: { media: 'basic' },
      object: {
        media: 'basic',
      },
    },
    useInfiniteQueryOptions,
  } = options || {}

  const { client } = useTribeClient()
  const notificationsKey = getNotificationsKey(variables)

  return useInfiniteQuery<Types.PaginatedNotification>(
    notificationsKey,
    ({ pageParam: after }) =>
      client?.notifications.list(
        {
          after,
          ...variables,
        },
        fields,
      ),
    useInfiniteQueryOptions,
  )
}
