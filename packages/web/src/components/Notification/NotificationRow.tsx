import { Emoji } from 'emoji-mart-virtualized'

import { Types } from '@tribeplatform/gql-client/'
import { Avatar } from '@tribeplatform/react-ui-kit/Avatar'

import { dayjs } from '../../lib/dayjs'
import { getPostFields } from '../../utils/post'
import { truncate } from '../../utils/string'
import { ComposerReadonly } from '../Composer'

export enum NotificationVerb {
  COMMENT_CREATED = 'COMMENT_CREATED',
  COMMENT_UPDATED = 'COMMENT_UPDATED',
  JOIN_REQUEST_STATUS_UPDATED = 'JOIN_REQUEST_STATUS_UPDATED',
  MEMBER_MENTIONED = 'MEMBER_MENTIONED',
  POST_CREATED = 'POST_CREATED',
  POST_UPDATED = 'POST_UPDATED',
  REACTION_CREATED = 'REACTION_CREATED',
  REPLY_CREATED = 'REPLY_CREATED',
  SPACE_MEMBER_ADDED = 'SPACE_MEMBER_ADDED',
  POST_DELETED = 'POST_DELETED',
}

const TRUNCATE_CHARACTER_LIMIT = 64

export const getLink = ({
  target,
  space,
  object,
  verb,
}: Types.Notification) => {
  const rootPost =
    target?.post?.repliedTos[target?.post?.repliedTos?.length - 1] ||
    target?.post

  switch (verb) {
    case NotificationVerb.COMMENT_CREATED:
    case NotificationVerb.COMMENT_UPDATED:
    case NotificationVerb.REPLY_CREATED:
      return `/${space?.slug}/post/${rootPost?.slug}-${rootPost?.id}?highlight=${object.id}`
    case NotificationVerb.REACTION_CREATED:
      return `/${space?.slug}/post/${rootPost?.slug}-${rootPost?.id}?highlight=${target.id}`
    case NotificationVerb.POST_CREATED:
    case NotificationVerb.POST_UPDATED:
      return `/${space?.slug}/post/${object?.post?.slug}-${object.id}?highlight=${object.id}`
    case NotificationVerb.MEMBER_MENTIONED:
      return `/${space?.slug}/post/${rootPost?.slug}-${rootPost?.id}?highlight=${target.id}`
    case NotificationVerb.SPACE_MEMBER_ADDED:
    case NotificationVerb.JOIN_REQUEST_STATUS_UPDATED:
      return `/${space?.slug}`
    case NotificationVerb.POST_DELETED:
      return `/${space?.slug}`
    default:
      return ''
  }
}

export const Summary = ({ content }) => {
  if (!content || content?.length <= 3) return null
  return (
    <div className="p-3 rounded-lg my-2 bg-surface-100">
      <ComposerReadonly content={content} />
    </div>
  )
}

