import { FC, useCallback, useRef } from 'react'

import EmotionLineIcon from 'remixicon-react/EmotionLineIcon'

import { QuillType } from '../../@types'
import { useStateCallback } from '../../hooks/useStateCallback'
import { EmojiPicker } from '../EmojiPicker'
import { ComposerIconButton } from './ComposerIconButton'

interface EmojiPickerButtonProps {
  quill: QuillType
}

export const EmojiPickerButton: FC<EmojiPickerButtonProps> = ({ quill }) => {
  const containerRef = useRef(null)
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useStateCallback(false)

  const showEmojiPicker = useCallback(() => {
    if (!quill.hasFocus()) quill.focus()

    setIsEmojiPickerOpen(true)
  }, [])

  return (
    <div className="relative hidden lg:block" ref={containerRef}>
      <ComposerIconButton
        onClick={showEmojiPicker}
        icon={EmotionLineIcon}
        aria-label="Emoji"
      />
      {isEmojiPickerOpen && (
        <EmojiPicker quill={quill} hide={() => setIsEmojiPickerOpen(false)} />
      )}
    </div>
  )
}
