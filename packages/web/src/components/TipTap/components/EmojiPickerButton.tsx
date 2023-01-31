import { FC, useCallback, useState } from 'react'

import { Editor } from '@tiptap/react'
import { BaseEmoji, Picker } from 'emoji-mart-virtualized'
import { usePopper } from 'react-popper'
import EmotionLineIcon from 'remixicon-react/EmotionLineIcon'

import { Portal } from '@tribeplatform/react-ui-kit/Portal'

import { ComposerIconButton } from '../../Composer/components/ComposerControls/ComposerIconButton'
import { useOnClickOutside } from '../../Composer/utils/useOnClickOutside'

interface EmojiPickerButtonProps {
  editor: Editor
}

export const EmojiPickerButton: FC<EmojiPickerButtonProps> = ({ editor }) => {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)

  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(triggerRef, tooltipRef, {
    placement: 'top-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
  })

  useOnClickOutside({ current: tooltipRef }, e => {
    if (!triggerRef?.contains(e.target)) {
      setIsEmojiPickerOpen(false)
    }
  })

  const onSelectEmoji = useCallback(
    (emoji: BaseEmoji) => {
      const position = {
        from: editor.state.selection.from,
        to: editor.state.selection.to,
      }

      editor
        .chain()
        .focus()
        .insertContentAt(position, [
          {
            type: 'text',
            text: emoji.native,
          },
          {
            type: 'text',
            text: ' ',
          },
        ])
        .run()

      setIsEmojiPickerOpen(false)
    },
    [editor],
  )

  return (
    <div>
      <ComposerIconButton
        onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
        icon={EmotionLineIcon}
        aria-label="Emoji"
        ref={setTriggerRef}
      />
      {isEmojiPickerOpen && (
        <Portal>
          <div ref={setTooltipRef} style={styles.popper} {...attributes.popper}>
            <Picker
              onSelect={onSelectEmoji}
              showSkinTones={false}
              showPreview={false}
              autoFocus
              native
            />
          </div>
        </Portal>
      )}
    </div>
  )
}
