import {
  forwardRef,
  MutableRefObject,
  useImperativeHandle,
  useRef,
} from 'react'

import PaperAirplaneIcon from '@heroicons/react/outline/PaperAirplaneIcon'
import clsx from 'clsx'
import { Prompt } from 'react-router'

import { Post } from '@tribeplatform/gql-client/types'
import { Button } from '@tribeplatform/react-ui-kit/Button'

import { memberToMentionConverter } from '../../lib/composer.utils'
import { getPostFieldValue } from '../../utils/post'
import {
  ComposerRefImperativeHandle,
  ReactQuillProps,
} from '../Composer/@types'
import { Attachments } from '../Composer/components/Attachment/Attachments'
import { AttachmentsButtonProps } from '../Composer/components/ComposerControls/AttachmentsButton'
import { Tiptap } from '../TipTap/TipTap'

export type ReplyEditorProps = {
  onReply: (
    content: string,
    editorRef: MutableRefObject<ComposerRefImperativeHandle>,
  ) => void
  onCancel: (editorRef: MutableRefObject<ComposerRefImperativeHandle>) => void
  reply?: Post
  isLoading?: boolean
} & Pick<ReactQuillProps, 'attachments' | 'onAttachmentDelete'> &
  Pick<AttachmentsButtonProps, 'onAttachmentSelect'>

export const ReplyEditor = forwardRef<
  {
    focus: () => void
  },
  ReplyEditorProps
>(
  (
    {
      onReply,
      onCancel,
      reply,
      attachments,
      onAttachmentDelete,
      onAttachmentSelect,
      isLoading,
    },
    ref,
  ) => {
    const isNew = !reply

    const editorRef = useRef<ComposerRefImperativeHandle>(null)
    const content =
      getPostFieldValue(reply, 'content') ||
      getPostFieldValue(reply, 'answer') ||
      ''

    useImperativeHandle(ref, () => ({
      focus: () => {
        editorRef.current?.focus()
      },
    }))

    return (
      <div
        style={{ minHeight: '160px' }} // min-h-40 not working?!
        className={clsx(
          'relative shadow-sm border rounded-md p-2 border-neutral-300 overflow-y-auto flex flex-col',
          { 'my-2': !isNew },
        )}
      >
        <Tiptap
          content={content}
          embeds={reply?.embeds}
          mentions={reply?.mentions?.map(memberToMentionConverter)}
          ref={editorRef}
          onAttachmentSelect={onAttachmentSelect}
          controls={
            <>
              {typeof onCancel === 'function' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCancel(editorRef)}
                  className="ml-auto mr-2"
                >
                  Cancel
                </Button>
              )}
              <Button
                loading={isLoading}
                size="sm"
                variant="primary"
                onClick={() =>
                  onReply(editorRef.current.getEditorHTML(), editorRef)
                }
              >
                <span className="transform rotate-90">
                  <PaperAirplaneIcon className="w-4 h-4" />
                </span>
              </Button>
            </>
          }
        >
          {!!attachments?.length && (
            <div className="pb-5">
              <Attachments
                attachments={attachments}
                onAttachmentDelete={onAttachmentDelete}
              />
            </div>
          )}
          <Prompt
            when={editorRef?.current?.isTouched()}
            message={() => 'Changes you made may not be saved.'}
          />
        </Tiptap>
      </div>
    )
  },
)
