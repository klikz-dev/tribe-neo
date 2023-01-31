import { FC } from 'react'

import { QuillType } from '../../@types'
import { AttachmentsButton, AttachmentsButtonProps } from './AttachmentsButton'
import { EmojiPickerButton } from './EmojiPickerButton'
import { ImagePickerButton } from './ImagePickerButton'
import { OptionsButton } from './OptionsButton'

export interface ComposerControlsProps
  extends Pick<AttachmentsButtonProps, 'onAttachmentSelect'> {
  quill: QuillType | null
}

export const ComposerControls: FC<ComposerControlsProps> = ({
  quill,
  children,
  onAttachmentSelect,
}) => {
  if (!quill) return null

  return (
    <div className="flex space-x-2">
      <OptionsButton quill={quill} />

      <EmojiPickerButton quill={quill} />

      <ImagePickerButton quill={quill} />

      <AttachmentsButton
        onAttachmentSelect={onAttachmentSelect}
        quill={quill}
      />

      {children}
    </div>
  )
}
