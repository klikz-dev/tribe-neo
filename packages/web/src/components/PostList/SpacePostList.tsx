import LockClosedIcon from '@heroicons/react/outline/LockClosedIcon'

import { hasScopesPermission } from '@tribeplatform/gql-client/permissions'
import {
  PinnedInto,
  Post,
  QueryPostsArgs,
  QueryTagPostsArgs,
} from '@tribeplatform/gql-client/types'
import {
  usePosts,
  useSpace,
  usePinnedPosts,
} from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { EmptyState } from '@tribeplatform/react-ui-kit/EmptyState'

import { EmptyState as PostsEmptyState } from './EmptyState'
import { GenericPostList } from './GenericPostList'

export const SpacePostList = ({ spaceId, tagId }) => {
  const { data: space } = useSpace({
    variables: { id: spaceId },
    fields: 'default',
  })

  const [canGetPosts] = hasScopesPermission(space, ['getPosts'])

  const shouldFilterByTag = tagId && tagId.length > 0

  let variables: QueryPostsArgs | QueryTagPostsArgs

  if (shouldFilterByTag) {
    // TODO: This is a temporary solution until tags become filterable by posts query
    variables = { spaceId, tagId, limit: 5 } as QueryTagPostsArgs
  } else {
    variables = {
      limit: 5,
      spaceIds: [spaceId],
      excludePins: true,
    } as QueryPostsArgs
  }

  const {
    data,
    fetchNextPage = false,
    hasNextPage,
    isLoading,
    isFetched,
    isFetchingNextPage,
  } = usePosts({
    variables,
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
    useInfiniteQueryOptions: {
      refetchOnMount: 'always',
      enabled: canGetPosts,
    },
  })

  const pinnedPostsData = usePinnedPosts({
    variables: { spaceId },
    useQueryOptions: {
      enabled: canGetPosts,
    },
  })
  let { data: pinnedPosts } = pinnedPostsData
  const { isLoading: isPinnedPostLoading } = pinnedPostsData

  if (!canGetPosts && space?.authMemberProps?.permissions) {
    return (
      <Card>
        <Card.Content>
          <div className="my-16">
            <EmptyState
              title="This space is private"
              icon={<LockClosedIcon />}
              description="Please join to access posts inside this space."
            />
          </div>
        </Card.Content>
      </Card>
    )
  }

  let { nodes: posts } = simplifyPaginatedResult(data) as { nodes: Post[] }
  if (shouldFilterByTag) {
    pinnedPosts = pinnedPosts?.filter(post =>
      post.tags?.some(tag => tag.id === tagId),
    )
    posts = posts.filter(post => !post.pinnedInto?.includes(PinnedInto.SPACE))
  }

  if (
    space?.authMemberProps?.permissions &&
    !isLoading &&
    !isPinnedPostLoading &&
    !posts?.length &&
    !pinnedPosts?.length
  ) {
    return <PostsEmptyState />
  }

  return (
    <GenericPostList
      pinnedPosts={pinnedPosts}
      posts={posts}
      context="space"
      activeTagId={tagId}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={
        isLoading || isPinnedPostLoading || !space?.authMemberProps?.permissions
      }
      isFetchingNextPage={isFetchingNextPage}
      isFetched={isFetched}
    />
  )
}
