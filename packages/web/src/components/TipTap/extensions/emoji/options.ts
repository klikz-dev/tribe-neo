import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'

import { EmojiList } from './EmojiList'

export const renderEmojiPopup = () => {
  let reactRenderer
  let popup

  return {
    onStart: props => {
      reactRenderer = new ReactRenderer(EmojiList, {
        props,
        editor: props.editor,
      })

      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () =>
          document.getElementById('tiptap-editor-wrapper') || document.body,
        content: reactRenderer.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      })
    },

    onUpdate(props) {
      reactRenderer.updateProps(props)

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      })
    },

    onKeyDown(props) {
      if (props.event.key === 'Escape') {
        popup[0].hide()
        props.event.stopPropagation()

        return true
      }

      return reactRenderer.ref?.onKeyDown(props)
    },

    onExit() {
      popup[0].destroy()
      reactRenderer.destroy()
    },
  }
}
