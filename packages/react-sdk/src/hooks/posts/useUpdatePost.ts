import { PostFields, ClientError } from '@tribeplatform/gql-client'
import { MutationUpdatePostArgs, Post } from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getFeedKey,
  getPostKey,
  getPostsKey,
  getUpdatePostKey,
} from '../../utils/keys'
import { getPostsQueryById } from './filters'

export const useUpdatePost = (options?: {
  fields?: PostFields
  useMutationOptions?: UseMutationOptions<
    Post,
    ClientError,
    MutationUpdatePostArgs,
    { snapshot: Post }
  >
}) => {
  const { useMutationOptions, fields = 'withReply' } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    Post,
    ClientError,
    MutationUpdatePostArgs,
    { snapshot: Post }
  >((input: MutationUpdatePostArgs) => client.posts.update(input, fields), {
    onMutate: async newPost => {
      const postKey = getPostKey(newPost.id)
      await queryClient.cancelQueries(postKey)
      const snapshot = queryClient.getQueryData<Post>(postKey)

      queryClient.setQueryData<Post>(postKey, old => ({
        ...old,
        ...newPost,
      }))

      return { snapshot }
    },
    onSuccess: updatedPost => {
      const postKey = getPostKey(updatedPost.id)
      queryClient.setQueryData<Post>(postKey, oldPost => ({
        ...oldPost,
        ...updatedPost,
      }))
    },
    onError: (err, newPost, context) => {
      const postKey = getPostKey(newPost.id)
      queryClient.setQueryData<Post>(postKey, context.snapshot)

      queryClient.invalidateQueries(postKey)
    },
    onSettled: data => {
      const parentPostId = data.repliedToId
      const postKey = getPostKey()
      queryClient.invalidateQueries(postKey)
      const postsKey = getPostsKey()
      queryClient.invalidateQueries(postsKey)
      const feedKey = getFeedKey()
      queryClient.invalidateQueries(feedKey)
      // we want to "refetch" only replies query if any
      // (invalidate does not work for disabled queries)
      // (replies withing a reply is a disabled query)
      if (parentPostId) {
        queryClient.refetchQueries(getPostsQueryById(parentPostId))
      }
    },
    mutationKey: getUpdatePostKey(),
    ...useMutationOptions,
  })
}
