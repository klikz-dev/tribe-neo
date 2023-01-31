import { useCallback } from 'react'

import BellIcon from '@heroicons/react/outline/BellIcon'
import clsx from 'clsx'

import { Post } from '@tribeplatform/gql-client/types'
import { useUpdateMemberPostNotificationSettings } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'

import { useLogin } from '../../../hooks/useLogin'

export const FollowAction = ({ post }: { post: Post }) => {
  const { isLoggedIn, showLogin } = useLogin()

  const { isLoading, mutate: updateMemberPostNotificationSettings } =
    useUpdateMemberPostNotificationSettings()

  const isFollowed =
    post?.authMemberProps?.memberPostNotificationSettingsEnabled

  const handleClick = useCallback(
    e => {
      if (!isLoggedIn) {
        e.preventDefault()
        return showLogin()
      }
      if (isLoading) {
        return
      }

      updateMemberPostNotificationSettings({
        input: {
          enabled: !isFollowed,
        },
        postId: post?.id,
      })
    },
    [
      isFollowed,
      isLoading,
      post?.id,
      updateMemberPostNotificationSettings,
      isLoggedIn,
      showLogin,
    ],
  )

  return (
    <div className="flex-1 flex">
      <Button
        variant="outline"
        className={clsx(
          'group',
          isFollowed && 'bg-surface-100 hover:bg-surface-200',
        )}
        size="md"
        fullWidth
        leadingIcon={
          isFollowed ? (
            <BellIcon className="w-6 h-6 -rotate-12" />
          ) : (
            <BellIcon className="w-6 h-6 transition-transform group-hover:-rotate-12" />
          )
        }
        onClick={handleClick}
      >
        {isFollowed ? 'Following' : 'Follow'}
      </Button>
    </div>
  )
}
