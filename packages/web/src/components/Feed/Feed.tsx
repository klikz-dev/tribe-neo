import { Post } from '@tribeplatform/gql-client/types'
import { useAuthMember, useFeed } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'

import { GenericPostList } from '../PostList/GenericPostList'
import { FeedSettings } from './settings/FeedSettings'

export const Feed = ({ view = 'card' }) => {
  const { isGuest } = useAuthMember()
  const {
    data,
    fetchNextPage = false,
    hasNextPage,
    isLoading,
    isFetched,
    isFetchingNextPage,
  } = useFeed({
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
    variables: { limit: view === 'card' ? 5 : 10, onlyMemberSpaces: !isGuest },
    useInfiniteQueryOptions: {
      refetchOnMount: 'always',
    },
  })
  const { nodes: posts } = simplifyPaginatedResult<Post>(data)

  return (
    <GenericPostList
      {...{
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        posts,
        isFetched,
        view,
        context: 'network',
      }}
    />
  )
}

Feed.Settings = FeedSettings
