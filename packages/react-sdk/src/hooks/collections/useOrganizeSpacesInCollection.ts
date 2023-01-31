import { ClientError } from '@tribeplatform/gql-client/'
import {
  Action,
  Collection,
  MutationOrganizeSpacesInCollectionArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getCollectionKey,
  getCollectionsKey,
  getOrganizeSpacesInCollectionKey,
} from '../../utils/keys'

export const useOrganizeSpacesInCollection = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationOrganizeSpacesInCollectionArgs,
    { snapshot: Collection }
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    Action,
    ClientError,
    MutationOrganizeSpacesInCollectionArgs,
    { snapshot: Collection }
  >(
    (input: MutationOrganizeSpacesInCollectionArgs) =>
      client.collections.organizeSpaces(input),
    {
      onSettled: (data, error, variables) => {
        const collectionKey = getCollectionKey({ id: variables.collectionId })
        queryClient.invalidateQueries(collectionKey)

        const collectionsKey = getCollectionsKey()
        queryClient.invalidateQueries(collectionsKey)
      },
      mutationKey: getOrganizeSpacesInCollectionKey(),
      ...useMutationOptions,
    },
  )
}
