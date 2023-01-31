import { ClientError } from '@tribeplatform/gql-client'
import { CreateEmojiInput, Emoji } from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getCreateEmojisKey } from '../../utils/keys'

export const useCreateEmojis = (options?: {
  useMutationOptions?: UseMutationOptions<
    Emoji[],
    ClientError,
    Array<CreateEmojiInput>
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const createEmojisKey = getCreateEmojisKey()

  return useMutation<Emoji[], ClientError, Array<CreateEmojiInput>>(
    (input: CreateEmojiInput[]) => client.media.createEmojis(input),
    {
      mutationKey: createEmojisKey,
      ...useMutationOptions,
    },
  )
}
