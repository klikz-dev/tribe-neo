import { Menu } from '@headlessui/react'
import CheckIcon from '@heroicons/react/outline/CheckIcon'
import CogIcon from '@heroicons/react/outline/CogIcon'
import InboxIcon from '@heroicons/react/outline/InboxIcon'
import clsx from 'clsx'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'

import { Notification } from '@tribeplatform/gql-client/types'
import {
  useNotifications,
  useReadNotification,
  useReadNotifications,
} from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { useDropdown } from '@tribeplatform/react-ui-kit/Dropdown'
import { EmptyState } from '@tribeplatform/react-ui-kit/EmptyState'

import { getLink, NotificationRow } from './NotificationRow'

export const NotificationDropdownList = () => {
  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage = false,
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
    variables: { limit: 10 },
  })

  const { close: closeDropdown } = useDropdown()

  const { mutate: readAllNotifications } = useReadNotifications()
  const { mutate: readNotification } = useReadNotification()

  const { nodes: notifications } = simplifyPaginatedResult<Notification>(data)

  const loader = [...Array(10)].map((_e, i) => (
    <>
      {/* eslint-disable-next-line react/no-array-index-key  */}
      <div className="animate-pulse flex space-x-3 p-3" key={i}>
        <div className="rounded-full h-6 w-6 bg-surface-300 " />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 bg-surface-300 rounded-full w-5/6" />
          </div>
          <div className="text-sm text-basicSurface-500">
            <div className="h-4 bg-surface-300 rounded-full" />
          </div>
        </div>
      </div>
    </>
  ))

  return (
    <>
      <div className="border-b border-neutral-200 font-bold p-3 flex align-middle space-x-3">
        <Link
          className="flex-grow text-basicSurface-400 hover:text-basicSurface-500"
          to="/notifications"
          onClick={closeDropdown}
        >
          Notifications
        </Link>
        <div
          className="flex-shrink cursor-pointer"
          onClick={() => {
            readAllNotifications({ ids: [] })
            closeDropdown()
          }}
        >
          <CheckIcon
            className="h-6 w-6 text-basicSurface-400 hover:text-basicSurface-500"
            aria-hidden="true"
          />
        </div>
        <Link
          className="flex-shrink"
          to="/settings/notifications"
          onClick={closeDropdown}
        >
          <CogIcon
            className="h-6 w-6 text-basicSurface-400 hover:text-basicSurface-500"
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className="overflow-y-auto max-h-96">
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchNextPage}
          hasMore={hasNextPage || false}
        >
          <ul className="bg-surface-50 overflow-hidden divide-y divide-neutral-200">
            {notifications?.map(notification => {
              if (!notification.meta) return null
              return (
                <Menu.Item key={notification.id}>
                  {({ active }) => (
                    <Link
                      to={getLink(notification)}
                      className={clsx(
                        active ? 'bg-surface-200' : '',
                        'flex space-x-3 p-3',
                      )}
                      onClick={() => {
                        readNotification({ notificationId: notification.id })
                      }}
                    >
                      <NotificationRow notification={notification} />
                    </Link>
                  )}
                </Menu.Item>
              )
            })}
            {isFetching ? loader : null}
            {!notifications.length && !isFetching ? (
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
      </div>
    </>
  )
}
