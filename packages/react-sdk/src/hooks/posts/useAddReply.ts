import { InfiniteData, QueryClient, QueryKey } from 'react-query'
import { QueryFilters } from 'react-query/types/core/utils'

import { ClientError, PostFields } from '@tribeplatform/gql-client'
import {
  MutationCreateReplyArgs,
  PaginatedPost,
  Post,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getAddReplyKey,
  getPostKey,
  POSTS_KEY,
  FEED_KEY,
} from '../../utils/keys'
import {
  addPostToPaginatedPost,
  postRepliesUpdater,
  infinitePostUpdater,
  infinitePostArrayUpdater,
} from '../cache/useCachedPost'
import { pinnedPostsFilter } from './filters'

type Snapshot = {
  rootPostSnapshot?: Post
  repliesSnapshot: [QueryKey, InfiniteData<PaginatedPost>][]
  postsSnapshots: [QueryKey, InfiniteData<PaginatedPost>][]
  pinnedPostsSnapshot: [QueryKey, InfiniteData<Post>][]
}

const onAddReply = (
  variables: MutationCreateReplyArgs,
  newPost: Post,
  queryClient: QueryClient,
): Snapshot => {
  const { postId } = variables
  /** Add the reply to the parent post.replies query */
  const rootPostKey = getPostKey(postId)
  const rootPostSnapshot = queryClient.getQueryData<Post>(rootPostKey)
  if (rootPostSnapshot) {
    queryClient.setQueryData<Post>(rootPostKey, postRepliesUpdater(newPost))
  }

  /**
   * Add the reply to the replies queries
   * (inactive/disabled queries are the replies to reply ones so we also update them to show the feedback)
   * */
  const repliesKey: QueryFilters = {
    queryKey: POSTS_KEY,
    predicate: query => {
      const [main, args] = query.queryKey || []
      return main === POSTS_KEY && (args as any)?.postId === postId
    },
  }

  const repliesSnapshot =
    queryClient.getQueriesData<InfiniteData<PaginatedPost>>(repliesKey)

  if (repliesSnapshot) {
    queryClient.setQueriesData<InfiniteData<PaginatedPost>>(
      repliesKey,
      addPostToPaginatedPost(newPost),
    )
  }
  /** Add reply to the pinned posts */
  const pinnedPostsSnapshot =
    queryClient.getQueriesData<InfiniteData<Post>>(pinnedPostsFilter)
  if (pinnedPostsSnapshot) {
    queryClient.setQueriesData<Post[]>(pinnedPostsFilter, oldPosts =>
      oldPosts.map(
        infinitePostArrayUpdater(postId, postRepliesUpdater(newPost), false),
      ),
    )
  }

  /**  Add the reply to Post.replies in any posts/feed queries which the parent post exists */
  // get all active posts query
  const postsQueryFilter: QueryFilters = {
    active: true,
    predicate: query => {
      const [main, args] = query?.queryKey || []
      if (
        (args as any)?.postId !== postId &&
        (main === FEED_KEY || main === POSTS_KEY)
      ) {
        return true
      }
      return false
    },
  }

  // take a snapshot from all matched posts queries
  const postsSnapshots =
    queryClient.getQueriesData<InfiniteData<PaginatedPost>>(postsQueryFilter)

  // update replies within the found post everywhere (posts and the feed queries)
  queryClient.setQueriesData<InfiniteData<PaginatedPost>>(
    postsQueryFilter,
    infinitePostUpdater(postId, postRepliesUpdater(newPost), false),
  )

  return {
    postsSnapshots,
    rootPostSnapshot,
    repliesSnapshot,
    pinnedPostsSnapshot,
  }
}

export const useAddReply = (options?: {
  fields?: PostFields
  useMutationOptions?: UseMutationOptions<
    Post,
    ClientError,
    MutationCreateReplyArgs,
    Snapshot
  >
}) => {
  const { useMutationOptions, fields = 'default' } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const addReplyKey = getAddReplyKey()

  return useMutation<Post, ClientError, MutationCreateReplyArgs, Snapshot>(
    (input: MutationCreateReplyArgs) =>
      client.posts.reply(input.postId, input, fields),

    {
      mutationKey: addReplyKey,
      onSuccess: (data, variables) => {
        onAddReply(variables, data, queryClient)
      },
      ...useMutationOptions,
    },
  )
}
