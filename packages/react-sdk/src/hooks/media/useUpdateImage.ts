import { ClientError } from '@tribeplatform/gql-client'
import { Image, MutationUpdateImageArgs } from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'

export const useUpdateImage = (options?: {
  useMutationOptions?: UseMutationOptions<
    Image,
    ClientError,
    MutationUpdateImageArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()

  return useMutation<Image, ClientError, MutationUpdateImageArgs>(
    (variables: MutationUpdateImageArgs) => client.media.updateImage(variables),
    useMutationOptions,
  )
}
