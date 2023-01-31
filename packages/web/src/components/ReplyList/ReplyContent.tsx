import { useCallback } from 'react'

import { Post } from '@tribeplatform/gql-client/types'
import { usePost, useUpdatePost } from '@tribeplatform/react-sdk/hooks'

import { getMappingFields } from '../../utils/post'
import { useAttachments } from '../Composer/hooks/useAttachments'
import { PostContent } from '../Post/PostContent'
import { ReplyEditor, ReplyEditorProps } from './ReplyEditor'

export const ReplyContent = ({
  reply,
  edit,
  onEdit,
  onCancel,
}: {
  reply: Post
  edit: boolean
  onEdit: () => void
} & Pick<ReplyEditorProps, 'onCancel'>) => {
  const { mutate: updatePost, isLoading } = useUpdatePost()
  const { attachments, handleAttachmentSelect, handleAttachmentDelete } =
    useAttachments(reply.attachments)
  const { data: fullReply } = usePost({
    id: reply.id,
    useQueryOptions: {
      enabled: edit,
    },
  })

  const update = useCallback(
    async (content, quillRef) => {
      const _content = content || ''
      const postType = reply?.postType || fullReply?.postType
      const mappingFields = getMappingFields({
        content: _content,
        postTypeName: postType.name,
      })

      updatePost(
        {
          id: reply.id,
          input: {
            mappingFields,
            publish: true,
            attachmentIds: attachments.map(({ id }) => id),
          },
        },
        {
          onSuccess: () => {
            quillRef.current.clear()
            onEdit?.()
          },
        },
      )
    },
    [
      reply?.postType,
      reply.id,
      fullReply?.postType,
      updatePost,
      attachments,
      onEdit,
    ],
  )

  if (edit) {
    return (
      <ReplyEditor
        attachments={attachments}
        onAttachmentSelect={handleAttachmentSelect}
        onAttachmentDelete={handleAttachmentDelete}
        reply={reply}
        onCancel={onCancel}
        isLoading={isLoading}
        onReply={update}
      />
    )
  }
  return <PostContent post={reply} />
}
