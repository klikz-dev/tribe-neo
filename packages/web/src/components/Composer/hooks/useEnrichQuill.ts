import {
  MutableRefObject,
  RefObject,
  useCallback,
  useImperativeHandle,
} from 'react'

import {
  ComposerRefImperativeHandle,
  ComposerModuleName,
  QuillType,
  AttachmentsProps,
} from '../@types'
import { eliminateUnnecessaryHTML } from '../helpers'
import { embedSanitizer } from '../modules/quill-embed/blots/sanitizer'
import { imageSanitizer } from '../modules/quill-image/blots/sanitizer'
import { mentionSanitizer } from '../modules/quill-mention/blots/sanitizer'

interface UseEnrichQuill {
  quillRef: MutableRefObject<QuillType>
  forwardedRef: RefObject<ComposerRefImperativeHandle>
  initialHTMLRef: MutableRefObject<string>
  onAttachmentDelete: AttachmentsProps['onAttachmentDelete']
}

/**
 * Adds more functionality to Quill's ref.
 * @param quillRef - Original quill object
 * @param forwardedRef - Forwarded ref from parent components (E.g: <Space />)
 * @param initialHTMLRef - Initial rendered html content (not input value but resulted)
 * @param onAttachmentDelete - Initial rendered html content (not input value but resulted)
 */
export const useEnrichQuill = ({
  quillRef,
  forwardedRef,
  initialHTMLRef,
  onAttachmentDelete,
}: UseEnrichQuill) => {
  const sanitizeContent = useCallback(() => {
    try {
      const editor = quillRef.current?.root
      const ops = quillRef.current?.getContents()?.ops
      const sanitizer = {
        [ComposerModuleName.Image]: false,
        [ComposerModuleName.Embed]: false,
        [ComposerModuleName.Mention]: false,
      }
      ops.forEach(op => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (op?.insert?.image) {
          sanitizer.image = true
        }
        if (op?.insert?.[ComposerModuleName.Embed]) {
          sanitizer[ComposerModuleName.Embed] = true
        }
        if (op?.insert?.[ComposerModuleName.Mention]) {
          sanitizer[ComposerModuleName.Mention] = true
        }
      })

      if (sanitizer.image) {
        imageSanitizer(editor)
      }

      if (sanitizer[ComposerModuleName.Embed]) {
        embedSanitizer(editor)
      }

      if (sanitizer[ComposerModuleName.Mention]) {
        mentionSanitizer(editor)
      }
    } catch (e) {
      console.log(e)
    }
  }, [quillRef])

  useImperativeHandle(
    forwardedRef,
    (): ComposerRefImperativeHandle => {
      return {
        clear: () => {
          if (quillRef.current) {
            quillRef.current.setText('')
          }
          if (onAttachmentDelete) {
            onAttachmentDelete(null)
          }
        },
        isEmpty: (): boolean => {
          try {
            return (
              JSON.stringify(quillRef.current.getContents()) ===
              '{"ops":[{"insert":"\\n"}]}'
            )
          } catch (e) {
            return false
          }
        },
        getQuill: (): QuillType => quillRef.current,
        focus: () => {
          quillRef.current?.focus()
        },
        getEditorHTML: () => {
          try {
            sanitizeContent()
            return quillRef.current?.root.innerHTML
          } catch (e) {
            console.log(e)
          }
        },
        isTouched: () => {
          // Quill content's actual HTML
          let currentHTML = quillRef.current?.root.innerHTML.trim()

          if (typeof currentHTML !== 'string') return false

          currentHTML = eliminateUnnecessaryHTML(currentHTML)

          const initialHTML = eliminateUnnecessaryHTML(initialHTMLRef.current)

          return initialHTML !== currentHTML
        },
      }
    },
    [initialHTMLRef, quillRef, sanitizeContent, onAttachmentDelete],
  )
}
