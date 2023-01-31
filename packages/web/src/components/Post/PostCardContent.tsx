import { FC } from 'react'

import { Post, PinnedInto, PostStatus } from '@tribeplatform/gql-client/types'

import { PostContext } from './@types'
import { PostContent } from './PostContent'
import { PostHiddenIndicator } from './PostHiddenIndicator'
import { PostInfoBar } from './PostInfoBar'
import { PostMemberBar } from './PostMemberBar'
import { PostOptions } from './PostOptions'
import { PostPendingIndicator } from './PostPendingIndicator'
import { PostPinnedIndicator } from './PostPinnedIndicator'
import { TagPills } from './TagPills'

export type PostCardContentProps = {
  post: Post
  context: PostContext
  activeTagId: string
  collapsible: boolean
}

export const PostCardContent: FC<PostCardContentProps> = ({
  post,
  context,
  activeTagId,
  collapsible,
}) => {
  const isPinned = post?.pinnedInto?.includes(PinnedInto.SPACE)
  const showPin = context === 'post' || context === 'space'
  const showSpace = context !== 'space'
  const showPostOptions = context !== 'moderation'
  const isPendingReview = post.status === PostStatus.BLOCKED
  const isDeleted = post.status === PostStatus.DELETED

  return (
    <>
      <div className="pb-4 sm:pb-4 flex items-center space-x-2 max-w-full">
        <PostMemberBar post={post} showSpace={showSpace} />
        {!isDeleted && (
          <div className="flex items-center space-x-2">
            {isPendingReview && <PostPendingIndicator />}
            {showPin && isPinned && <PostPinnedIndicator />}
            {post.isHidden && <PostHiddenIndicator />}
            {showPostOptions && <PostOptions post={post} context={context} />}
          </div>
        )}
      </div>
      <div>
        <PostContent post={post} collapsible={collapsible} context={context} />
        <TagPills
          tags={post?.tags}
          activeTagId={activeTagId}
          className="mb-2"
        />
        <PostInfoBar post={post} />
      </div>
    </>
  )
}