export const getTitle = (
  { actor, target, object, verb, meta }: Types.Notification,
  showSummary: boolean,
) => {
  if (!actor || !(target && target.type)) {
    // eslint-disable-next-line no-console
    console.error('error - Invalid Notification Structure', actor, target)
    return null
  }
  const actorName = actor.summary

  const objectFields = getPostFields(object?.post)
  const targetFields = getPostFields(target?.post)
  const rootFields = getPostFields(
    target?.post?.repliedTos[target?.post?.repliedTos?.length - 1],
  )

  switch (verb) {
    case NotificationVerb.COMMENT_CREATED:
    case NotificationVerb.REPLY_CREATED:
      return (
        <>
          <div>
            <strong className="font-semibold text-basicSurface-500">
              {actorName}
            </strong>{' '}
            replied to{' '}
            <strong className="font-semibold text-basicSurface-500">
              {truncate(meta.textTitle, TRUNCATE_CHARACTER_LIMIT)}
            </strong>
          </div>
          {showSummary && <Summary content={meta.textBody} />}
        </>
      )

    case NotificationVerb.COMMENT_UPDATED:
      return (
        <>
          <strong className="font-semibold text-basicSurface-500">
            {actorName}
          </strong>{' '}
          updated their reply to{' '}
          <strong className="font-semibold text-basicSurface-500">
            {truncate(
              rootFields?.title?.value ||
                rootFields?.question?.value ||
                targetFields?.title?.value ||
                targetFields?.question?.value,
              TRUNCATE_CHARACTER_LIMIT,
            )}
          </strong>
        </>
      )

    case NotificationVerb.REACTION_CREATED:
      return (
        <>
          <strong className="font-semibold text-basicSurface-500">
            {actorName}
          </strong>{' '}
          reacted to{' '}
          <strong className="font-semibold text-basicSurface-500">
            {truncate(
              target?.name || meta?.textBody,
              TRUNCATE_CHARACTER_LIMIT,
            ) || ' your post'}
          </strong>
        </>
      )

    case NotificationVerb.POST_CREATED:
      return (
        <>
          <div>
            <strong className="font-semibold text-basicSurface-500">
              {actorName}
            </strong>{' '}
            posted{' '}
            <strong className="font-semibold text-basicSurface-500">
              {truncate(meta?.textTitle, TRUNCATE_CHARACTER_LIMIT)}
            </strong>{' '}
            in{' '}
            <strong className="font-semibold text-basicSurface-500">
              {target?.summary}
            </strong>
          </div>
          {showSummary && <Summary content={meta?.textBody} />}
        </>
      )

    case NotificationVerb.POST_DELETED:
      return (
        <>
          <div>
            <strong className="font-semibold text-basicSurface-500">
              {actorName}
            </strong>{' '}
            deleted{' '}
            <strong className="font-semibold text-basicSurface-500">
              {truncate(meta?.textTitle, TRUNCATE_CHARACTER_LIMIT)}
            </strong>{' '}
            from{' '}
            <strong className="font-semibold text-basicSurface-500">
              {target?.summary}
            </strong>
          </div>
        </>
      )

    case NotificationVerb.POST_UPDATED:
      return (
        <>
          <div>
            <strong className="font-semibold text-basicSurface-500">
              {actorName}
            </strong>{' '}
            updated{' '}
            <strong className="font-semibold text-basicSurface-500">
              {truncate(
                objectFields?.title?.value || objectFields?.question?.value,
                TRUNCATE_CHARACTER_LIMIT,
              )}
            </strong>{' '}
            in{' '}
            <strong className="font-semibold text-basicSurface-500">
              {target?.summary}
            </strong>
          </div>
          {showSummary && <Summary content={object?.summary} />}
        </>
      )

    case NotificationVerb.MEMBER_MENTIONED:
      return (
        <>
          <div>
            <strong className="font-semibold text-basicSurface-500">
              {actorName}
            </strong>{' '}
            mentioned you in{' '}
            <strong className="font-semibold text-basicSurface-500">
              {truncate(
                rootFields?.title?.value ||
                  rootFields?.question?.value ||
                  targetFields?.title?.value ||
                  targetFields?.question?.value,
                TRUNCATE_CHARACTER_LIMIT,
              )}
            </strong>
          </div>
          {showSummary && <Summary content={target?.summary} />}
        </>
      )

    case NotificationVerb.SPACE_MEMBER_ADDED:
      return (
        <>
          <strong className="font-semibold text-basicSurface-500">
            {actorName}
          </strong>{' '}
          added {object?.summary} to{' '}
          <strong className="font-semibold text-basicSurface-500">
            {target?.summary}
          </strong>
        </>
      )
    case NotificationVerb.JOIN_REQUEST_STATUS_UPDATED:
      return (
        <>
          <strong className="font-semibold text-basicSurface-500">
            {actorName}
          </strong>{' '}
          added {object?.summary} to{' '}
          <strong className="font-semibold text-basicSurface-500">
            {target?.summary}
          </strong>
        </>
      )

    default:
      return (
        <>
          <strong className="font-semibold text-basicSurface-500">
            {actorName}
          </strong>{' '}
          {verb} on your {target?.type?.toLowerCase()}
        </>
      )
  }
}

export const NotificationRow = ({ notification, showSummary = true }) => {
  if (!notification.meta) return null
  return (
    <>
      <Avatar
        icon={
          notification?.object?.id &&
          notification?.verb === NotificationVerb.REACTION_CREATED ? (
            <span className="-ml-0.5 -mt-1 block">
              <Emoji native emoji={`:${notification?.object?.id}:`} size={20} />
            </span>
          ) : null
        }
        name={notification?.actor?.summary}
        src={notification?.actor?.media?.urls?.thumb}
      />
      <div className="flex-1 space-y-1">
        <div>
          <p className="text-sm text-basicSurface-400">
            {getTitle(notification, showSummary)}
          </p>
          <p className="text-sm text-basicSurface-500 flex-shrink-0">
            {dayjs(notification?.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <div>
        {!notification.read ? (
          <div className="m-1 bg-actionPrimary-500 rounded-full w-2 h-2"></div>
        ) : null}
      </div>
    </>
  )
}
