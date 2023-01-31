import { InfiniteData, QueryKey } from 'react-query'

import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationRemoveReactionArgs,
  PaginatedPost,
  Post,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getPostKey } from '../../utils/keys'
import { useAuthMember } from '../auth'
import {
  infinitePostUpdater,
  removeReactionFromPost,
  infinitePostArrayUpdater,
} from '../cache/useCachedPost'
import { pinnedPostsFilter, postsQueryFilter } from './filters'

type Snapshot = {
  postSnapshot: Post
  pinnedPostsSnapshot: [QueryKey, InfiniteData<Post>][]
  postsSnapshots: [QueryKey, InfiniteData<PaginatedPost>][]
}

export const useRemoveReaction = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationRemoveReactionArgs,
    Snapshot
  >
}) => {
  const queryClient = useQueryClient()
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const { data: authMember } = useAuthMember()

  return useMutation<Action, ClientError, MutationRemoveReactionArgs, Snapshot>(
    (input: MutationRemoveReactionArgs) => client.posts.removeReaction(input),

    {
      onMutate: async variables => {
        const { reaction, postId } = variables
        const postKey = getPostKey(postId)
        await queryClient.cancelQueries(postKey)

        const postSnapshot = queryClient.getQueryData<Post>(postKey)

        if (postSnapshot) {
          queryClient.setQueryData<Post>(
            postKey,
            removeReactionFromPost(reaction, authMember.id),
          )
        }

        const pinnedPostsSnapshot =
          queryClient.getQueriesData<InfiniteData<Post>>(pinnedPostsFilter)
        if (pinnedPostsSnapshot) {
          queryClient.setQueriesData<Post[]>(pinnedPostsFilter, oldPosts =>
            oldPosts.map(
              infinitePostArrayUpdater(
                postId,
                removeReactionFromPost(reaction, authMember.id),
                true,
              ),
            ),
          )
        }

        // take a snapshot from all matched posts queries
        const postsSnapshots =
          queryClient.getQueriesData<InfiniteData<PaginatedPost>>(
            postsQueryFilter,
          )

        // update posts and replies within the found post everywhere (posts and the feed queries)
        queryClient.setQueriesData<InfiniteData<PaginatedPost>>(
          postsQueryFilter,
          infinitePostUpdater(
            postId,
            removeReactionFromPost(reaction, authMember.id),
            true,
          ),
        )

        return {
          postSnapshot,
          postsSnapshots,
          pinnedPostsSnapshot,
        }
      },
      onError: (error, variables, context) => {
        if (context.postSnapshot) {
          const postKey = getPostKey(variables.postId)
          queryClient.setQueryData(postKey, context.postSnapshot)
        }
        if (context.pinnedPostsSnapshot) {
          context.pinnedPostsSnapshot.forEach(([queryKey, snapshot]) => {
            queryClient.setQueryData(queryKey, snapshot)
          })
        }
        context.postsSnapshots.forEach(([queryKey, snapshot]) => {
          queryClient.setQueryData(queryKey, snapshot)
        })
      },
      ...useMutationOptions,
    },
  )
}
