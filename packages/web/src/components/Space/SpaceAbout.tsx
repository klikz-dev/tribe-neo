import dayjs from 'dayjs'

import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Space } from '@tribeplatform/gql-client/types'
import UsersIcon from '@heroicons/react/outline/UsersIcon'
import DocumentTextIcon from '@heroicons/react/outline/DocumentTextIcon'
import CalendarIcon from '@heroicons/react/outline/CalendarIcon'

export const SpaceAbout = ({ space }: { space: Space }) => {
  return (
    <Card className="mb-5">
      <Card.Header>
        <h3 className="text-lg leading-6 font-medium text-basicSurface-900">
          About
        </h3>
      </Card.Header>
      <Card.Content>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-1">
          {space?.description ? (
            <div className="-mt-2 text-sm text-basicSurface-900">
              {space?.description}
            </div>
          ) : null}
          {space?.membersCount ? (
            <div className="text-sm space-x-2 flex items-center">
              <UsersIcon className="w-4 h-4" />
              <span>{`${space?.membersCount?.toLocaleString()} ${
                space?.membersCount === 1 ? 'member' : 'members'
              }`}</span>
            </div>
          ) : null}
          {space?.postsCount ? (
            <div className="text-sm space-x-2 flex items-center">
              <DocumentTextIcon className="w-4 h-4" />
              <span>{`${space?.postsCount?.toLocaleString()} ${
                space?.postsCount === 1 ? 'post' : 'posts'
              }`}</span>
            </div>
          ) : null}
          <div className="text-sm space-x-2 flex items-center">
            <CalendarIcon className="w-4 h-4" />
            <span>
              Created{' '}
              <time
                dateTime={space.createdAt}
                title={dayjs(space.createdAt).toDate().toLocaleString()}
              >
                {dayjs(space.createdAt).fromNow()}
              </time>
            </span>
          </div>
        </dl>
      </Card.Content>
    </Card>
  )
}
