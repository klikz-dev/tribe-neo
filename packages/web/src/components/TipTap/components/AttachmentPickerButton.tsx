import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useRef,
  useImperativeHandle,
} from 'react'

import filesize from 'filesize'
import { nanoid } from 'nanoid'
import AttachmentLineIcon from 'remixicon-react/AttachmentLineIcon'

import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { ComposerIconButton } from '../../Composer/components/ComposerControls/ComposerIconButton'
import { FILE_SIZE_LIMIT } from '../../Composer/constants'

interface AttachmentPickerButtonProps {
  onAttachmentSelect: (files: File[]) => void
}
export type AttachmentPickerButtonRef = {
  open: () => void
}

export const AttachmentPickerButton = forwardRef<
  AttachmentPickerButtonRef,
  AttachmentPickerButtonProps
>(({ onAttachmentSelect }, ref) => {
  const attachmentInputId = `attachment-input-${nanoid(10)}`
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
          description: `Please upload a file that's less than ${filesize(
            FILE_SIZE_LIMIT,
          )}`,
          status: 'error',
        })
        return
      }

      onAttachmentSelect?.(files)

      event.target.value = ''
    },
    [onAttachmentSelect],
  )
  const open = () => {
    hiddenFileInput.current.click()
  }

  useImperativeHandle(ref, () => ({
    open,
  }))

  if (typeof onAttachmentSelect !== 'function') return null

  return (
    <div>
      <ComposerIconButton
        icon={AttachmentLineIcon}
        aria-label="Attachment"
        onClick={open}
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
})
