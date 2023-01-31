import { ClientError, CollectionFields, Types } from '@tribeplatform/gql-client'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getCreateCollectionKey, getCollectionsKey } from '../../utils/keys'

export const useCreateCollection = (options?: {
  fields?: CollectionFields
  useMutationOptions?: UseMutationOptions<
    Types.Collection,
    ClientError,
    Types.MutationCreateCollectionArgs,
    { snapshot: Types.Collection }
  >
}) => {
  const { useMutationOptions, fields } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  const createCollectionKey = getCreateCollectionKey()
  const collectionsKey = getCollectionsKey({})

  return useMutation<
    Types.Collection,
    ClientError,
    Types.MutationCreateCollectionArgs,
    { snapshot: Types.Collection }
  >(
    (input: Types.MutationCreateCollectionArgs) =>
      client.collections.create(input, fields),
    {
      mutationKey: createCollectionKey,
      onSuccess: async _ => {
        queryClient.invalidateQueries(collectionsKey)
      },
      ...useMutationOptions,
    },
  )
}
