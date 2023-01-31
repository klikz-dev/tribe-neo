import { SearchEntity, SearchEntityType } from '@tribeplatform/gql-client/types'

export const getSearchItemLink = ({
  entityType,
  entityId,
  in: space,
}: SearchEntity): string => {
  switch (entityType) {
    case SearchEntityType.MEMBER:
      return `/member/${entityId}`
    case SearchEntityType.SPACE:
      return `/${space?.slug}`
    // Post.
    default:
      return `/${space?.slug}/post/${entityId}`
  }
}
