import { ChangeEvent, FC, useCallback, useRef } from 'react'

import AttachmentLineIcon from 'remixicon-react/AttachmentLineIcon'

import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { QuillType } from '../../@types'
import { FILE_SIZE_LIMIT } from '../../constants'
import { ComposerIconButton } from './ComposerIconButton'

export interface AttachmentsButtonProps {
  quill: QuillType
  onAttachmentSelect?: (files: File[]) => void
}

export const AttachmentsButton: FC<AttachmentsButtonProps> = ({
  quill,
  onAttachmentSelect,
}) => {
  const quillId = quill?.container?.id
  const attachmentInputId = `attachment-input-${quillId}`
  const hiddenFileInput = useRef<HTMLInputElement>()

  const onAttachmentInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return

      const files = Array.from(event.target.files)

      const selectedTooLargeFile = files.some(
        file => file.size > FILE_SIZE_LIMIT,
      )

      if (selectedTooLargeFile) {
        toast({
          title: 'File too large',
          description: `Please upload a file that's less than {{ fileSize }}`,
          status: 'error',
        })
        return
      }

      onAttachmentSelect?.(files)

      event.target.value = ''
    },
    [onAttachmentSelect],
  )

  if (typeof onAttachmentSelect !== 'function') return null

  return (
    <div className="hidden lg:block">
      <ComposerIconButton
        icon={AttachmentLineIcon}
        aria-label="Attachment"
        onClick={() => {
          hiddenFileInput.current.click()
        }}
      />
      <input
        onChange={onAttachmentInputChange}
        id={attachmentInputId}
        ref={hiddenFileInput}
        type="file"
        className="hidden"
        multiple
      />
    </div>
  )
}
