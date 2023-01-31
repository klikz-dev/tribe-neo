import { FC, useCallback, useState } from 'react'

import Image2LineIcon from 'remixicon-react/Image2LineIcon'

import { UploadImagesArgs } from '@tribeplatform/gql-client/types'
import { useCreateImages } from '@tribeplatform/react-sdk/hooks'

import { QuillType } from '../../@types'
import { insertImage } from '../../hooks/useComposerFile'
import { ImagePickerModal } from '../ImagePickerModal'
import { ComposerIconButton } from './ComposerIconButton'

interface ImagePickerButtonProps {
  quill: QuillType
}

export const ImagePickerButton: FC<ImagePickerButtonProps> = ({ quill }) => {
  const [open, setOpen] = useState(false)
  const { mutateAsync: createImages } = useCreateImages()

  const handleImageUpload = useCallback(
    async (file: File) => {
      const args: UploadImagesArgs[] = [{ file }]

      const uploadedImage = await createImages(args)

      return uploadedImage.map(ui => ({
        ...ui,
        mediaId: ui.id,
        mediaUrl: ui.url,
      }))
    },
    [createImages],
  )

  const upload = (file: File) => {
    const uploadPromise = handleImageUpload(file)
    insertImage(quill, uploadPromise, file)
  }

  return (
    <div className="hidden lg:block">
      <ComposerIconButton
        icon={Image2LineIcon}
        aria-label="Image"
        onClick={() => {
          setOpen(true)
        }}
      />
      {quill && (
        <ImagePickerModal
          open={open}
          close={() => setOpen(false)}
          upload={upload}
        />
      )}
    </div>
  )
}
