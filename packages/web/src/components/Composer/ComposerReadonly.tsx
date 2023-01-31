import { useRef, useEffect, useState, useCallback, memo } from 'react'

import Parser from 'html-react-parser'
import ReactDOMServer from 'react-dom/server'

import { ComposerModuleName, ReactQuillProps } from './@types'
import { ComposerEmbed } from './components/Embed'
import { ComposerImage } from './components/Image'
import { MediaModal, Slide } from './components/media/MediaModal'
import { ComposerMention } from './components/Mention'
import { MentionBlotClassName, tagClassName } from './constants'
import { getDOMContent, eliminateUnnecessaryHTML } from './helpers'

export const ComposerReadonly = memo(
  ({
    value,
    embeds,
    mentions,
    onMentionClick,
  }: Pick<
    ReactQuillProps,
    'mentions' | 'embeds' | 'onMentionClick' | 'value'
  >) => {
    let mediaIndex = -1
    // The first one is active by default.
    const [activeMediaIndex, setActiveMediaIndex] = useState(0)
    const slides: Slide[] = []
    const divRef = useRef<HTMLDivElement>(null)
    const [mediaModalVisibility, setMediaModalVisibility] = useState(false)

    const handleModalVisibility = useCallback(e => {
      setActiveMediaIndex(Number(e?.currentTarget.dataset?.index))
      setMediaModalVisibility(true)
    }, [])
    const handleModalClose = useCallback(() => {
      setMediaModalVisibility(false)
    }, [])

    const inputHTML = eliminateUnnecessaryHTML(value)

    const PostComponent = Parser(inputHTML, {
      replace: _domNode => {
        const domNode = _domNode as any
        const TagName = (domNode as any).name as string

        switch (TagName) {
          case 'img':
            slides.push({ type: 'image', node: domNode })
            mediaIndex += 1

            return (
              <div
                className="media-wrapper"
                data-index={mediaIndex}
                onClick={handleModalVisibility}
              >
                <ComposerImage
                  src={domNode.attribs.src}
                  imageProps={domNode.attribs}
                  isReadOnly
                />
              </div>
            )

          case 'h2':
          case 'h3':
          case 'ul':
          case 'ol':
            return (
              <TagName className={tagClassName[TagName]}>
                {getDOMContent(domNode)}
              </TagName>
            )

          case 'div':
            if (
              domNode.type === 'tag' &&
              domNode.attribs?.['data-type'] === ComposerModuleName.Embed
            ) {
              if (!embeds) {
                return null
              }
              // Fetch the corresponding embed id
              const embedId = domNode.attribs['data-id']
              const embed = embeds.find(embed => embed.id === embedId)
              mediaIndex += 1

              return <ComposerEmbed embed={embed} isReadOnly />
            }
            break
          case 'a':
            if (domNode?.attribs?.href && domNode?.attribs?.rel) {
              return getDOMContent(domNode)
            }

            if (domNode.attribs?.['data-type'] === ComposerModuleName.Mention) {
              const tag = domNode.children?.find(node => node.type === 'tag')

              if (!tag) return null

              const mentionId = domNode.attribs['data-id']
              const mentionFromDb = mentions?.find?.(
                mention => mention.id === mentionId,
              )

              return (
                <ComposerMention
                  id={mentionFromDb?.id || mentionId}
                  title={
                    mentionFromDb?.title
                      ? `@${mentionFromDb.title}`
                      : tag.children[0]?.data
                  }
                />
              )
            }
            break

          default:
            // If null is returned parser will render the html variant.
            return null
        }
      },
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const html = ReactDOMServer.renderToString(PostComponent)

    const ComposerProps = {
      ref: divRef,
      className: 'composer',
      dangerouslySetInnerHTML: { __html: html },
    }

    useEffect(() => {
      const mediaWrapper = divRef.current?.querySelectorAll('.media-wrapper')
      if (!mediaWrapper) return
      mediaWrapper.forEach(wrapper => {
        wrapper.addEventListener('click', e => {
          setActiveMediaIndex(
            Number((e?.currentTarget as HTMLElement)?.dataset?.index),
          )
          setMediaModalVisibility(true)
        })
      })
    }, [inputHTML])

    useEffect(() => {
      const mentionNodes = divRef.current?.querySelectorAll(
        `[data-type="${ComposerModuleName.Mention}"].${MentionBlotClassName}`,
      )
      if (!mentionNodes) return
      const handleMentionClick = e => {
        if (typeof onMentionClick !== 'function') return

        const id = e?.currentTarget.dataset?.id

        const mention = mentions.find(mentionObj => mentionObj.id === id)

        if (mention) {
          onMentionClick(mention)
        }
      }

      mentionNodes.forEach(mention => {
        mention.addEventListener('click', handleMentionClick)
      })

      return () => {
        if (!mentionNodes) return

        mentionNodes.forEach(mention => {
          mention.removeEventListener('click', handleMentionClick)
        })
      }
    }, [inputHTML, mentions, onMentionClick])

    return (
      <>
        <div color="label.primary" {...ComposerProps} />
        {slides?.length > 0 && (
          <MediaModal
            slides={slides}
            isVisible={mediaModalVisibility}
            handleModalClose={handleModalClose}
            activeMediaIndex={activeMediaIndex}
          />
        )}
      </>
    )
  },
)
// eslint-disable-next-line import/no-default-export
export default ComposerReadonly
