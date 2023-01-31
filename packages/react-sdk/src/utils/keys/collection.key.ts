import {
  QueryCollectionArgs,
  QueryCollectionsArgs,
} from '@tribeplatform/gql-client/types'

export const COLLECTION_KEY = 'collection'
export const COLLECTIONS_KEY = 'collections'
export const CREATE_COLLECTION_KEY = 'createCollection'
export const UPDATE_COLLECTION_KEY = 'updateCollection'
export const ORGANIZE_SPACES_IN_COLLECTION_KEY = 'organizeSpacesInCollection'
export const DELETE_COLLECTION_KEY = 'deleteCollection'

export const getCollectionKey = (args: QueryCollectionArgs) => [
  COLLECTION_KEY,
  args,
]
export const getCollectionsKey = (args?: QueryCollectionsArgs) =>
  args ? [COLLECTIONS_KEY, args] : [COLLECTIONS_KEY]

export const getCreateCollectionKey = () => CREATE_COLLECTION_KEY
export const getUpdateCollectionKey = () => UPDATE_COLLECTION_KEY
export const getOrganizeSpacesInCollectionKey = () =>
  ORGANIZE_SPACES_IN_COLLECTION_KEY
export const getDeleteCollectionKey = () => DELETE_COLLECTION_KEY
