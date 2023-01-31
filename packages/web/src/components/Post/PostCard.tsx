import { FC } from 'react'

import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Post, PostStatus } from '@tribeplatform/gql-client/types'
import { useAuthMember } from '@tribeplatform/react-sdk/hooks'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { useQuery } from '@tribeplatform/slate-kit/utils'

import { createPostAddress } from '../../utils/post'
import { Reply } from '../ReplyList/Reply'
import { PostContext } from './@types'
import { PostActionBar } from './PostActionBar'
import { PostCardContent } from './PostCardContent'
import { ReplyBar } from './ReplyBar'

export type PostCardProps = {
  post: Post
  context: PostContext
  activeTagId?: string
  replyBar?: boolean
  collapsible?: boolean
}

export const PostCard: FC<PostCardProps> = ({
  post,
  context,
  activeTagId = '',
  replyBar = true,
  collapsible = true,
}) => {
  const query = useQuery()
  const { isGuest } = useAuthMember()

  if (!post?.id) return null

  let canReply = true
  const isDeleted = post.status === PostStatus.DELETED

  const postLink = createPostAddress(post?.space?.slug, post.id, post.slug)

  const [canCreateReply] = hasScopesPermission(post, ['createReply'])
  if (
    (!isGuest && !canCreateReply) ||
    !post.authMemberProps.availableReplyTypes?.length
  )
    canReply = false

  if (context === 'moderation')
    return (
      <PostCardContent
        post={post}
        context={context}
        activeTagId={activeTagId}
        collapsible={collapsible}
      />
    )

  return (
    <Card
      className={clsx(
        post?.id === query?.highlight &&
          'ring ring-warning-500 ring-offset-surface-50 ring-offset-4 rounded-md',
      )}
    >
      <Card.Content>
        <PostCardContent
          post={post}
          context={context}
          activeTagId={activeTagId}
          collapsible={collapsible}
        />
      </Card.Content>
      {!isDeleted && (
        <div className={clsx(context === 'post' && 'pb-2')}>
          <PostActionBar
            post={post}
            isLastChild={
              context === 'post' || (!replyBar && !post?.replies?.nodes?.length)
            }
          />
        </div>
      )}

      {replyBar && (canReply || post?.replies?.nodes?.length) ? (
        <Card.Content
          className={clsx(
            'flex flex-col space-y-6 px-5',
            !post?.replies?.nodes?.length && 'sm:p-4 sm:px-6 py-4',
          )}
        >
          {post?.totalRepliesCount > 2 ? (
            <Link
              className="text-sm leading-5 font-medium text-basicSurface-500"
              to={postLink}
            >
              View {post?.totalRepliesCount - 2} more replies
            </Link>
          ) : null}
          <div className="relative flex flex-col space-y-6">
            {post?.replies?.nodes
              ?.map(reply => <Reply reply={reply} key={reply.id} canReply />)
              .reverse()}
            {canReply && replyBar && !isDeleted ? (
              <ReplyBar post={post} />
            ) : null}
            <div className="absolute -z-10 w-[2px] ml-[-1px] top-1 left-6 bottom-0 bg-surface-200" />
          </div>
        </Card.Content>
      ) : (
        <div className="h-4"></div>
      )}
    </Card>
  )
}
