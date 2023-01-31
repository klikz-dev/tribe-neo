import { useCallback, useRef, useState } from 'react'

import { Post, PostStatus, Space } from '@tribeplatform/gql-client/types'
import {
  useAddPost,
  usePost,
  useUpdatePost,
} from '@tribeplatform/react-sdk/hooks'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { memberToMentionConverter } from '../../lib/composer.utils'
import { getMappingFields, getPostFieldValue } from '../../utils/post'
import { ComposerRefImperativeHandle } from '../Composer/@types'
import { useAttachments } from '../Composer/hooks/useAttachments'
import { ComposerModalContent } from './ComposerModalContent'
import { SelectableTag } from './SpaceTagsSelector'

const DISCUSSION_POST_TYPE_SLUG = 'tribe-discussion'

interface PostModalProps {
  post?: Post
  onClose?: () => void
  space?: Space
}

export const PostModal = ({ space, onClose, post }: PostModalProps) => {
  const isNew = !post
  const [titleError, setTitleError] = useState('')
  const editorRef = useRef<ComposerRefImperativeHandle>(null)

  const initialPostTags =
    post?.tags?.map(t => ({
      id: t.id,
      title: t.title,
    })) || []
  const [selectedTags, setSelectedTags] =
    useState<SelectableTag[]>(initialPostTags)

  const initialPostAttachments = post?.attachments || []
  const { attachments, handleAttachmentSelect, handleAttachmentDelete } =
    useAttachments(initialPostAttachments)

  const initialPostTitle =
    getPostFieldValue(post, 'title') ||
    getPostFieldValue(post, 'question') ||
    ''
  const [title, setTitle] = useState<string>(initialPostTitle)
  const initialContent: string =
    getPostFieldValue(post, 'content') ||
    getPostFieldValue(post, 'description') ||
    ''

  const { mutate: addPost, isLoading: addingPost } = useAddPost()
  const { mutate: updatePost, isLoading: updatingPost } = useUpdatePost()
  const { data: fullPost } = usePost({
    id: post?.id,
    useQueryOptions: {
      enabled: !isNew && !post?.postType,
    },
  })

  const confirmClose = useCallback(() => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Closing the composer will delete the post.',
    )

    if (confirmed) {
      onClose?.()
    }
  }, [onClose])

  const close = () => {
    const haveNewAttachment =
      attachments.map(({ id }) => id).join(',') !==
      initialPostAttachments.map(({ id }) => id).join(',')

    const haveNewTag =
      selectedTags.map(({ id }) => id).join(',') !==
      initialPostTags.map(({ id }) => id).join(',')

    const titleChanged = initialPostTitle.trim() !== title.trim()

    if (
      // Composer's content was changed
      editorRef.current?.isTouched() ||
      haveNewAttachment ||
      haveNewTag ||
      titleChanged
    ) {
      confirmClose()
    } else {
      onClose?.()
    }
  }

  const save = () => {
    const titleErrorMsg = title.trim() ? '' : "Title can't be empty"

    setTitleError(titleErrorMsg)

    // If the title input is empty, don't save
    if (titleErrorMsg) return

    const content = editorRef.current.getEditorHTML() || ''

    let postType = post?.postType || fullPost?.postType

    if (isNew) {
      postType =
        space?.authMemberProps?.availablePostTypes?.find(
          t => t.slug === DISCUSSION_POST_TYPE_SLUG,
        ) || space?.authMemberProps?.availablePostTypes?.[0]
    }

    const mappingFields = getMappingFields({
      content,
      title,
      postTypeName: postType.name,
    })

    const commonInput = {
      mappingFields,
      publish: true,
      attachmentIds: attachments.map(({ id }) => id),
      tagNames: selectedTags.map(({ title }) => title),
    }

    if (isNew) {
      addPost(
        {
          input: {
            ...commonInput,
            postTypeId: postType.id,
          },
          spaceId: space.id,
        },
        {
          onSuccess: data => {
            onClose()
            if (data.status === PostStatus.BLOCKED) {
              toast({
                title: 'Pending Review',
                description:
                  'Your post will be visible to others once it’s been reviewed by a moderator.',
                status: 'info',
              })
            }
          },
        },
      )
    } else {
      updatePost(
        {
          id: post.id,
          input: commonInput,
        },
        {
          onSuccess: data => {
            onClose()
            if (data.status === PostStatus.BLOCKED) {
              toast({
                title: 'Pending Review',
                description:
                  'Your post will be visible to others once it’s been reviewed by a moderator.',
                status: 'info',
              })
            }
          },
        },
      )
    }
  }

  return (
    <Modal
      open
      onClose={close}
      showZenModeBtn
      size="2xl"
      className="inline-flex flex-col sm:m-0 overflow-hidden"
    >
      <Modal.Header
        title={space?.name || post?.space?.name}
        className="w-full max-w-2xl mx-auto"
      />
      {/* This "id" attr is being used to cover an issue with the headless-ui modals
       ** Where clicking on a dropdown consider as clicking outside of the modal so we append the dropdown portals used in tiptap to this modal
       */}
      <Modal.Content
        id="tiptap-editor-wrapper"
        className="w-full max-w-2xl mx-auto flex overflow-hidden"
      >
        <ComposerModalContent
          title={title}
          setTitle={setTitle}
          titleError={titleError}
          content={initialContent}
          embeds={post?.embeds}
          mentions={post?.mentions.map(memberToMentionConverter)}
          tags={selectedTags}
          setTags={setSelectedTags}
          spaceId={space?.id || post?.spaceId}
          ref={editorRef}
          attachments={attachments}
          handleAttachmentDelete={handleAttachmentDelete}
          handleAttachmentSelect={handleAttachmentSelect}
        />
      </Modal.Content>
      <Modal.Footer className="text-right w-full max-w-2xl mx-auto">
        <Button
          size="lg"
          className="ml-auto text-white"
          loading={addingPost || updatingPost}
          onClick={save}
        >
          {isNew ? 'Publish' : 'Update'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
