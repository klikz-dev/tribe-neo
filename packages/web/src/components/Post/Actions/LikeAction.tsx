import ChevronUpIcon from '@heroicons/react/outline/ChevronUpIcon'
import ThumbUpIcon from '@heroicons/react/outline/ThumbUpIcon'

import { Post, ReactionType } from '@tribeplatform/gql-client/types'

import { SingleReaction } from './SingleReaction'
import { SingleReactionWithOptions } from './SingleReactionWithOptions'

const Reactions = {
  '+1': 'Like',
  heart: 'Love',
  tada: 'Celebrate',
  smile: 'Smile',
  open_mouth: 'Wow!',
  cry: 'Cry',
}

export const LikeAction = ({ post }: { post: Post }) => {
  switch (post?.primaryReactionType) {
    case ReactionType.VOTE_BASE:
      return (
        <SingleReaction
          post={post}
          text="Upvote"
          reaction="+1"
          Icon={<ChevronUpIcon className="w-6 h-6" />}
        />
      )
    case ReactionType.LIKE_BASE:
      return (
        <SingleReaction
          post={post}
          text="Like"
          reaction="+1"
          Icon={<ThumbUpIcon className="w-6 h-6" />}
        />
      )
    case ReactionType.EMOJI_BASE:
      return (
        <SingleReactionWithOptions
          post={post}
          mainReaction="+1"
          mainReactionText="Like"
          options={Reactions}
        />
      )
    default:
      return null
  }
}
