import { useCallback, useMemo, useRef, useState } from 'react'

import ReplyIcon from '@heroicons/react/outline/ReplyIcon'
import ThumbUpIcon from '@heroicons/react/outline/ThumbUpIcon'
import TrashIcon from '@heroicons/react/outline/TrashIcon'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { Link as ReactLink } from 'react-router-dom'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Post, PostStatus } from '@tribeplatform/gql-client/types'
import { useReplies } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'
import { Icon } from '@tribeplatform/react-ui-kit/Icon'
import { SpinnerIcon } from '@tribeplatform/react-ui-kit/icons'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { useQuery } from '@tribeplatform/slate-kit/utils'

import { useLogin } from '../../hooks/useLogin'
import { useQuitQuill } from '../Composer/hooks/useQuitQuill'
import { SingleReaction } from '../Post/Actions/SingleReaction'
import { PostPendingIndicator } from '../Post/PostPendingIndicator'
import { ReplyBar, ReplyBarRef } from '../Post/ReplyBar'
import { ReplyContent } from './ReplyContent'
import { ReplyOptions } from './ReplyOptions'

export const Reply = ({
  reply,
  canReply,
}: {
  reply: Post
  canReply: boolean
}) => {
  const { canQuit } = useQuitQuill()
  const replyRef = useRef<ReplyBarRef>()
  const limit = 5
  const [showReply, setShowReply] = useState(false)
  const [edit, setEdit] = useState(false)
  const { isLoggedIn, showLogin } = useLogin()

  const member = reply?.owner?.member

  if (reply) {
    const [canCreateReply] = hasScopesPermission(reply, ['createReply'])
    if (!canCreateReply || !reply.authMemberProps.availableReplyTypes?.length)
      canReply = false
  }

  const { data, fetchNextPage, refetch, isFetching } = useReplies({
    variables: {
      limit,
      postId: reply.id,
      reverse: true,
    },
    fields: 'default',
    useInfiniteQueryOptions: {
      enabled: false,
      refetchOnMount: 'always',
      placeholderData: useMemo(() => {
        if (reply?.replies?.totalCount > 0) {
          return {
            pageParams: [],
            pages: [reply.replies],
          }
        }
      }, [reply?.replies]),
    },
  })

  const query = useQuery()
  const { nodes: replies } = simplifyPaginatedResult<Post>(data)
  const unloadedReplies = Math.min(
    limit,
    reply.totalRepliesCount - replies.length,
  )

  const finishEditing = useCallback(() => setEdit(false), [])

  const onCancel = useCallback(
    quillRef => {
      if (canQuit(quillRef)) {
        finishEditing()
      }
    },
    [canQuit, finishEditing],
  )

  return (
    <div
      className={clsx(
        reply.id === query?.highlight
          ? 'ring ring-offset-surface-50 ring-offset-4 ring-warning-500 rounded-md'
          : '',
        'flex space-x-4',
      )}
      key={reply.id}
    >
      <div className="flex-shrink-0">
        <ReactLink to={`/member/${member?.id}`}>
          <Avatar
            src={
              member?.profilePicture && 'urls' in member?.profilePicture
                ? member?.profilePicture?.urls?.thumb
                : undefined
            }
            name={member?.name}
            size="lg"
          />
        </ReactLink>
      </div>
      <div className="flex-grow overflow-hidden">
        <div className="h-10 items-center mb-4 -mt-1">
          <div className="flex justify-between overflow-hidden">
            <ReactLink
              to={`/member/${member.id}`}
              className="font-medium text-basicSurface-900 truncate"
            >
              {member.name}
            </ReactLink>
            <div className="flex items-center">
              {reply.status === PostStatus.BLOCKED && <PostPendingIndicator />}
              <ReplyOptions onEdit={() => setEdit(true)} reply={reply} />
            </div>
          </div>
          <div className="text-sm text-basicSurface-500 truncate max-w-full whitespace-nowrap inline-block mt-1">
            {reply?.status === PostStatus.DELETED && (
              <span>
                <span className="text-danger-500 inline-flex items-center">
                  <span>Deleted</span>
                  <TrashIcon className="w-4 h-4 ml-0.5" />
                </span>
                <span> · </span>
              </span>
            )}
            <time
              dateTime={reply.createdAt}
              title={dayjs(reply.createdAt).toDate().toLocaleString()}
            >
              {dayjs(reply.createdAt).fromNow()}
            </time>
            {member?.tagline ? <span> · {member?.tagline}</span> : null}
          </div>
        </div>
        <ReplyContent
          reply={reply}
          edit={edit}
          onCancel={onCancel}
          onEdit={finishEditing}
        />
        <div className=" flex space-x-5 text-sm">
          <SingleReaction
            Icon={<ThumbUpIcon className="w-4 h-4" />}
            post={reply}
            reaction="+1"
            className="font-medium"
            simple
            text={`${
              reply.reactionsCount > 0
                ? `${reply.reactionsCount} ${
                    reply.reactionsCount > 1 ? 'likes' : 'like'
                  }`
                : 'Like'
            }`}
          />
          {canReply && (
            <Link
              variant="neutral"
              onClick={e => {
                if (!isLoggedIn) {
                  e.preventDefault()
                  return showLogin()
                }

                setShowReply(true)
                refetch({ refetchPage: (page, index) => index === 0 })
                // to re-expand it
                if (showReply && replyRef) {
                  replyRef.current.expand(true)
                }
                // to jump into the input box
                setTimeout(() => {
                  if (replyRef) replyRef.current.scrollIntoView()
                }, 100)
                // to jump again after loading the replies first page
                setTimeout(() => {
                  if (replyRef) replyRef.current.scrollIntoView()
                }, 1000)
              }}
              className="font-medium"
            >
              Reply
            </Link>
          )}
        </div>
        {unloadedReplies > 0 ? (
          <div className="flex items-center mt-4 space-x-3">
            <Link
              variant="inherit"
              className="text-sm leading-5 font-medium text-basicSurface-500 flex items-center space-x-1"
              onClick={() => {
                fetchNextPage()
              }}
              title={`total replies of ${reply.totalRepliesCount}`}
            >
              <Icon className="w-4 h-4 rotate-180">
                <ReplyIcon />
              </Icon>
              <span>
                {unloadedReplies} {unloadedReplies === 1 ? 'reply' : 'replies'}
              </span>
            </Link>
            {isFetching && <SpinnerIcon className="animate-spin" />}
          </div>
        ) : null}
        {replies?.length > 0 || (canReply && showReply) ? (
          <div className="relative flex flex-col space-y-6 mt-6">
            {replies
              ?.map(reply => (
                <Reply reply={reply} key={reply.id} canReply={false} />
              ))
              ?.reverse()}
            {canReply && showReply && (
              <ReplyBar ref={replyRef} post={reply} defaultExpand />
            )}
            <div className="absolute -z-10 w-[2px] ml-[-1px] top-1 left-6 bottom-0 bg-surface-200" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
