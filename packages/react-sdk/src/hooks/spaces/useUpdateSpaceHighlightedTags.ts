import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationUpdateSpaceHighlightedTagsArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getSpaceKey } from '../../utils/keys'

export const useUpdateSpaceHighlightedTags = (
  spaceSlug: string,
  options?: {
    useMutationOptions?: UseMutationOptions<
      Action,
      ClientError,
      MutationUpdateSpaceHighlightedTagsArgs
    >
  },
) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  return useMutation<
    Action,
    ClientError,
    MutationUpdateSpaceHighlightedTagsArgs
  >(
    (input: MutationUpdateSpaceHighlightedTagsArgs) =>
      client.spaces.updateHighlightedTags(input),
    {
      ...useMutationOptions,
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(
          getSpaceKey({
            id: variables.spaceId,
          }),
        )
        queryClient.invalidateQueries(
          getSpaceKey({
            slug: spaceSlug,
          }),
        )
        if (typeof useMutationOptions.onSuccess === 'function') {
          useMutationOptions.onSuccess(data, variables, context)
        }
      },
    },
  )
}
