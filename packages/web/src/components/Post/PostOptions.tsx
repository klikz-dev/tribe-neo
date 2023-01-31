import { useState } from 'react'

import EyeOffIcon from '@heroicons/react/outline/EyeOffIcon'
import LocationMarkerIcon from '@heroicons/react/outline/LocationMarkerIcon'
import PencilAltIcon from '@heroicons/react/outline/PencilAltIcon'
import TrashIcon from '@heroicons/react/outline/TrashIcon'
import { useHistory, useLocation } from 'react-router'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Post, PinnedInto } from '@tribeplatform/gql-client/types'
import {
  useDeletePost,
  useHidePost,
  useUnhidePost,
  usePinPostToSpace,
  useUnpinPostFromSpace,
} from '@tribeplatform/react-sdk/hooks'
import { Dropdown } from '@tribeplatform/react-ui-kit/Dropdown'

import { createPostAddress } from '../../utils/post'
import { PostModal } from '../Space/PostModal'
import { PostContext } from './@types'

export const PostOptions = ({
  post,
  context,
}: {
  post: Post
  context: PostContext
}) => {
  const history = useHistory()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const { mutate: deletePost } = useDeletePost()
  const { mutate: hidePost } = useHidePost()
  const { mutate: unhidePost } = useUnhidePost()
  const { mutate: pinPostToSpace } = usePinPostToSpace()
  const { mutate: unpinPostFromSpace } = useUnpinPostFromSpace()

  const [canUpdatePost, canRemovePost, canHidePost] = hasScopesPermission(
    post,
    ['updatePost', 'removePost', 'hidePost'],
  )

  const [canPinPost, canUnpinPost] = hasScopesPermission(post?.space, [
    'pinPostToSpace',
    'unpinPostFromSpace',
  ])

  const isPinned = post?.pinnedInto?.includes(PinnedInto.SPACE)
  const canPin = canPinPost && (context === 'post' || context === 'space')
  const canUnpin = canUnpinPost && (context === 'post' || context === 'space')

  const openModal = () => setOpen(true)
  const removePost = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(
        {
          id: post.id,
        },
        {
          onSuccess: () => {
            const postAddress = createPostAddress(
              post?.space?.slug,
              post.id,
              post.slug,
            )
            if (location.pathname === postAddress) {
              const slug = post?.space?.slug
              history.replace(slug ? `/${slug}` : '/')
            }
          },
        },
      )
    }
  }

  const toggleHidePost = () => {
    if (post.isHidden) {
      unhidePost({
        id: post.id,
      })
    } else {
      hidePost({
        id: post.id,
      })
    }
  }
  if (!canHidePost && !canRemovePost && !canUpdatePost) return null

  return (
    <>
      <Dropdown placement="bottom-end">
        <Dropdown.ButtonMinimal className="mx-2" />
        <Dropdown.Items className="w-56 divide-y divide-neutral-100">
          <div className="pb-1">
            {canPin && isPinned && (
              <Dropdown.Item
                leadingIcon={<LocationMarkerIcon />}
                onClick={() => {
                  unpinPostFromSpace({ postId: post.id })
                }}
              >
                Unpin
              </Dropdown.Item>
            )}
            {canUnpin && !isPinned && (
              <Dropdown.Item
                leadingIcon={<LocationMarkerIcon />}
                onClick={() => {
                  pinPostToSpace({ postId: post.id })
                }}
              >
                Pin
              </Dropdown.Item>
            )}
            {canUpdatePost && (
              <Dropdown.Item
                leadingIcon={<PencilAltIcon />}
                onClick={openModal}
              >
                Edit
              </Dropdown.Item>
            )}
            {canRemovePost && (
              <Dropdown.Item onClick={removePost} leadingIcon={<TrashIcon />}>
                Delete
              </Dropdown.Item>
            )}
          </div>
          {canHidePost && (
            <div className="pt-1">
              <Dropdown.Item
                leadingIcon={<EyeOffIcon />}
                onClick={toggleHidePost}
              >
                {post.isHidden ? 'Unhide' : 'Hide'}
              </Dropdown.Item>
            </div>
          )}
        </Dropdown.Items>
      </Dropdown>

      {open && <PostModal post={post} onClose={() => setOpen(false)} />}
    </>
  )
}
