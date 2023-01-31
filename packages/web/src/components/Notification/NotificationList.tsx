import InboxIcon from '@heroicons/react/outline/InboxIcon'
import clsx from 'clsx'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'

import { Notification } from '@tribeplatform/gql-client/types'
import {
  useNotifications,
  useReadNotification,
} from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { EmptyState } from '@tribeplatform/react-ui-kit/EmptyState'

import { getLink, NotificationRow } from './NotificationRow'

export const NotificationList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage = false,
    isLoading,
    isFetchingNextPage,
  } = useNotifications({
    fields: {
      target: {
        media: 'basic',
        post: {
          repliedTos: 'basic',
          owner: { member: { profilePicture: 'basic' } },
        },
      },
      space: 'basic',
      actor: { media: 'basic' },
      object: {
        post: 'basic',
      },
    },
    variables: { limit: 20 },
  })

  const { mutate: readNotification } = useReadNotification()

  const { nodes: notifications } = simplifyPaginatedResult<Notification>(data)

  const loader = [...Array(10)].map((_e, i) => (
    <>
      {/* eslint-disable-next-line react/no-array-index-key  */}
      <div className="animate-pulse flex space-x-3 p-3" key={i}>
        <div className="rounded-full h-10 w-10 bg-surface-300 " />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 bg-surface-300 rounded-full w-5/6" />
          </div>
          <p className="text-sm text-basicSurface-500">
            <div className="h-4 bg-surface-300 rounded-full" />
          </p>
        </div>
      </div>
    </>
  ))

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchNextPage}
      hasMore={hasNextPage || false}
      threshold={800}
    >
      <ul className="bg-surface-50 shadow overflow-hidden sm:rounded-md divide-y divide-neutral-200">
        {notifications?.map(notification => {
          if (!notification.meta) return null
          return (
            <Link
              key={notification.id}
              to={getLink(notification)}
              className={clsx('flex space-x-5 p-3 hover:bg-surface-200')}
              onClick={() => {
                readNotification({ notificationId: notification.id })
              }}
            >
              <NotificationRow notification={notification} />
            </Link>
          )
        })}
        {isLoading || isFetchingNextPage ? loader : null}
        {!notifications.length && !isLoading ? (
          <li className="py-10">
            <EmptyState
              title="Nothing here!"
              description="You don't have any notifications."
              icon={<InboxIcon />}
            />
          </li>
        ) : null}
      </ul>
    </InfiniteScroll>
  )
}
