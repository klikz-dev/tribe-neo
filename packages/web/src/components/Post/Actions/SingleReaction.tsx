import { FC, ReactNode, useCallback, useMemo } from 'react'

import clsx from 'clsx'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Post } from '@tribeplatform/gql-client/types'
import {
  useAddReaction,
  useRemoveReaction,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Link } from '@tribeplatform/react-ui-kit/Link'

import { useLogin } from '../../../hooks/useLogin'

export const SingleReaction: FC<{
  post: Post
  text: string
  reaction: string
  Icon: ReactNode
  className?: string
  simple?: boolean
}> = ({ post, text, reaction, Icon, className, simple = false }) => {
  const { mutate: removeReaction } = useRemoveReaction()
  const { mutate: addReaction } = useAddReaction()
  const { isLoggedIn, showLogin } = useLogin()

  const selectedReaction = useMemo(
    () => post?.reactions?.find(r => r.reaction === reaction),
    [post.reactions, reaction],
  )
  const reacted = selectedReaction?.reacted

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
    reaction => {
      if (!isLoggedIn) return showLogin()
      addReaction({
        postId: post?.id,
        input: {
          reaction,
        },
      })
    },
    [post.id, addReaction, showLogin, isLoggedIn],
  )

  if (simple) {
    return (
      <Link
        variant={reacted ? 'accent' : 'neutral'}
        disabled={disabled}
        className={clsx('flex items-center', className)}
        onClick={() => {
          if (reacted) {
            onRemoveReaction(reaction)
          } else {
            onAddReaction(reaction)
          }
        }}
      >
        <span className="mr-2">{Icon}</span>
        <span>{text}</span>
      </Link>
    )
  }

  return (
    <div className="flex-1 flex">
      <Button
        variant="outline"
        className={clsx(
          'group',
          reacted && ' bg-surface-100 hover:bg-surface-200',
          className,
        )}
        size="md"
        fullWidth
        disabled={disabled}
        leadingIcon={Icon}
        onClick={() => {
          if (reacted) {
            onRemoveReaction(reaction)
          } else {
            onAddReaction(reaction)
          }
        }}
      >
        {text}
      </Button>
    </div>
  )
}
