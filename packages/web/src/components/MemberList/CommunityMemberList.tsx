import { useState } from 'react'

import InfiniteScroll from 'react-infinite-scroller'

import { Member } from '@tribeplatform/gql-client/types'
import { useMembers } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { GridList } from '@tribeplatform/react-ui-kit/Layout'

import { EmptyState } from './EmptyState'
import { FilterBar } from './FilterBar'
import { MemberCard } from './MemberCard'

export const MemberListLoading = ({ count = 16 }) => {
  return (
    <>
      {[...Array(count)].map((_e, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <GridList.Item key={i}>
          <Card className="h-full">
            <div className="animate-pulse flex-1 flex flex-col mb-2 p-6 pt-4 space-y-2 items-center text-center">
              <div className="mb-3 w-32 h-32 rounded-full bg-surface-300"></div>
              <div className="h-4 bg-surface-300 rounded-full w-2/3"></div>
              <div className="h-4 bg-surface-300 rounded-full w-3/4"></div>
            </div>
          </Card>
        </GridList.Item>
      ))}
    </>
  )
}

export const CommunityMemberList = () => {
  const [filters, setFilters] = useState({})
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMembers({
      fields: { profilePicture: 'basic', banner: 'basic', role: 'basic' },
      variables: { limit: 30, ...filters },
      useInfiniteQueryOptions: { keepPreviousData: true },
    })
  const { nodes: members } = simplifyPaginatedResult<Member>(data)

  return (
    <div className="flex flex-col space-y-5">
      <FilterBar setFilters={setFilters} />
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchNextPage}
        hasMore={hasNextPage || false}
        threshold={800}
      >
        {!members?.length && !isLoading ? (
          <EmptyState />
        ) : (
          <GridList columns={4} className="items-stretch">
            {members.map(member => (
              <GridList.Item key={member.id}>
                <MemberCard member={member} />
              </GridList.Item>
            ))}
            {isLoading || isFetchingNextPage ? <MemberListLoading /> : null}
          </GridList>
        )}
      </InfiniteScroll>
    </div>
  )
}
