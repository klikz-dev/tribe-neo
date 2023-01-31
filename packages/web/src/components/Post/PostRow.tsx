import ChatAltIcon from '@heroicons/react/outline/ChatAltIcon'
import ThumbUpIcon from '@heroicons/react/outline/ThumbUpIcon'
import { Link } from 'react-router-dom'

import { Post } from '@tribeplatform/gql-client/types'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'

import { createPostAddress, getPostFieldValue } from '../../utils/post'
import { PostContext } from './PostCard'
import { PostOptions } from './PostOptions'

export const PostRow = ({
  post,
  context,
}: {
  post: Post
  context: PostContext
}) => {
  if (!post?.id) return null

  const postLink = createPostAddress(post?.space?.slug, post.id, post.slug)
  const title =
    getPostFieldValue(post, 'title') || getPostFieldValue(post, 'question')
  const member = post?.owner?.member
  return (
    <div className="flex space-x-5 p-5 items-center">
      <Link className="flex-shrink-0" to={`/member/${member?.id}`}>
        <Avatar
          size="sm"
          name={member?.name}
          src={
            member?.profilePicture && 'urls' in member?.profilePicture
              ? member?.profilePicture?.urls?.thumb
              : undefined
          }
        />
      </Link>
      <Link className="flex-grow overflow-hidden max-w-full" to={postLink}>
        <h4 className="truncate">{title}</h4>
      </Link>
      <div className="flex space-x-2 text-basicSurface-400 items-center">
        <ThumbUpIcon className="h-4 w-4" />
        <span> {post?.reactionsCount?.toLocaleString() || '0'}</span>
      </div>
      <div className="flex space-x-2 text-basicSurface-400 items-center">
        <ChatAltIcon className="h-4 w-4 " />
        <span> {post?.totalRepliesCount?.toLocaleString() || '0'}</span>
      </div>
      <PostOptions post={post} context={context} />
    </div>
  )
}
