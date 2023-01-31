import InfiniteScroll from 'react-infinite-scroller'

import {
  ModerationEntityType,
  ModerationItem,
  ModerationStatus,
  Post as PostType,
} from '@tribeplatform/gql-client/types'
import { useModerationItems } from '@tribeplatform/react-sdk/hooks'
import { simplifyPaginatedResult } from '@tribeplatform/react-sdk/utils'
import { Alert } from '@tribeplatform/react-ui-kit/Alert'
import { Card } from '@tribeplatform/react-ui-kit/Card'

import { Post } from '../../Post'
import { PendingPostButtons } from './PendingPostButtons'
import { PendingPostsEmpty } from './PendingPostsEmpty'
import { PendingPostsLoading } from './PendingPostsLoading'

export const PendingPosts = () => {
  const {
    data,
    fetchNextPage = false,
    hasNextPage,
    isLoading,
  } = useModerationItems({
    fields: {
      entity: {
        onPost: 'default',
      },
    },
    variables: {
      limit: 5,
      entityType: ModerationEntityType.POST,
      status: ModerationStatus.REVIEW,
    },
  })

  const { nodes: moderationItems } =
    simplifyPaginatedResult<ModerationItem>(data)

  if (!isLoading && moderationItems?.length === 0) return <PendingPostsEmpty />

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchNextPage}
      hasMore={hasNextPage || isLoading}
      threshold={800}
      className="max-w-3xl flex flex-col space-y-5"
      loader={<PendingPostsLoading />}
      useWindow={false}
    >
      {moderationItems?.map(moderationItem => (
        <Card key={moderationItem?.id}>
          <Card.Content>
            <Alert
              status="info"
              title={moderationItem?.description}
              className="mb-4"
            />
            <Post
              post={moderationItem?.entity as PostType}
              context="moderation"
              replyBar={false}
            />
            <PendingPostButtons moderationItemId={moderationItem?.id} />
          </Card.Content>
        </Card>
      ))}
    </InfiniteScroll>
  )
}
