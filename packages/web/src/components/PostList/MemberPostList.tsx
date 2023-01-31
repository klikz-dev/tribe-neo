import { Post } from '@tribeplatform/gql-client/types'
import { useMemberPosts } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'

import { EmptyState } from './EmptyState'
import { GenericPostList } from './GenericPostList'

export const MemberPostList = ({ memberId }) => {
  const {
    data,
    fetchNextPage = false,
    hasNextPage,
    isLoading,
    isFetched,
    isFetchingNextPage,
  } = useMemberPosts({
    variables: { limit: 5, memberId },
    useInfiniteQueryOptions: {
      refetchOnMount: 'always',
    },
    fields: {
      tags: 'basic',
      owner: {
        member: { profilePicture: 'basic' },
      },
      postType: 'basic',
      embeds: 'basic',
      mentions: 'basic',
      space: 'basic',
      attachments: 'basic',
      authMemberProps: 'all',
      reactions: { fields: 'all', variables: { limit: 25 } },
      replies: {
        fields: {
          authMemberProps: 'all',
          embeds: 'basic',
          mentions: 'basic',
          attachments: 'basic',
          owner: {
            member: { profilePicture: 'basic' },
          },
          reactions: { fields: 'basic', variables: { limit: 25 } },
        },
        variables: {
          limit: 2,
          reverse: true,
        },
      },
    },
  })

  const { nodes: posts } = simplifyPaginatedResult<Post>(data)

  if (!isLoading && !posts?.length) return <EmptyState />

  return (
    <GenericPostList
      posts={posts}
      context="member"
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
      isFetched={isFetched}
      isFetchingNextPage={isFetchingNextPage}
    />
  )
}
