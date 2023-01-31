import BookOpenIcon from '@heroicons/react/outline/BookOpenIcon'
import UserIcon from '@heroicons/react/outline/UserIcon'
import ViewGridIcon from '@heroicons/react/outline/ViewGridIcon'
import SearchIcon from '@heroicons/react/solid/SearchIcon'
import { Link } from 'react-router-dom'

import { SearchEntityType, SearchResult } from '@tribeplatform/gql-client/types'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { EmptyState } from '@tribeplatform/react-ui-kit/EmptyState'

import { SearchSubtitle } from './SearchSubtitle'
import { getSearchItemLink } from './utils'

export const getIconFromType = type => {
  switch (type) {
    case SearchEntityType.POST:
      return <BookOpenIcon className="w-10 h-10" />
    case SearchEntityType.MEMBER:
      return <UserIcon className="w-10 h-10" />
    case SearchEntityType.SPACE:
      return <ViewGridIcon className="w-10 h-10" />
    default:
      return null
  }
}

export const SearchList = ({
  query,
  result,
}: {
  query: string
  result: SearchResult
}) => {
  if (!query) {
    return (
      <Card className="py-10">
        <EmptyState
          icon={<SearchIcon />}
          title="Nothing to search for yet"
          description="Please start typing in the search bar"
        />
      </Card>
    )
  }

  if (!result || result?.totalCount === 0) {
    return (
      <Card className="py-10">
        <EmptyState
          icon={<SearchIcon />}
          title="No results"
          description="You may want to try searching for something else"
        />
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <Card.Content>
        <h3>Results for &ldquo;{query}&rdquo;</h3>
      </Card.Content>
      {result?.hits.map(category => (
        <div key={category.entityType}>
          <div className="border-t border-b capitalize border-neutral-200 bg-surface-100 px-6 py-1 text-basicSurface-500">
            <b>{category.entityType}</b>
          </div>
          <ul className="divide-y divide-neutral-200">
            {category?.hits.map(hit => (
              <li key={hit.id}>
                <Link
                  to={getSearchItemLink(hit)}
                  className="px-6 py-5 flex items-center space-x-3 hover:bg-surface-100"
                >
                  <div className="flex-shrink-0 text-basicSurface-500">
                    {getIconFromType(category.entityType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-basicSurface-900">{hit.title}</p>
                    <p className="text-basicSurface-500 truncate">
                      <SearchSubtitle hit={hit} />
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Card>
  )
}
