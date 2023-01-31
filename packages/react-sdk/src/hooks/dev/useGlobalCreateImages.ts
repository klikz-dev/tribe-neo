import { ClientError } from '@tribeplatform/gql-client'
import { Image, UploadImagesArgs } from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getCreateEmojisKey } from '../../utils/keys'

export const useGlobalCreateImages = (options?: {
  useMutationOptions?: UseMutationOptions<
    Image[],
    ClientError,
    Array<UploadImagesArgs>
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const createEmojisKey = getCreateEmojisKey()

  return useMutation<Image[], ClientError, UploadImagesArgs[]>(
    (input: UploadImagesArgs[]) => client.dev.uploadImages(input),
    {
      mutationKey: createEmojisKey,
      ...useMutationOptions,
    },
  )
}
