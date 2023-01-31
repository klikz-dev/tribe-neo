import PencilAltIcon from '@heroicons/react/outline/PencilAltIcon'
import TrashIcon from '@heroicons/react/outline/TrashIcon'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import { Post } from '@tribeplatform/gql-client/types'
import { useDeletePost } from '@tribeplatform/react-sdk/hooks'
import { Dropdown } from '@tribeplatform/react-ui-kit/Dropdown'

export const ReplyOptions = ({
  reply,
  onEdit,
}: {
  reply: Post
  onEdit: () => void
}) => {
  const { mutate: deletePost } = useDeletePost()
  const [canUpdatePost, canRemovePost] = hasScopesPermission(reply, [
    'updatePost',
    'removePost',
  ])

  const removePost = () => {
    if (window.confirm('Are you sure you want to delete this reply?')) {
      deletePost({
        id: reply.id,
      })
    }
  }

  if (!canRemovePost && !canUpdatePost) return null

  return (
    <Dropdown placement="bottom-end">
      <Dropdown.ButtonMinimal className="mx-2" />
      <Dropdown.Items className="w-56">
        {canUpdatePost && (
          <Dropdown.Item leadingIcon={<PencilAltIcon />} onClick={onEdit}>
            Edit
          </Dropdown.Item>
        )}
        {canRemovePost && (
          <Dropdown.Item onClick={removePost} leadingIcon={<TrashIcon />}>
            Delete
          </Dropdown.Item>
        )}
      </Dropdown.Items>
    </Dropdown>
  )
}
