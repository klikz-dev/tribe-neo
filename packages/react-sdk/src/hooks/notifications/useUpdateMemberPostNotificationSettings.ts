import { InfiniteData, QueryKey } from 'react-query'

import { ClientError } from '@tribeplatform/gql-client'
import {
  MemberPostNotificationSettings,
  MutationUpdateMemberPostNotificationSettingsArgs,
  PaginatedPost,
  Post,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getMemberPostNotificationSettingsKey,
  getPostKey,
} from '../../utils/keys'
import {
  infinitePostUpdater,
  infinitePostArrayUpdater,
} from '../cache/useCachedPost'
import { pinnedPostsFilter, postsQueryFilter } from '../posts/filters'

type Snapshot = {
  snapshot: MemberPostNotificationSettings
  postSnapshot: Post
  postsSnapshots: [QueryKey, InfiniteData<PaginatedPost>][]
  pinnedPostsSnapshot: [QueryKey, InfiniteData<Post>][]
}

const updater =
  (memberPostNotificationSettingsEnabled: boolean) => (oldPost: Post) => ({
    ...oldPost,
    authMemberProps: {
      ...oldPost.authMemberProps,
      memberPostNotificationSettingsEnabled,
    },
  })

export const useUpdateMemberPostNotificationSettings = (options?: {
  useMutationOptions?: UseMutationOptions<
    MemberPostNotificationSettings,
    ClientError,
    MutationUpdateMemberPostNotificationSettingsArgs,
    Snapshot
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    MemberPostNotificationSettings,
    ClientError,
    MutationUpdateMemberPostNotificationSettingsArgs,
    Snapshot
  >(
    (input: MutationUpdateMemberPostNotificationSettingsArgs) =>
      client.notifications.updateMemberPostNotificationSettings(input),
    {
      onMutate: async newMemberPostNotificationSettings => {
        const { postId, input } = newMemberPostNotificationSettings
        const memberPostNotificationSettingsKey =
          getMemberPostNotificationSettingsKey({
            postId: newMemberPostNotificationSettings?.postId,
          })
        await queryClient.cancelQueries(memberPostNotificationSettingsKey)
        const snapshot =
          queryClient.getQueryData<MemberPostNotificationSettings>(
            memberPostNotificationSettingsKey,
          )

        queryClient.setQueryData<MemberPostNotificationSettings>(
          memberPostNotificationSettingsKey,
          oldMemberPostNotificationSettings => ({
            ...oldMemberPostNotificationSettings,
            ...newMemberPostNotificationSettings,
          }),
        )

        const postKey = getPostKey(postId)

        const postSnapshot = queryClient.getQueryData<Post>(postKey)

        if (postSnapshot) {
          queryClient.setQueryData<Post>(postKey, updater(input.enabled))
        }
        const pinnedPostsSnapshot =
          queryClient.getQueriesData<InfiniteData<Post>>(pinnedPostsFilter)
        if (pinnedPostsSnapshot) {
          queryClient.setQueriesData<Post[]>(pinnedPostsFilter, oldPosts =>
            oldPosts.map(
              infinitePostArrayUpdater(postId, updater(input.enabled), true),
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
          infinitePostUpdater(postId, updater(input.enabled), false),
        )

        return { snapshot, postsSnapshots, pinnedPostsSnapshot, postSnapshot }
      },
      onError: (err, newMemberPostNotificationSettings, context) => {
        const { postId } = newMemberPostNotificationSettings
        const memberPostNotificationSettingsKey =
          getMemberPostNotificationSettingsKey({
            postId,
          })

        queryClient.invalidateQueries(memberPostNotificationSettingsKey)
        if (context.postSnapshot) {
          const postKey = getPostKey(postId)
          queryClient.setQueryData(postKey, context.postSnapshot)
        }
        if (context.pinnedPostsSnapshot) {
          context.pinnedPostsSnapshot.forEach(([queryKey, snapshot]) => {
            queryClient.setQueryData(queryKey, snapshot)
          })
        }
        if (context.postsSnapshots) {
          context.postsSnapshots.forEach(([queryKey, snapshot]) => {
            queryClient.setQueryData(queryKey, snapshot)
          })
        }
      },
      ...useMutationOptions,
    },
  )
}
