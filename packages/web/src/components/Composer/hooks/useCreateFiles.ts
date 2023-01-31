import {
  ClientAttachmentErrorHandler,
  ClientError,
} from '@tribeplatform/gql-client'
import { AttachmentUploadType, File } from '@tribeplatform/gql-client/types'
import {
  Keys,
  UseMutationOptions,
  useMutation,
  useTribeClient,
} from '@tribeplatform/react-sdk'

export const useCreateFiles = (options?: {
  errorHandler?: ClientAttachmentErrorHandler
  useMutationOptions?: UseMutationOptions<
    File[],
    ClientError,
    AttachmentUploadType
  >
}) => {
  const { useMutationOptions, errorHandler } = options || {}
  const { client } = useTribeClient()
  const createFilesKey = Keys.getCreateFilesKey()
  return useMutation<File[], ClientError, AttachmentUploadType>(
    input => client.media.uploadFiles(input, errorHandler),
    {
      mutationKey: createFilesKey,
      ...useMutationOptions,
    },
  )
}
