import { Ref, useEffect, useImperativeHandle, useRef } from 'react'

import { Editor } from '@tiptap/react'

import { ComposerRefImperativeHandle } from '../@types'

export const useTiptapImperativeHandle = ({
  forwardedRef,
  editor,
}: {
  editor: Editor
  forwardedRef: Ref<unknown>
}) => {
  const isTouched = useRef<boolean>(false)

  useEffect(() => {
    const onUpdate = () => {
      isTouched.current = true
    }
    if (editor) {
      editor.on('update', onUpdate)

      return () => {
        editor.off('update', onUpdate)
      }
    }
  }, [editor])

  useImperativeHandle(
    forwardedRef,
    (): ComposerRefImperativeHandle => {
      return {
        clear: () => {
          editor.commands.clearContent()
        },
        isEmpty: (): boolean => {
          return editor.isEmpty
        },
        getEditor: (): Editor => editor,
        focus: () => {
          editor.commands.focus()
        },
        getEditorHTML: () => {
          return editor.getHTML()
        },
        isTouched: () => {
          return isTouched.current
        },
      }
    },
    [editor, isTouched],
  )
}
