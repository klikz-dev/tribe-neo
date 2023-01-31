import { forwardRef, ReactNode, useCallback, useRef, useState } from 'react'

import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { Editor, EditorContent, Range, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FileDrop } from 'react-file-drop'

import {
  Embed,
  Member,
  SearchEntityType,
  UploadImagesArgs,
} from '@tribeplatform/gql-client/types'
import {
  useCreateImages,
  useEmbed,
  useSearch,
} from '@tribeplatform/react-sdk/hooks'

import { ComposerRefImperativeHandle } from './@types'
import {
  AttachmentPickerButton,
  AttachmentPickerButtonRef,
} from './components/AttachmentPickerButton'
import { EmbedFormDialog } from './components/EmbedFormDialog'
import { EmojiPickerButton } from './components/EmojiPickerButton'
import {
  ImagePickerButton,
  ImagePickerRef,
} from './components/ImagePickerButton'
import { LinkFormDialog } from './components/LinkFormDialog'
import { SlashMenuButton } from './components/SlashMenuButton'
import { CustomBubbleMenu } from './extensions/bubble-menu'
import { Embed as EmbedExtension } from './extensions/embed'
import { Emoji } from './extensions/emoji'
import { CustomHeading } from './extensions/heading'
import { AsyncImage } from './extensions/image'
import { CustomLink } from './extensions/link'
import { Mention } from './extensions/mention'
import { mention } from './extensions/mention/options'
import { SlashMenu } from './extensions/slash-menu'
import { slashMenuCommand } from './extensions/slash-menu/click-handler'
import { MenuItem, MenuTypes } from './extensions/slash-menu/items'
import { useTiptapImperativeHandle } from './hooks/useTiptapImperativeHandle'

import './style.css'

type TiptapProps = {
  content: string
  mentions: Partial<Member>[]
  embeds: Embed[]
  controls?: ReactNode
  onAttachmentSelect?: (files: File[]) => void
}

