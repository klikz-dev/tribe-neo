import { ClientError, SpaceFields } from '@tribeplatform/gql-client'
import { MutationUpdateSpaceArgs, Space } from '@tribeplatform/gql-client/types'

import { useQueryClient, useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getCollectionsKey,
  getSpaceKey,
  getUpdateSpaceKey,
} from '../../utils/keys'

export const useUpdateSpace = (options: {
  slug: string
  fields?: SpaceFields
  useMutationOptions?: UseMutationOptions<
    Space,
    ClientError,
    MutationUpdateSpaceArgs,
    { snapshot: Space }
  >
}) => {
  const { useMutationOptions, fields = 'default', slug } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const collectionsKey = getCollectionsKey({})

  return useMutation<
    Space,
    ClientError,
    MutationUpdateSpaceArgs,
    { snapshot: Space }
  >((input: MutationUpdateSpaceArgs) => client.spaces.update(input, fields), {
    onMutate: async newSpace => {
      const spaceKey = getSpaceKey({ slug })
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(spaceKey)

      // Snapshot the previous value
      const snapshot = queryClient.getQueryData<Space>(spaceKey)

      // Optimistically update to the new value
      queryClient.setQueryData<Space>(spaceKey, old => ({
        ...old,
        ...newSpace,
      }))

      // Return a context object with the snapshotted value
      return { snapshot }
    },
    onSuccess: data => {
      queryClient.invalidateQueries(collectionsKey)
      const spaceKey = getSpaceKey({ slug })
      queryClient.setQueryData<Space>(spaceKey, oldData => ({
        ...oldData,
        ...data,
      }))
    },
    onError: (err, newSpace, context) => {
      const spaceKey = getSpaceKey({ slug })
      // revert back the optimistic response
      queryClient.setQueryData<Space>(spaceKey, context.snapshot)

      // invalidate to refetch again
      queryClient.invalidateQueries(spaceKey)
    },
    mutationKey: getUpdateSpaceKey(),
    ...useMutationOptions,
  })
}
