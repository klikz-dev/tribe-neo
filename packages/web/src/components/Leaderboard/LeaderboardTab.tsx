import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon'
import { Link } from 'react-router-dom'

import { Image, ReportSlug } from '@tribeplatform/gql-client/types'
import { useLeaderboard } from '@tribeplatform/react-sdk/hooks'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'

import { EmptyState } from './EmptyState'
import { LoadingState } from './LoadingState'

export const LeaderboardTab = ({ timeframe, membersCount, active }) => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()
  const {
    data: members,
    isLoading,
    isFetched,
  } = useLeaderboard({
    args: {
      input: {
        slug: ReportSlug.TOP_MEMBERS,
        timeFrame: timeframe,
        timeZone,
        limit: membersCount,
      },
    },
    fields: { profilePicture: 'basic' },
    useQueryOptions: { enabled: active },
  })

  if (!isFetched || isLoading) return <LoadingState count={membersCount} />
  if (!members?.length) return <EmptyState />
  return (
    <div className="grid grid-cols-1 gap-1 -ml-2 -mr-2">
      {members.map((member, index) => {
        return (
          <Link
            key={member.id}
            to={`/member/${member.id}`}
            className="hover-trigger flex space-x-3 items-center p-2 rounded-md hover:bg-surface-100"
          >
            <span className="text-lg font-medium w-5 text-center flex-shrink-0 whitespace-nowrap">
              {index + 1}
            </span>
            <Avatar
              size="md"
              src={(member?.profilePicture as Image)?.urls?.thumb}
              name={member?.name}
            />
            <div className="flex-grow max-w-full overflow-hidden">
              <div className="truncate text-basicSurface-900">
                {member.name}
              </div>
            </div>
            <div>
              <ChevronRightIcon className="hover-target mr-2 w-5 h-5 text-basicSurface-400" />
            </div>
          </Link>
        )
      })}
    </div>
  )
}