export const Tiptap = forwardRef<ComposerRefImperativeHandle, TiptapProps>(
  (props, ref) => {
    const [linkFormOpen, setLinkFormOpen] = useState(false)
    const [embedFormOpen, setEmbedFormOpen] = useState(false)
    const [embedItem, setEmbedItem] = useState<MenuItem | undefined>()
    const { content, embeds, mentions, onAttachmentSelect, children } = props
    const imageControlRef = useRef<ImagePickerRef>()
    const attachmentControlRef = useRef<AttachmentPickerButtonRef>()
    const { asyncQuery: embed } = useEmbed()
    const { asyncQuery: search } = useSearch({ fields: 'all' })

    const onSlashMenuClick = ({
      editor,
      props,
      range,
    }: {
      editor: Editor
      props: MenuItem
      range?: Range
    }) => {
      let _range = range
      if (!_range) {
        _range = {
          from: editor.view.state.selection.from,
          to: editor.view.state.selection.to,
        }
      }
      slashMenuCommand({ props, editor, range: _range })

      switch (props.type) {
        case MenuTypes.Embed:
          setEmbedFormOpen(true)
          setEmbedItem(props)
          break
        case MenuTypes.Link:
          setLinkFormOpen(true)
          break
        case MenuTypes.Attachment:
          attachmentControlRef.current.open()
          break
        case MenuTypes.Image:
          imageControlRef.current.toggle()
          break
        default:
      }
    }

    const editor = useEditor({
      content,
      extensions: [
        StarterKit.configure({
          heading: false,
        }),
        CustomHeading.configure({
          levels: [2, 3],
        }),
        Underline,
        EmbedExtension.configure({
          embeds,
        }),
        AsyncImage,
        Placeholder.configure({
          placeholder: `What are your thoughts? (Type ' / ' to add images, files, or links)`,
        }),
        Mention.configure({
          HTMLAttributes: {
            class: 'text-actionPrimary-600 hover:text-actionPrimary-500',
          },
          mentions,
          suggestion: mention({
            search: async ({ query }) => {
              if (!query) return []
              const result = await search({
                input: {
                  query,
                },
              })

              const members = result?.hits.find(
                hit => hit.entityType === SearchEntityType.MEMBER,
              )

              return members?.hits?.map(m => ({
                id: m.entityId,
                title: m.title,
                icon: (m?.media as any)?.url,
              }))
            },
          }),
        }),
        CustomLink.configure({
          openOnClick: false,
          onPaste: async (m, editor) => {
            const { anchor } = editor.state.selection
            const href = m?.[0]?.data?.href
            const oembed = await embed({ url: href })

            if (oembed.html) {
              editor
                .chain()
                .setNodeSelection(anchor)
                .setEmbed({ embed: oembed })
                .run()
            }
          },
          HTMLAttributes: {
            class: 'text-actionPrimary-600 hover:text-actionPrimary-500',
          },
        }),
        Emoji,
        SlashMenu.configure({
          command: onSlashMenuClick,
        }),
      ],
    })

    const { mutateAsync: createImages } = useCreateImages()

    const handleImageUpload = useCallback(
      async (file: File) => {
        const args: UploadImagesArgs[] = [{ file }]

        const uploadedImage = await createImages(args)

        return uploadedImage.map(ui => ({
          ...ui,
          mediaId: ui.id,
          mediaUrl: ui.url,
        }))
      },
      [createImages],
    )

    const upload = useCallback(
      async (file: File) => {
        const resolveFileUrl = new Promise<{ url: string }>(resolve => {
          const fr = new FileReader()
          fr.onload = () => {
            resolve({ url: fr.result as string })
          }
          fr.readAsDataURL(file)
        })
        const fileSrc = await resolveFileUrl
        editor
          .chain()
          .focus()
          .setImage({ src: fileSrc.url, loading: true })
          .run()

        const position = {
          from: editor.state.selection.from,
          to: editor.state.selection.to,
        }

        const result = await handleImageUpload(file)
        const { mediaUrl, mediaId } = result[0]

        // before updating the src let's preload the url.
        const img = new Image()
        img.src = mediaUrl

        img.onload = () => {
          editor
            .chain()
            .setNodeSelection(position.from)
            .focus()
            .setImageAttributes({ loading: false, src: mediaUrl, id: mediaId })
            .run()
        }
      },
      [editor, handleImageUpload],
    )

    const handleComposerDrop = useCallback(
      (filesList: FileList): void => {
        // If not image, do nothing
        if (!filesList?.length) return null

        const files = Array.from(filesList)
        files.forEach(async file => {
          if (file.type?.startsWith('image')) {
            await upload(file)
          } else {
            onAttachmentSelect([file])
          }
        })
      },
      [upload, onAttachmentSelect],
    )

    useTiptapImperativeHandle({
      forwardedRef: ref,
      editor,
    })

    const onEditorClick = useCallback(() => {
      if (editor.isEmpty && !editor.isFocused) {
        editor.commands.focus()
      }
    }, [editor])

    return (
      <>
        <div className="h-full relative flex-col flex flex-1">
          {editor && <CustomBubbleMenu editor={editor} />}
          <FileDrop
            className="flex flex-col flex-grow"
            targetClassName="flex flex-col flex-grow"
            onDrop={handleComposerDrop}
          >
            <article className="flex flex-col flex-grow">
              <EditorContent
                editor={editor}
                onClick={onEditorClick}
                className="text-md text-basicSurface-700 relative flex-1 mb-4"
              />
            </article>
          </FileDrop>
          {children}
          {editor && (
            <div className="sticky bottom-0 mt-2 justify-between flex items-center">
              <div className="flex space-x-2 items-center">
                <SlashMenuButton
                  onItemClick={props => {
                    setTimeout(() => {
                      onSlashMenuClick({ editor, props })
                    }, 100)
                  }}
                />
                <div className="hidden sm:flex space-x-2 items-center">
                  <EmojiPickerButton editor={editor} />
                  <ImagePickerButton ref={imageControlRef} upload={upload} />
                  <AttachmentPickerButton
                    ref={attachmentControlRef}
                    onAttachmentSelect={onAttachmentSelect}
                  />
                </div>
              </div>
              {props.controls}
            </div>
          )}
        </div>
        <LinkFormDialog
          onSubmit={data => {
            const { link, text } = data
            if (link) {
              editor
                .chain()
                .focus()
                .insertLink({ href: link, text })
                .insertContent(' ')
                .run()
            }
            setLinkFormOpen(false)
          }}
          open={linkFormOpen}
          onClose={() => setLinkFormOpen(false)}
        />
        <EmbedFormDialog
          embedItem={embedItem}
          onSubmit={async (data, methods) => {
            try {
              const { link } = data
              if (link) {
                const oembed = await embed({ url: link })
                if (oembed.html) {
                  editor.chain().focus().setEmbed({ embed: oembed }).run()
                }
              }
              setEmbedFormOpen(false)
            } catch (e) {
              methods?.setError('link', {
                type: 'validate',
                message: 'Cannot embed this link',
              })
            }
          }}
          open={embedFormOpen}
          onClose={() => setEmbedFormOpen(false)}
        />
      </>
    )
  },
)

Tiptap.displayName = 'Tiptap'
