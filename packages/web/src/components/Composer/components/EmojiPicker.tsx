import 'emoji-mart-virtualized/css/emoji-mart.css'
import '../styles/emoji-picker.css'

import { useCallback, useRef } from 'react'

import { BaseEmoji, Picker } from 'emoji-mart-virtualized'

import { Portal } from '@tribeplatform/react-ui-kit/Portal'

import { EmojiPickerProps } from '../@types'
import { getCursorPosition } from '../utils'
import { useOnClickOutside } from '../utils/useOnClickOutside'

const staticProps = {
  offsetTop: 10,
  offsetLeft: 10,
}

export const EmojiPicker = ({ quill, hide }: EmojiPickerProps) => {
  const emojiPickerRef = useRef(null)

  const onSelectEmoji = useCallback(
    (emoji: BaseEmoji) => {
      const cursorPosition = quill.getSelection(true)?.index || 0

      quill.insertText(cursorPosition, emoji.native)

      hide()
    },
    [hide, quill],
  )

  useOnClickOutside(emojiPickerRef, hide)

  const { left, top } = getCursorPosition(quill, true)

  return (
    <Portal>
      <div
        className="absolute"
        ref={emojiPickerRef}
        style={{
          left: left + staticProps.offsetLeft,
          top: top + staticProps.offsetTop,
        }}
      >
        <Picker
          onSelect={onSelectEmoji}
          showSkinTones={false}
          showPreview={false}
          autoFocus
          native
        />
      </div>
    </Portal>
  )
}
