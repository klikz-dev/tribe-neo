import { useState } from 'react'

import SearchIcon from '@heroicons/react/solid/SearchIcon'
import { useHistory, useRouteMatch } from 'react-router'

import { SearchEntity } from '@tribeplatform/gql-client/types'
import { useSearch } from '@tribeplatform/react-sdk/hooks'
import { Keys } from '@tribeplatform/react-sdk/lib'
import { Autocomplete } from '@tribeplatform/react-ui-kit/Autocomplete'
import { StackedList } from '@tribeplatform/react-ui-kit/StackedList'

import { useDebounce } from '../../utils/useDebounce'
import { getIconFromType } from './SearchList'
import { SearchSubtitle } from './SearchSubtitle'
import { getSearchItemLink } from './utils'

export const SearchBar = ({ query, autoFocus = false }) => {
  const [search, setSearch] = useState(query)
  const history = useHistory()
  const debouncedQuery = useDebounce(search, 300)
  const match = useRouteMatch('/search')
  const enabled = match === null
  const { data, isLoading } = useSearch({
    variables: {
      input: {
        query: debouncedQuery,
      },
    },
    fields: {
      by: 'basic',
      in: 'basic',
    },
    useQueryOptions: {
      queryKey: Keys.getSearchKey({
        input: { query: debouncedQuery },
      }),
      keepPreviousData: true,
      enabled,
    },
  })

  const onSelect = (value: SearchEntity) => {
    if (value) {
      history.push(getSearchItemLink(value))
    }
  }

  const onEnter = ({ highlightedIndex, inputValue }) => {
    if (inputValue && highlightedIndex === -1) {
      history.push(`/search?query=${search}`)
    }
  }

  return (
    <div className="flex items-center flex-1">
      <Autocomplete
        itemToString={value => value?.title || ''}
        value={search}
        onChange={onSelect}
        options={data?.hits.flatMap(category => category.hits) || []}
        onInputChange={setSearch}
        className="w-full relative"
        loading={isLoading}
      >
        <Autocomplete.Input
          autoFocus={autoFocus}
          leadingIcon={<SearchIcon />}
          placeholder="Search..."
          onEnter={onEnter}
          // type="search"
        />
        {enabled && (
          <Autocomplete.Items className="h-full overflow-y-auto isolate">
            {data?.totalCount > 0 &&
              data?.hits.reduce(
                (result, category, sectionIndex) => {
                  result.sections.push(
                    // eslint-disable-next-line react/no-array-index-key
                    <StackedList.Group key={sectionIndex}>
                      <StackedList.GroupTitle className="capitalize">
                        {category.entityType}
                      </StackedList.GroupTitle>
                      {category.hits.map((hit, personIndex) => {
                        const index = result.itemIndex
                        result.itemIndex += 1
                        return (
                          <Autocomplete.Item
                            // eslint-disable-next-line react/no-array-index-key
                            key={personIndex}
                            value={hit}
                            index={index}
                          >
                            <div className="py-2 flex items-center space-x-3">
                              <div className="flex-shrink-0 text-basicSurface-500">
                                {getIconFromType(category.entityType)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-basicSurface-900">
                                  {hit.title}
                                </p>
                                <p className="text-sm truncate text-basicSurface-500">
                                  <SearchSubtitle hit={hit} />
                                </p>
                              </div>
                            </div>
                          </Autocomplete.Item>
                        )
                      })}
                    </StackedList.Group>,
                  )

                  return result
                },
                { sections: [], itemIndex: 0 },
              ).sections}
            {isLoading && (
              <Autocomplete.ItemsEmpty>Searching...</Autocomplete.ItemsEmpty>
            )}
            {!isLoading && search && data?.totalCount === 0 && (
              <Autocomplete.ItemsEmpty>No results</Autocomplete.ItemsEmpty>
            )}
          </Autocomplete.Items>
        )}
      </Autocomplete>
    </div>
  )
}
