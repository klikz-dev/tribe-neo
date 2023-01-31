import ChevronUpIcon from '@heroicons/react/outline/ChevronUpIcon'
import ThumbUpIcon from '@heroicons/react/solid/ThumbUpIcon'
import clsx from 'clsx'
import { Emoji } from 'emoji-mart-virtualized'

import {
  PostReactionDetail,
  ReactionType,
} from '@tribeplatform/gql-client/types'
import { Link } from '@tribeplatform/react-ui-kit/Link'

export const Reaction = ({
  reaction,
  reactionType,
  onClick,
}: {
  reaction: PostReactionDetail
  reactionType: ReactionType
  onClick?: (reaction: PostReactionDetail) => void
}) => {
  switch (reactionType) {
    case ReactionType.LIKE_BASE:
      return (
        <Link
          className={clsx(
            'rounded-full flex items-center justify-center -mr-2 p-1',
            reaction.reacted
              ? 'bg-actionPrimary-600 hover:bg-actionPrimary-700'
              : 'bg-surface-200 hover:bg-surface-300',
          )}
          onClick={() => {
            onClick?.(reaction)
          }}
        >
          <ThumbUpIcon
            className={clsx('w-3 h-3', { 'text-white': reaction.reacted })}
          />
        </Link>
      )
    case ReactionType.VOTE_BASE:
      return (
        <Link
          className={clsx(
            'rounded-full flex items-center justify-center -mr-2 p-1',
            reaction.reacted
              ? 'bg-actionPrimary-600 hover:bg-actionPrimary-700'
              : 'bg-surface-200 hover:bg-surface-300',
          )}
          onClick={() => {
            onClick?.(reaction)
          }}
        >
          <ChevronUpIcon
            className={clsx('w-3 h-3', { 'text-white': reaction.reacted })}
          />
        </Link>
      )
    case ReactionType.EMOJI_BASE:
    default:
      return (
        <Link
          className={clsx(
            'rounded-full w-9 h-7 border-2 border-neutral-100 -mr-2 flex items-center justify-center overflow-hidden',
            'bg-surface-200 hover:bg-surface-300',
          )}
          onClick={() => {
            onClick?.(reaction)
          }}
        >
          <Emoji native emoji={reaction.reaction} size={18} />
        </Link>
      )
  }
}
