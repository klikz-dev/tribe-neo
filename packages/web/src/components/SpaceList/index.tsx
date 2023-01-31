import { useState } from 'react'

import InfiniteScroll from 'react-infinite-scroller'

import { Space } from '@tribeplatform/gql-client/types'
import { useSpaces } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { GridList } from '@tribeplatform/react-ui-kit/Layout'

import { EmptyState } from './EmptyState'
import { FilterBar } from './FilterBar'
import { SpaceCard } from './SpaceCard'

export const SpaceListLoading = ({ count = 16 }) => {
  return (
    <>
      {[...Array(count)].map((_e, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <GridList.Item key={i}>
          <Card className="h-full">
            <div className="animate-pulse flex-1 flex flex-col mb-2 p-6 pt-4 space-y-3 items-center text-center">
              <div className="mb-3 w-24 h-24 rounded-full bg-surface-300" />
              <div className="h-4 bg-surface-300 rounded-full w-2/3" />
              <div className="h-4 bg-surface-300 rounded-full w-3/4" />
            </div>
          </Card>
        </GridList.Item>
      ))}
    </>
  )
}

export const SpaceList = ({
  memberId,
  collectionId,
}: {
  memberId?: string
  collectionId?: string
}) => {
  const [filters, setFilters] = useState({})
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSpaces({
      fields: {
        image: 'basic',
        banner: 'basic',
        authMemberProps: 'all',
        postsCount: 'basic',
      },
      variables: { limit: 30, memberId, collectionId, ...filters },
      useInfiniteQueryOptions: { keepPreviousData: true },
    })
  const { nodes: spaces } = simplifyPaginatedResult<Space>(data)

  return (
    <div className="flex flex-col space-y-5">
      <FilterBar setFilters={setFilters} />
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchNextPage}
        hasMore={hasNextPage || false}
        threshold={800}
      >
        {!spaces?.length && !isLoading ? (
          <EmptyState />
        ) : (
          <GridList columns={4}>
            {spaces.map(space => (
              <GridList.Item key={space.id}>
                <SpaceCard space={space} />
              </GridList.Item>
            ))}
            {isLoading || isFetchingNextPage ? <SpaceListLoading /> : null}
          </GridList>
        )}
      </InfiniteScroll>
    </div>
  )
}
