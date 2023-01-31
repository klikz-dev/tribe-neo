import { SearchEntity, SearchEntityType } from '@tribeplatform/gql-client/types'

import { dayjs } from '../../lib/dayjs'

export const SearchSubtitle = ({ hit }: { hit: SearchEntity }) => {
  const { entityType, in: space, by: author, content, created } = hit || {}

  switch (entityType) {
    case SearchEntityType.MEMBER:
    case SearchEntityType.SPACE:
      return <>{content}</>
    case SearchEntityType.POST:
    default:
      // eslint-disable-next-line no-case-declarations
      const authorName = author?.name || 'Unknown'
      // eslint-disable-next-line no-case-declarations
      const time = dayjs(created).fromNow()
      // eslint-disable-next-line no-case-declarations
      const spaceName = space?.name || 'Untitled'

      return (
        <>
          Posted on <span className="text-basicSurface-700">{spaceName}</span>{' '}
          {time} by <span className="text-basicSurface-700">{authorName}</span>
        </>
      )
  }
}
