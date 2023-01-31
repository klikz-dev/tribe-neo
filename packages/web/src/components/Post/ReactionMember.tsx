import { Link } from 'react-router-dom'

import { Member } from '@tribeplatform/gql-client/types'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'

export const ReactionMemberLoading = ({ count = 5 }) => {
  return (
    <>
      {[...Array(count)].map((_e, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="bg-surface-50 p-3">
          <div className="animate-pulse flex space-x-4 items-center">
            <div className="rounded-full bg-surface-300 h-10 w-10" />
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-surface-300 rounded-full w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export const ReactionMember = ({ member }: { member: Member }) => {
  return (
    <div className="flex space-x-5 p-3 items-center truncate">
      <Link className="flex-shrink-0" to={`/member/${member?.id}`}>
        <Avatar
          size="md"
          name={member?.name}
          src={
            member?.profilePicture && 'urls' in member?.profilePicture
              ? member?.profilePicture?.urls?.thumb
              : undefined
          }
        />
      </Link>
      <div className="truncate flex-grow">
        <Link
          className="flex-grow overflow-hidden max-w-full"
          to={`/member/${member?.id}`}
        >
          <h4 className="truncate">{member?.name}</h4>
        </Link>
        {member?.tagline && (
          <Link
            to={`/member/${member?.id}`}
            className="text-sm text-basicSurface-500 truncate inline-block max-w-full"
          >
            {member?.tagline ? <span>{member?.tagline}</span> : null}
          </Link>
        )}
      </div>
    </div>
  )
}
