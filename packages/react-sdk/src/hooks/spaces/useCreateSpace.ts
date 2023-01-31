import { SpaceFields, Types } from '@tribeplatform/gql-client'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getCreateSpaceKey,
  getCollectionsKey,
  getSpaceKey,
  getMemberNotificationSettingsKey,
} from '../../utils/keys'

export const useCreateSpace = (options?: {
  fields?: SpaceFields
  useMutationOptions?: UseMutationOptions<
    Types.Space,
    Error,
    Types.MutationCreateSpaceArgs,
    { snapshot: Types.Space }
  >
}) => {
  const { useMutationOptions, fields } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  const createSpaceKey = getCreateSpaceKey()
  const collectionsKey = getCollectionsKey({})

  return useMutation<
    Types.Space,
    Error,
    Types.MutationCreateSpaceArgs,
    { snapshot: Types.Space }
  >(
    (input: Types.MutationCreateSpaceArgs) =>
      client.spaces.create(input, fields),
    {
      mutationKey: createSpaceKey,
      onSuccess: async space => {
        const spaceKey = getSpaceKey({ slug: space.slug })

        queryClient.setQueryData<Types.Space>(spaceKey, _ => space)
        queryClient.invalidateQueries(getMemberNotificationSettingsKey())
        queryClient.invalidateQueries(spaceKey)
        queryClient.invalidateQueries(collectionsKey)
      },
      ...useMutationOptions,
    },
  )
}
