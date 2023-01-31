import { useCallback } from 'react'

import { ImageModuleType, Media, QuillType, ReactQuillProps } from '../@types'

export const insertImage = (
  quill: QuillType,
  uploadPromise: ReturnType<ReactQuillProps['handleAttachmentUpload']>,
  file?: File,
) => {
  if (!uploadPromise) return

  const range = quill.getSelection(true)

  quill.insertEmbed(range?.index, 'image', { uploadPromise, file }, 'user')

  quill.setSelection(range?.index + 1, 0, 'silent')
}

export const useComposerFile = ({
  handleAttachmentUpload,
  handleImageUpload,
}: Pick<ReactQuillProps, 'handleAttachmentUpload'> &
  Pick<ImageModuleType, 'handleImageUpload'>) => {
  const upload = useCallback(
    async (files: FileList, quill: QuillType): Promise<Media> => {
      try {
        if (!files || !files.length) return

        const file = files[0]
        let fileHandler = null

        if (file.type.includes('image/')) {
          fileHandler = handleImageUpload
        } else {
          fileHandler = handleAttachmentUpload
        }

        if (!fileHandler) return

        const uploadMediaPromise = fileHandler(files)

        if (quill) {
          insertImage(quill, uploadMediaPromise, file)
        }

        await uploadMediaPromise
      } catch (error) {
        console.log('Image upload', error)
      }
    },
    [handleAttachmentUpload, handleImageUpload],
  )

  return upload
}
