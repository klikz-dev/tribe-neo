import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  ActionFields,
  MutationDeleteCollectionArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getCollectionKey,
  getCollectionsKey,
  getDeleteCollectionKey,
} from '../../utils/keys'

export const useDeleteCollection = (options?: {
  fields?: ActionFields
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationDeleteCollectionArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError, MutationDeleteCollectionArgs>(
    input => client.collections.delete(input.id),
    {
      onSettled: (data, error, input) => {
        const collectionKey = getCollectionKey(input)
        queryClient.removeQueries(collectionKey)

        const collectionsKey = getCollectionsKey()
        queryClient.invalidateQueries(collectionsKey)
      },
      mutationKey: getDeleteCollectionKey(),
      ...useMutationOptions,
    },
  )
}
