import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon'
import TrashIcon from '@heroicons/react/outline/TrashIcon'
import { Link } from 'react-router-dom'

import { Post, PostStatus } from '@tribeplatform/gql-client/types'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'

import { dayjs } from '../../lib/dayjs'
import { createPostAddress } from '../../utils/post'

export const PostMemberBar = ({
  post,
  showSpace = true,
}: {
  showSpace?: boolean
  post: Post
}) => {
  const member = post?.owner?.member
  if (!member) return null
  const postLink = createPostAddress(post?.space?.slug, post.id, post.slug)

  return (
    <div className="flex flex-1 space-x-4 items-center overflow-hidden">
      <Link to={`/member/${member?.id}`} className="flex-shrink-0">
        <Avatar
          name={member?.name}
          size="lg"
          src={
            member?.profilePicture && 'urls' in member?.profilePicture
              ? member?.profilePicture?.urls?.thumb
              : undefined
          }
        />
      </Link>
      <div className="overflow-hidden flex-grow -mb-1">
        <div className="truncate max-w-full flex items-center text-basicSurface-900">
          <Link to={`/member/${member.id}`} className="font-medium truncate">
            {member.name}
          </Link>
          {showSpace && post.space?.slug && (
            <>
              <ChevronRightIcon className="w-4 h-4 mx-1" />
              <Link to={`/${post.space?.slug}`} className="truncate max-w-full">
                {post.space.name}
              </Link>
            </>
          )}
        </div>
        <Link
          to={postLink}
          className="text-sm text-basicSurface-500 truncate max-w-full whitespace-nowrap inline-block mt-1"
        >
          {post?.status === PostStatus.DELETED && (
            <span>
              <span className="text-danger-500 inline-flex items-center">
                <span>Deleted</span>
                <TrashIcon className="w-4 h-4 ml-0.5" />
              </span>
              <span> · </span>
            </span>
          )}
          <time
            dateTime={post.createdAt}
            title={dayjs(post.createdAt).toDate().toLocaleString()}
          >
            {dayjs(post.createdAt).fromNow()}
          </time>
          {member?.tagline ? <span> · {member?.tagline}</span> : null}
        </Link>
      </div>
    </div>
  )
}
