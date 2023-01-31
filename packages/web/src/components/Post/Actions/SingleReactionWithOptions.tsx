import { useCallback, useMemo } from 'react'

import ThumbUpIcon from '@heroicons/react/outline/ThumbUpIcon'
import { Emoji } from 'emoji-mart-virtualized'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Post } from '@tribeplatform/gql-client/types'
import {
  useAddReaction,
  useRemoveReaction,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { Popover } from '@tribeplatform/react-ui-kit/Popover'

import { useLogin } from '../../../hooks/useLogin'

export const SingleReactionWithOptions = ({
  post,
  options,
  mainReactionText,
  mainReaction,
}: {
  post: Post
  mainReactionText: string
  mainReaction: string
  options: { [key: string]: string }
}) => {
  const { mutate: removeReaction } = useRemoveReaction()
  const { mutate: addReaction } = useAddReaction()
  const { isLoggedIn, showLogin } = useLogin()

  const selectedReaction = useMemo(
    () => post.reactions?.find(r => options[r.reaction] && r.reacted),
    [post.reactions, options],
  )

  let disabled = false

  if (post && isLoggedIn) {
    const [canReact] = hasScopesPermission(post, ['addReaction'])
    if (!canReact || !post.authMemberProps.canReact) disabled = true
  }

  const onRemoveReaction = useCallback(
    reaction => {
      removeReaction({
        postId: post.id,
        reaction,
      })
    },
    [removeReaction, post.id],
  )

  const onAddReaction = useCallback(
    reaction => e => {
      if (!isLoggedIn) {
        e.preventDefault()
        return showLogin()
      }
      addReaction({
        postId: post?.id,
        input: {
          reaction,
        },
      })
    },
    [post.id, addReaction, showLogin, isLoggedIn],
  )
  if (selectedReaction) {
    return (
      <div className="flex flex-1">
        <Button
          variant="outline"
          className="group bg-surface-100 hover:bg-surface-200"
          size="md"
          fullWidth
          disabled={disabled}
          leadingIcon={
            <div className="h-6 w-6 flex items-center">
              <Emoji native emoji={selectedReaction.reaction} size={22} />
            </div>
          }
          onClick={() => {
            onRemoveReaction(selectedReaction.reaction)
          }}
        >
          {options[selectedReaction.reaction]}
        </Button>
      </div>
    )
  }
  return (
    <Popover
      trigger={disabled ? null : 'hover'}
      placement="top"
      interactive
      padding="sm"
      className="flex-1 flex group"
      delayShow
    >
      <Popover.TriggerMinimal as="div" className="flex-1 flex">
        <Button
          variant="outline"
          className="group"
          size="md"
          fullWidth
          disabled={disabled}
          leadingIcon={
            <ThumbUpIcon className="w-6 h-6 transition-transform group-hover:-rotate-6" />
          }
          onClick={onAddReaction(mainReaction)}
        >
          {mainReactionText}
        </Button>
      </Popover.TriggerMinimal>
      <Popover.Panel rounded>
        <Popover.Content>
          <div className="flex space-x-2">
            {Object.keys(options).map(id => (
              <Link
                key={id}
                className="cursor-pointer w-12 h-12 flex justify-center items-center transform transition-transform hover:scale-125"
                to="#"
              >
                <Emoji
                  native
                  emoji={id}
                  onClick={onAddReaction(id)}
                  size={32}
                />
              </Link>
            ))}
          </div>
        </Popover.Content>
      </Popover.Panel>
    </Popover>
  )
}
