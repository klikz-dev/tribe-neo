import { forwardRef } from 'react'

import loadable from '@loadable/component'
import { Prompt } from 'react-router'

import { Post } from '@tribeplatform/gql-client/types'

import { Attachment, ReactQuillProps } from '../Composer/@types'
import { Attachments } from '../Composer/components/Attachment/Attachments'
import { ErrorBoundary } from '../Error/ErrorBoundry'
import { ComposerRefImperativeHandle } from '../TipTap/@types'
import { SelectableTag, SpaceTagsSelector } from './SpaceTagsSelector'

export const Tiptap = loadable(() => import('../TipTap/TipTap'), {
  resolveComponent: module => module.Tiptap,
  ssr: false,
})

export const ComposerControls = loadable(
  () => import('../Composer/components/ComposerControls/ComposerControls'),
  {
    resolveComponent: module => module.ComposerControls,
    ssr: false,
  },
)

export type ComposerModalContentProps = Pick<Post, 'embeds'> &
  Pick<ReactQuillProps, 'mentions'> & {
    spaceId: string
    title: string
    titleError: string
    setTitle: (title: string) => void
    content: string
    tags: SelectableTag[]
    setTags: (tags: SelectableTag[]) => void
    attachments: Attachment[]
    handleAttachmentSelect: (files: File[]) => void
    handleAttachmentDelete: (attachment: Attachment) => void
  }

export const ComposerModalContent = forwardRef<
  ComposerRefImperativeHandle,
  ComposerModalContentProps
>(
  (
    {
      spaceId,
      title,
      setTitle,
      titleError,
      tags,
      setTags,
      content,
      embeds,
      mentions,
      attachments,
      handleAttachmentSelect,
      handleAttachmentDelete,
    },
    editorRef,
  ) => {
    return (
      <div className="flex flex-col overflow-hidden w-full">
        {titleError && <p className="text-danger-600">{titleError}</p>}
        <input
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="Title"
          className="block text-2xl w-full mt-2 py-2 bg-transparent appearance-none focus:outline-none text-basicSurface-500 placeholder-basicSurface-300"
        />
        <ErrorBoundary>
          <div
            // This hack is here because headless modal controls the keypress and steals the focus out of the editor
            onKeyDown={e => {
              const el = document.getElementById('tiptap-editor-wrapper')
              if (
                e.key === 'Tab' &&
                e.target instanceof Node &&
                el?.contains(e.target)
              ) {
                e.preventDefault()
                e.stopPropagation()
              }
            }}
            style={{ minHeight: '160px' }} // min-h-40 not working?!
            className="relative my-4 overflow-y-auto flex flex-col flex-grow"
          >
            <Tiptap
              content={content}
              embeds={embeds}
              mentions={mentions}
              ref={editorRef}
              onAttachmentSelect={handleAttachmentSelect}
            >
              {!!attachments?.length && (
                <div className="pb-5">
                  <Attachments
                    attachments={attachments}
                    onAttachmentDelete={handleAttachmentDelete}
                  />
                </div>
              )}
            </Tiptap>
            <Prompt
              when={editorRef?.current?.isTouched()}
              message={() => 'Changes you made may not be saved.'}
            />
          </div>
        </ErrorBoundary>

        <SpaceTagsSelector
          className="relative"
          spaceId={spaceId}
          tags={tags}
          setTags={setTags}
        />
      </div>
    )
  },
)
