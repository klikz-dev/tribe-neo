import { FC } from 'react'

import { Modal } from '@tribeplatform/react-ui-kit/Modal'

import { linkToFile } from '../../../lib/upload'
import { ImagePickerTabs } from '../../ImagePicker/ImagePicker'

export const ImagePickerModal: FC<{
  upload: (file: File) => void
  open: boolean
  close: () => void
}> = ({ upload, open, close }) => {
  return (
    <Modal open={open} onClose={close}>
      <Modal.Header title="Choose an image" />
      <Modal.Content>
        <ImagePickerTabs
          onSelect={close}
          onLinkChange={async link => {
            const file = await linkToFile(link)
            upload(file)
          }}
          onImageChange={upload}
        />
      </Modal.Content>
    </Modal>
  )
}
