import { InfiniteData, QueryKey } from 'react-query'

import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationAddReactionArgs,
  PaginatedPost,
  Post,
  PostReactionParticipant,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getPostKey } from '../../utils/keys'
import { useAuthMember } from '../auth'
import {
  infinitePostUpdater,
  addReactionToPost,
  infinitePostArrayUpdater,
} from '../cache/useCachedPost'
import { pinnedPostsFilter, postsQueryFilter } from './filters'

type Snapshot = {
  postSnapshot: Post
  postsSnapshots: [QueryKey, InfiniteData<PaginatedPost>][]
  pinnedPostsSnapshot: [QueryKey, InfiniteData<Post>][]
}

export const useAddReaction = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationAddReactionArgs,
    Snapshot
  >
}) => {
  const queryClient = useQueryClient()
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const { data: authMember } = useAuthMember()
  const userReaction: PostReactionParticipant = {
    participant: {
      ...authMember,
    },
  }

  return useMutation<Action, ClientError, MutationAddReactionArgs, Snapshot>(
    (input: MutationAddReactionArgs) => client.posts.addReaction(input),

    {
      onMutate: async addReactionArgs => {
        const { reaction } = addReactionArgs.input
        const postKey = getPostKey(addReactionArgs.postId)
        await queryClient.cancelQueries(postKey)

        const postSnapshot = queryClient.getQueryData<Post>(postKey)

        if (postSnapshot) {
          queryClient.setQueryData<Post>(
            postKey,
            addReactionToPost(reaction, userReaction),
          )
        }
        const pinnedPostsSnapshot =
          queryClient.getQueriesData<InfiniteData<Post>>(pinnedPostsFilter)
        if (pinnedPostsSnapshot) {
          queryClient.setQueriesData<Post[]>(pinnedPostsFilter, oldPosts =>
            oldPosts.map(
              infinitePostArrayUpdater(
                addReactionArgs.postId,
                addReactionToPost(reaction, userReaction),
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
            addReactionArgs.postId,
            addReactionToPost(reaction, userReaction),
            true,
          ),
        )

        return {
          postSnapshot,
          pinnedPostsSnapshot,
          postsSnapshots,
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
