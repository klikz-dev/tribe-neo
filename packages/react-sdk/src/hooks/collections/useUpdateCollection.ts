import { ClientError } from '@tribeplatform/gql-client'
import {
  MutationUpdateCollectionArgs,
  Collection,
  Action,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getCollectionKey,
  getCollectionsKey,
  getUpdateCollectionKey,
} from '../../utils/keys'

export const useUpdateCollection = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationUpdateCollectionArgs,
    { snapshot: Collection }
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    Action,
    ClientError,
    MutationUpdateCollectionArgs,
    { snapshot: Collection }
  >((input: MutationUpdateCollectionArgs) => client.collections.update(input), {
    onSettled: (data, error, variables) => {
      const collectionKey = getCollectionKey({ id: variables.id })
      queryClient.invalidateQueries(collectionKey)

      const collectionsKey = getCollectionsKey()
      queryClient.invalidateQueries(collectionsKey)
    },
    mutationKey: getUpdateCollectionKey(),
    ...useMutationOptions,
  })
}
