import { useCallback, useState } from 'react'

import { ClientAttachmentErrorHandler } from '@tribeplatform/gql-client'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { Attachment } from '../@types'
import { useCreateFiles } from './useCreateFiles'

export const useAttachments = (initialAttachments = []) => {
  const [attachments, setAttachments] =
    useState<Attachment[]>(initialAttachments)

  const errorHandler: ClientAttachmentErrorHandler = error => {
    toast({
      title: `Unable to upload ${error?.fileName}`,
      description: error?.message,
      status: 'error',
    })
  }

  const { mutateAsync: uploadFiles } = useCreateFiles({
    errorHandler,
  })

  const handleAttachmentSelect = useCallback(
    async (files: File[]) => {
      if (!files?.length) return

      const tempFileData = files.map(
        ({ name, size }) =>
          ({
            id: `${name}-${size}`,
            url: '',
            downloadUrl: '',
            size,
            extension: name.slice(name.lastIndexOf('.') + 1).toLowerCase(),
            name,
            isLoading: true,
          } as Attachment),
      )

      setAttachments(attachments => [...tempFileData, ...attachments])

      const uploadedFiles = await uploadFiles(
        files.map(file => {
          const { type, name, size } = file

          return {
            file,
            contentType: type,
            name,
            extension: name.split('.').pop().toLowerCase() || '',
            size,
          }
        }),
      )

      setAttachments(attachments => [
        ...uploadedFiles.map(uploadedFile => ({
          ...uploadedFile,
          isLoading: false,
        })),
        ...attachments.filter(a => !a.isLoading),
      ])
    },
    [uploadFiles],
  )

  const resetAttachments = useCallback(() => setAttachments([]), [])

  const handleAttachmentDelete = useCallback(
    (attachment: Attachment) => {
      // to reset send the attachment as null
      if (attachment === null) {
        resetAttachments()
      } else {
        setAttachments(attachments =>
          attachments.filter(({ id }) => id !== attachment.id),
        )
      }
    },
    [resetAttachments],
  )

  return {
    attachments,
    resetAttachments,
    handleAttachmentSelect,
    handleAttachmentDelete,
  }
}
