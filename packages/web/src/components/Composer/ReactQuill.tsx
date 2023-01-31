/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useEffect,
  useRef,
  RefObject,
  forwardRef,
  ReactElement,
  useCallback,
} from 'react'

import clsx from 'clsx'
import { Element } from 'domhandler'
import Parser from 'html-react-parser'
import { nanoid } from 'nanoid'
import Quill from 'quill'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { FileDrop } from 'react-file-drop'

import './styles/quill.css'

import {
  ComposerRefImperativeHandle,
  ComposerModuleName,
  ReactQuillProps,
  QuillType,
} from './@types'
import { ComposerEmbed } from './components/Embed'
import { ComposerImage } from './components/Image'
import { ComposerMention } from './components/Mention'
import { EMBED_INPUT_CLASS } from './constants'
import { checkNavigationAllowance, getDOMContent } from './helpers'
import { useComposerFile } from './hooks/useComposerFile'
import { useEnrichQuill } from './hooks/useEnrichQuill'
import { usePreventNavigation } from './hooks/usePreventNavigation'
import { getQuillModules } from './modules/get-quill-modules'
import { EmbedCreateEvent } from './modules/quill-embed/blots/embed'
import { initQuill } from './utils'

export const ReactQuill = forwardRef(
  (
    {
      className,
      embeds,
      mentions,
      onChange,
      placeholder,
      value,
      modules = {},
      handleAttachmentUpload,
      onAttachmentDelete,
    }: ReactQuillProps,
    forwardedRef: RefObject<ComposerRefImperativeHandle>,
  ): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null)
    const quillRef = useRef<QuillType>()
    const initialHTMLRef = useRef('')

    const upload = useComposerFile({
      handleAttachmentUpload,
      handleImageUpload: modules.image?.handleImageUpload,
    })

    useEnrichQuill({
      quillRef,
      forwardedRef,
      initialHTMLRef,
      onAttachmentDelete,
    })

    usePreventNavigation(() => !!forwardedRef.current?.isTouched())

    const handleComposerDrop = useCallback(
      (files: FileList): void => {
        // If not image, do nothing
        if (!files?.length || !files[0].type?.startsWith('image')) return null

        upload(files, quillRef.current)
      },
      [upload],
    )

    useEffect(() => {
      initQuill()

      const quillElementId = `composer-element-${nanoid(10)}`
      if (divRef.current) divRef.current.id = quillElementId

      const {
        embed: embedModule,
        image,
        mention,
        slashMenu,
        ...customModules
      } = modules

      const quill = new Quill(`#${quillElementId}`, {
        placeholder,
        readOnly: false,
        theme: 'bubble',
        bounds: `#${quillElementId}`,
        modules: getQuillModules(customModules),
      })

      quillRef.current = quill

      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const tooltipTextbox = quill?.theme?.tooltip?.textbox
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const tooltipRoot = quill?.theme?.tooltip?.root
        if (tooltipTextbox) {
          // Quill changes it everytime this input is visible.
          const desiredPlaceholder = 'https://example.com'
          tooltipTextbox.addEventListener('mouseenter', () => {
            const placeholder = tooltipTextbox.getAttribute('placeholder')
            if (placeholder !== desiredPlaceholder) {
              tooltipTextbox.setAttribute('placeholder', desiredPlaceholder)
            }
          })
        }

        if (tooltipRoot) {
          tooltipRoot.addEventListener('click', e => {
            e.stopPropagation()
          })
        }
      } catch (e) {
        console.log(e)
      }

      if (value) {
        const PostContent = Parser(value, {
          replace: _domNode => {
            const domNode = _domNode as Element

            if (domNode.type === 'tag' && domNode.name === 'img') {
              return (
                <ComposerImage
                  src={domNode.attribs.src}
                  imageProps={domNode.attribs}
                  isReadOnly={false}
                />
              )
            }

            if (
              domNode.type === 'tag' &&
              domNode.attribs?.['data-type'] === ComposerModuleName.Embed
            ) {
              if (!embeds) return null
              // Fetch the corresponding embed id
              const embedId = domNode.attribs['data-id']
              const embed = embeds.find(embed => embed.id === embedId)

              if (!embed) return null

              return (
                <ComposerEmbed quill={quill} embed={embed} isReadOnly={false} />
              )
            }

            if (domNode?.attribs?.href && domNode?.attribs?.rel) {
              return getDOMContent(domNode)
            }

            if (domNode.attribs?.['data-type'] === ComposerModuleName.Mention) {
              const tag = domNode?.children?.find(
                node => node.type === 'tag',
              ) as Element

              if (!tag) return null

              const mentionId = domNode.attribs['data-id']

              const mentionFromDb = mentions?.find?.(
                mention => mention.id === mentionId,
              )

              const children = tag.children as [Text, Element]

              return (
                <ComposerMention
                  id={mentionFromDb?.id || mentionId}
                  title={
                    mentionFromDb?.title
                      ? `@${mentionFromDb.title}`
                      : children[0]?.data
                  }
                />
              )
            }
          },
        }) as ReactElement

        // Using ReactDOMServer instead of ReactDOM because ReactDOM render
        // is asynchronous and can be safely used on the browser as well.
        initialHTMLRef.current =
          ReactDOMServer.renderToStaticMarkup(PostContent)

        quill.root.innerHTML = initialHTMLRef.current

        // Need to hydrate for event listeners added by our custom components in the future.
        ReactDOM.hydrate(PostContent, quill.root)

        // `getFormat` forces Quill to render the actual
        // content (inner html changes after mentions or stuff like get applied)
        try {
          quill.getFormat()
          // eslint-disable-next-line no-empty
        } catch (e) {}

        // Store the actual HTML content for later
        // comparison (detecting touched state)
        initialHTMLRef.current = quill.root.innerHTML
      }

      const handleEmbedConvert = async value => {
        try {
          const embed = await embedModule.onEmbed(value)

          const range = quill.getSelection()

          // If nothing to embed
          if (!embed?.html) {
            return
          }

          const startOfTheLink = range.index - value.length

          // When the URL is embeddable remove the link itself
          quill.deleteText(startOfTheLink, value.length)

          // And keep the embed below
          quill.insertEmbed(startOfTheLink, 'embed', {
            quill,
            embed,
          })
        } catch (error) {
          console.log('Error while embedding url', error.message)
        }
      }

      const handleEmbedCreate = e => {
        const index = quill?.getSelection()?.index
        const { url } = e.detail
        const isSourceEmbedInput =
          Array.from(document.activeElement.classList).indexOf(
            EMBED_INPUT_CLASS,
          ) !== -1

        // Insert only if embeds weren't created using an embed input field(Direct paste)
        if (!isSourceEmbedInput) {
          quill.insertText(index, url, {
            link: url,
          })
          handleEmbedConvert(url)
        }
      }

      const handleTextChange = () => {
        if (typeof onChange === 'function') {
          onChange(quill.root.innerHTML)
        }
      }

      const handleKeyUp = event => {
        const isBackspaceOrDelete = ['Backspace', 'Delete'].includes(event.key)

        if (isBackspaceOrDelete) {
          const { index } = quill.getSelection(true)
          const { ops } = quill.getContents(index)

          const isCodeBlock = ops?.[0]?.attributes?.['code-block']

          if (isCodeBlock) {
            const line = quill.getLine(index)

            // Get code block's contents, the actual code text
            const codeContent = line[0].domNode?.innerText

            // If it's an empty code block
            if (codeContent === '\n') {
              // Delete the code block
              quill.removeFormat(index, 0)
            }
          }
        }
      }

      quill.root.addEventListener(EmbedCreateEvent, handleEmbedCreate)
      quill.root.addEventListener('keyup', handleKeyUp)

      quill.on('text-change', handleTextChange)

      // Listen to clicks to prevent leaving the page if necessary
      const bodyClickCallback = checkNavigationAllowance(forwardedRef)

      document.body.addEventListener('click', bodyClickCallback)

      return () => {
        quill.off('text-change', handleTextChange)

        document.body.removeEventListener('click', bodyClickCallback)

        quill.root.removeEventListener(EmbedCreateEvent, handleEmbedCreate)
        quill.root.removeEventListener('keyup', handleKeyUp)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <FileDrop
        className="quill-file-drop-container flex flex-col flex-grow"
        targetClassName="flex flex-col flex-grow"
        onDrop={handleComposerDrop}
      >
        <div className={clsx(className, 'ignore-typography')} ref={divRef} />
      </FileDrop>
    )
  },
)
