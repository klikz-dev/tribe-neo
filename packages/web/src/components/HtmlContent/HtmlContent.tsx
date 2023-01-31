/* eslint no-restricted-imports: 0 */

import { useCallback, useState } from 'react'

import loadable from '@loadable/component'
import Parser, { domToReact } from 'html-react-parser'
import { Link as RouterLink } from 'react-router-dom'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { Link } from '@tribeplatform/react-ui-kit/Link'

import { ComposerModuleName } from '../Composer/@types'
import { ComposerEmbed } from '../Composer/components/Embed'
import { MediaModal, Slide } from '../Composer/components/media/MediaModal'

const SyntaxHighlighter = loadable(() => import('react-syntax-highlighter'), {
  resolveComponent: m => m.Prism,
  ssr: false,
})

export const HtmlContent = ({ value, embeds, mentions }) => {
  let mediaIndex = -1
  // The first one is active by default.
  const [activeMediaIndex, setActiveMediaIndex] = useState(0)
  const slides: Slide[] = []
  const [mediaModalVisibility, setMediaModalVisibility] = useState(false)

  const handleModalVisibility = useCallback(e => {
    setActiveMediaIndex(Number(e?.currentTarget.dataset?.index))
    setMediaModalVisibility(true)
  }, [])
  const handleModalClose = useCallback(() => {
    setMediaModalVisibility(false)
  }, [])

  const options = {
    replace: _domNode => {
      const domNode = _domNode as any
      const tagName = (domNode as any).name as string
      let codeLanguage = 'text'

      switch (tagName) {
        case 'img':
          slides.push({ type: 'image', node: domNode })
          mediaIndex += 1
          return (
            <div
              className="-ml-6 -mr-6 flex items-center justify-center mt-5 bg-surface-100 ignore-typography"
              data-index={mediaIndex}
              onClick={handleModalVisibility}
            >
              <img
                src={domNode.attribs.src}
                className="cursor-pointer max-h-120"
                alt=""
              />
            </div>
          )

        case 'h1':
        case 'h2':
          return (
            <h2 className="text-xl">
              {domToReact(domNode?.children, options)}
            </h2>
          )

        case 'pre': {
          if (
            !domNode?.children?.length ||
            domNode?.children[0]?.name !== 'code' ||
            domNode?.children[0]?.children?.length !== 1 ||
            domNode?.children[0]?.children[0]?.type !== 'text'
          )
            return null

          if (domNode?.children[0]?.attribs?.class) {
            codeLanguage = domNode?.children[0]?.attribs?.class.replace(
              'language-',
              '',
            )
          }

          const content = domToReact(domNode?.children[0].children)

          return (
            <div className="code-wrapper -ml-6 -mr-6">
              <SyntaxHighlighter
                language={codeLanguage}
                style={atomDark}
                fallback={
                  <pre>
                    <code>{content}</code>
                  </pre>
                }
              >
                {content}
              </SyntaxHighlighter>
            </div>
          )
        }
        case 'h3':
          return (
            <h2 className="text-lg">
              {domToReact(domNode?.children, options)}
            </h2>
          )

        case 'ol':
          return (
            <ol className="list-decimal list-inside pl-6">
              {domToReact(domNode?.children, options)}
            </ol>
          )

        case 'ul':
          return (
            <ol className="list-disc list-inside pl-6">
              {domToReact(domNode?.children, options)}
            </ol>
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

            if (embed?.type === 'video')
              return (
                <div className="-ml-6 -mr-6">
                  <ComposerEmbed embed={embed} isReadOnly />
                </div>
              )

            return <ComposerEmbed embed={embed} isReadOnly />
          }
          break

        case 'a':
          if (domNode.attribs?.['data-type'] === ComposerModuleName.Mention) {
            const mentionId = domNode.attribs['data-id']
            const mentionFromDb = mentions?.find?.(
              mention => mention.id === mentionId,
            )

            return (
              <Link as={RouterLink} to={`/member/${mentionId}`}>
                {mentionFromDb?.name
                  ? `@${mentionFromDb.name}`
                  : domToReact(domNode?.children, options)}
              </Link>
            )
          }

          return (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={domNode?.attribs?.href}
            >
              {domToReact(domNode?.children, options)}
            </Link>
          )

        default:
          // If null is returned parser will render the html variant.
          return null
      }

      return null
    },
  }

  const Component = Parser(value, options)
  return (
    <>
      {Component}
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
}
