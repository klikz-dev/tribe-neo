import { Editor } from '@tiptap/react'

export interface ComposerRefImperativeHandle {
  clear: () => void
  focus: () => void
  getEditorHTML: () => string | null
  getEditor: () => Editor
  isEmpty: () => boolean
  isTouched: () => boolean
}
