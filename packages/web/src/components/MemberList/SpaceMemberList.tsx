import InfiniteScroll from 'react-infinite-scroller'

import { useSpaceMembers } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { GridList } from '@tribeplatform/react-ui-kit/Layout'

import { MemberListLoading } from './CommunityMemberList'
import { EmptyState } from './EmptyState'
import { MemberCard } from './MemberCard'

export const SpaceMemberList = ({ spaceId }) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useSpaceMembers({
      fields: {
        member: { profilePicture: 'basic', banner: 'basic', role: 'basic' },
      },
      variables: { limit: 30, spaceId },
      useInfiniteQueryOptions: {
        refetchOnMount: 'always',
      },
    })
  const { nodes: members = [] } = simplifyPaginatedResult(data)
  return (
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
          {members
            .filter(spaceMember => spaceMember?.member)
            .map(({ member }) => (
              <GridList.Item key={member.id}>
                <MemberCard member={member} />
              </GridList.Item>
            ))}
          {isLoading || isFetchingNextPage ? <MemberListLoading /> : null}
        </GridList>
      )}
    </InfiniteScroll>
  )
}
