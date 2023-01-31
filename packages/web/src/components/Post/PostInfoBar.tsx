import { useState } from 'react'

import {
  Member,
  Post,
  PostReactionParticipant,
} from '@tribeplatform/gql-client/types'
import { useAuthMember } from '@tribeplatform/react-sdk/hooks'
import { Tooltip } from '@tribeplatform/react-ui-kit/Tooltip'

import { Reaction } from './Reaction'
import { ReactionsModal } from './ReactionsModal'

const getListFromParticipants = (
  nodes: PostReactionParticipant[],
  authUser?: Member,
): string => {
  if (typeof nodes !== 'object') return ''
  return nodes.reduce((acc, node, i) => {
    const { participant } = node as any
    const name = authUser?.id === participant?.id ? 'you' : participant?.name
    if (i === 0) {
      return name
    }

    if (i === nodes.length - 1) {
      const hasComma = nodes.length > 2
      return `${acc}${hasComma ? ',' : ''} and ${name}`
    }

    return `${acc}, ${name}`
  }, '')
}

export const PostInfoBar = ({ post }: { post: Post }) => {
  const { reactions, totalRepliesCount, followersCount } = post
  let totalReactions = 0
  const { data: authMember } = useAuthMember()

  const [reactionsModal, setReactionsModal] = useState(false)
  const showFollowersCount =
    typeof followersCount === 'number' && followersCount > 1

  if (!totalRepliesCount && !showFollowersCount && !reactions?.length)
    return null

  return (
    <>
      <div className="flex h-7 space-x-3">
        <div className="flex-grow">
          {reactions?.length ? (
            <div className="flex items-center">
              {reactions?.map(reaction => {
                totalReactions += reaction.count
                return (
                  <Tooltip key={reaction.reaction}>
                    <Tooltip.Trigger onClick={() => setReactionsModal(true)}>
                      <Reaction
                        reaction={reaction}
                        reactionType={post.primaryReactionType}
                      />
                    </Tooltip.Trigger>
                    {typeof reaction.participants?.nodes === 'object' && (
                      <Tooltip.Panel>
                        {getListFromParticipants(
                          reaction.participants?.nodes,
                          authMember,
                        )}
                      </Tooltip.Panel>
                    )}
                  </Tooltip>
                )
              })}
              <div className="mx-3 text-basicSurface-500 text-sm">
                {totalReactions}
              </div>
            </div>
          ) : null}
        </div>
        {showFollowersCount ? (
          <div className="text-basicSurface-500 hidden sm:block">
            {followersCount - 1}{' '}
            {followersCount - 1 === 1 ? 'follower' : 'followers'}
          </div>
        ) : null}
        {totalRepliesCount ? (
          <div className="text-basicSurface-500">
            {totalRepliesCount} {totalRepliesCount === 1 ? 'reply' : 'replies'}
          </div>
        ) : null}
      </div>
      {reactionsModal && (
        <ReactionsModal
          open={reactionsModal}
          onClose={() => setReactionsModal(false)}
          reactions={reactions}
          postId={post?.id}
        />
      )}
    </>
  )
}
