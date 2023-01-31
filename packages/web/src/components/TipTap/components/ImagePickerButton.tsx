import { forwardRef, useImperativeHandle, useState } from 'react'

import Image2LineIcon from 'remixicon-react/Image2LineIcon'

import { ComposerIconButton } from '../../Composer/components/ComposerControls/ComposerIconButton'
import { ImagePickerModal } from '../../Composer/components/ImagePickerModal'

interface ImagePickerButtonProps {
  upload: (image: File) => Promise<void>
}
export type ImagePickerRef = { toggle: () => void }

export const ImagePickerButton = forwardRef<
  ImagePickerRef,
  ImagePickerButtonProps
>(({ upload }, ref) => {
  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    toggle: () => {
      setOpen(!open)
    },
  }))

  return (
    <div>
      <ComposerIconButton
        icon={Image2LineIcon}
        aria-label="image"
        onClick={() => {
          setOpen(true)
        }}
      />
      <ImagePickerModal
        open={open}
        close={() => setOpen(false)}
        upload={upload}
      />
    </div>
  )
})
