import { useMemo, useState } from 'react'

import ChatIcon from '@heroicons/react/outline/ChatIcon'
import ShareIcon from '@heroicons/react/outline/ShareIcon'
import clsx from 'clsx'
import useWebShare from 'react-use-web-share'
import useMobileDetect from 'use-mobile-detect-hook'

import { Post } from '@tribeplatform/gql-client/types'
import { useNetwork } from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { createPostAddress } from '../../utils/post'
import { ShareModal } from '../ShareModal'
import { FollowAction } from './Actions/FollowAction'
import { LikeAction } from './Actions/LikeAction'

export const PostActionBar = ({
  post,
  actions,
  isLastChild = false,
}: {
  post: Post
  actions?: string[]
  isLastChild?: boolean
}) => {
  if (!actions) actions = ['like', 'follow', 'share']

  const { data: network } = useNetwork()
  const [shareModal, setShareModal] = useState(false)
  const { isSupported, share } = useWebShare()
  const detectMobile = useMobileDetect()

  const postUrl = `https://${network.domain}${createPostAddress(
    post?.space?.slug,
    post?.id,
    post?.slug,
  )}`

  const allActions = useMemo(
    () => ({
      like: {
        Component: LikeAction,
      },
      reply: {
        icon: ChatIcon,
        text: 'Reply',
      },
      follow: {
        Component: FollowAction,
      },
      share: {
        icon: ShareIcon,
        text: 'Share',
        action: () => {
          if (isSupported && detectMobile.isMobile()) {
            share({ title: post.title, url: postUrl })
          } else {
            setShareModal(true)
          }
        },
      },
    }),
    [setShareModal, share, isSupported, postUrl, post.title],
  )

  return (
    <>
      <Card.Content
        className={clsx(
          'flex space-x-4 py-0 sm:p-1 sm:px-6',
          isLastChild && 'pb-3',
        )}
      >
        {actions.map(key => {
          const action = allActions[key]
          if (!action) return null

          if (action.Component)
            return <action.Component post={post} key={key} />

          return (
            <div className="flex-1 flex" key={key}>
              <Button
                variant="outline"
                onClick={action.action}
                className="group"
                size="md"
                fullWidth
                leadingIcon={
                  <action.icon className="w-6 h-6 transition-transform group-hover:-rotate-12" />
                }
              >
                {action.text}
              </Button>
            </div>
          )
        })}
      </Card.Content>
      <ShareModal
        modalTitle="Share post"
        open={shareModal}
        onClose={() => setShareModal(false)}
        title={post.title}
        url={postUrl}
      />
    </>
  )
}
