import { useMemo } from 'react'

import produce from 'immer'
import { InfiniteData, QueryClient } from 'react-query'
import { QueryFilters } from 'react-query/types/core/utils'

import {
  PaginatedPost,
  Post,
  PostReactionDetail,
  Scalars,
} from '@tribeplatform/gql-client/types'

import { useQueryClient } from '../../lib'
import { POSTS_KEY, FEED_KEY, PINNED_POSTS_KEY } from '../../utils/keys'

export const getCachedRootPost = (id, queryClient): Post | undefined => {
  const post = getCachedPost(id, queryClient)
  if (post?.repliedToId) return getCachedRootPost(post.repliedToId, queryClient)
  if (post?.repliedToId === null) return post

  return undefined
}

export const getCachedPost = (
  id,
  queryClient: QueryClient,
): Post | undefined => {
  if (!id) return undefined

  // get all posts and feed queries
  const postsQueryFilter: QueryFilters = {
    predicate: query => {
      const queryMainKey = query?.queryKey?.[0]
      if (
        queryMainKey === FEED_KEY ||
        queryMainKey === POSTS_KEY ||
        queryMainKey === PINNED_POSTS_KEY
      ) {
        return true
      }
      return false
    },
  }
  let cachedPost
  const data =
    queryClient.getQueriesData<InfiniteData<PaginatedPost>>(postsQueryFilter)

  data.forEach(([_, queryData]) => {
    if (Array.isArray(queryData)) {
      queryData.forEach(post => {
        if (post?.id === id) {
          cachedPost = post
        }

        if (post?.replies && !cachedPost) {
          post?.replies?.nodes?.forEach(postReply => {
            if (postReply.id === id) {
              cachedPost = postReply
            }
          })
        }
      })

      // if queryData is paginated list
    } else if (!cachedPost) {
      queryData?.pages?.forEach(page => {
        page?.nodes?.forEach(post => {
          if (post?.id === id) {
            cachedPost = post
          }

          if (post?.replies && !cachedPost) {
            post?.replies?.nodes?.forEach(postReply => {
              if (postReply.id === id) {
                cachedPost = postReply
              }
            })
          }
        })
      })
    }
  })

  return cachedPost
}

export const useCachedPost = (id: Scalars['ID']): Post | undefined => {
  const queryClient = useQueryClient()
  return useMemo(() => getCachedPost(id, queryClient), [id, queryClient])
}

export const addPostToPaginatedPost =
  (newPost: Post) => (oldPosts: InfiniteData<PaginatedPost>) => {
    return produce(oldPosts, draft => {
      if (!draft?.pages) {
        draft = {
          pageParams: [],
          pages: [
            {
              pageInfo: {
                hasNextPage: false,
              },
              nodes: [],
              edges: [],
              totalCount: 0,
            },
          ],
        }
      }
      draft.pages[0].edges.unshift({ node: newPost, cursor: '' })
      draft.pages[0].nodes.unshift(newPost)
      draft.pages[0].totalCount += 1

      return draft
    })
  }

export const postRepliesUpdater = (node: Post) => (pn: Post) => ({
  ...pn,
  repliesCount: pn.repliesCount + 1,
  totalRepliesCount: pn.totalRepliesCount + 1,
  replies: {
    ...pn.replies,
    totalCount: (pn.replies?.totalCount || 0) + 1,
    nodes: [node, ...(pn.replies?.nodes || [])],
    edges: [{ node, cursor: '' }, ...(pn.replies?.edges || [])],
  },
})

export const infinitePostUpdater =
  (postId: string, updater: (oldPost: Post) => Post, checkReplies = false) =>
  (oldFeed: InfiniteData<PaginatedPost>) => ({
    ...oldFeed,
    pages: oldFeed?.pages?.map(
      infinitePaginatedPostWithRepliesUpdater(postId, updater, checkReplies),
    ),
  })

export const infinitePaginatedPostWithRepliesUpdater =
  (postId: string, updater: (oldPost: Post) => Post, checkReplies = false) =>
  (posts: PaginatedPost): PaginatedPost => {
    return {
      ...posts,
      nodes: posts.nodes?.map(infinitePostArrayUpdater(postId, updater)),
      edges: posts.edges?.map(e => {
        let newNode = e.node
        if (e.node.id === postId) {
          newNode = updater(e.node)
        }
        return {
          ...e,
          node: {
            ...newNode,
            ...(checkReplies && {
              replies:
                e.node.replies &&
                infinitePaginatedPostWithRepliesUpdater(
                  postId,
                  updater,
                )(e.node.replies),
            }),
          },
        }
      }),
    }
  }

export const infinitePostArrayUpdater =
  (postId: string, updater: (oldPost: Post) => Post, checkReplies = true) =>
  (post: Post): Post => {
    let newNode = post
    if (post.id === postId) {
      newNode = updater(post)
    }
    return {
      ...newNode,
      ...(checkReplies && {
        replies:
          post.replies &&
          infinitePaginatedPostWithRepliesUpdater(
            postId,
            updater,
          )(post.replies),
      }),
    }
  }

export const removeReactionFromPost =
  (reaction: string, memberId: string) =>
  (old: Post): Post => {
    const newReactions: PostReactionDetail[] = old.reactions.reduce(
      (acc, currReaction) => {
        if (currReaction.reaction === reaction) {
          const modifiedReaction: PostReactionDetail = {
            ...currReaction,
            reacted: false,
            count: currReaction.count - 1,
            participants: {
              ...currReaction.participants,
              totalCount: currReaction.participants?.totalCount - 1,
              nodes: currReaction.participants?.nodes?.filter(
                node => node.participant?.id !== memberId,
              ),
              edges: currReaction.participants?.edges?.filter(
                ({ node }) => node.participant?.id !== memberId,
              ),
            },
          }

          if (modifiedReaction.count > 0) {
            acc.push(modifiedReaction)
          }
        } else {
          acc.push(currReaction)
        }
        return acc
      },
      [],
    )

    return {
      ...old,
      reactions: newReactions,
      reactionsCount: old.reactionsCount - 1,
    }
  }

export const addReactionToPost =
  (reaction, userReaction) =>
  (old: Post): Post => {
    const currentReactionIndex = old.reactions.findIndex(
      r => r.reaction === reaction,
    )
    let newReaction: PostReactionDetail = {
      participants: {
        edges: [],
        nodes: [],
        pageInfo: {
          endCursor: '',
          hasNextPage: false,
        },
        totalCount: 0,
      },
      reacted: true,
      count: 0,
      reaction,
    }
    if (currentReactionIndex > -1) {
      newReaction = { ...old.reactions[currentReactionIndex] }
    }
    newReaction.reacted = true
    newReaction.count += 1

    if (!newReaction?.participants) {
      newReaction.participants = {
        totalCount: 0,
        nodes: [],
        edges: [],
        pageInfo: {
          hasNextPage: false,
        },
      }
    }
    newReaction.participants.totalCount += 1
    newReaction.participants?.nodes?.push(userReaction)
    newReaction.participants?.edges?.push({
      node: userReaction,
      cursor: '',
    })
    const newReactions: PostReactionDetail[] =
      currentReactionIndex > -1
        ? old.reactions.map(r => (r.reaction === reaction ? newReaction : r))
        : [newReaction, ...old.reactions]
    return {
      ...old,
      reactions: newReactions,
      reactionsCount: old.reactionsCount + 1,
    }
  }
