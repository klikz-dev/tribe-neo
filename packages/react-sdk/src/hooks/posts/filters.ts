import { QueryFilters } from 'react-query/types/core/utils'

import { PINNED_POSTS_KEY, FEED_KEY, POSTS_KEY } from '../../utils/keys'

// get all active/inactive posts queries
export const postsQueryFilter: QueryFilters = {
  predicate: query => {
    const { state, queryKey } = query
    const [main] = queryKey || []
    if (
      (main === FEED_KEY || main === POSTS_KEY) &&
      Array.isArray((state?.data as any)?.pages) // checking if the disabled(inactive) query actually has data to update or not
    ) {
      return true
    }
    return false
  },
}
export const pinnedPostsFilter: QueryFilters = {
  predicate: query => {
    const queryMainKey = query?.queryKey?.[0]
    if (queryMainKey === PINNED_POSTS_KEY) {
      return true
    }
    return false
  },
}

// to get one replies/posts query with a specific id
export const getPostsQueryById: (postId: string) => QueryFilters = postId => ({
  predicate: query => {
    const { state, queryKey } = query
    const [main, args] = queryKey || []
    if (
      main === POSTS_KEY &&
      (args as any)?.postId === postId &&
      Array.isArray((state?.data as any)?.pages) // checking if the disabled(inactive) query actually has data to update or not
    ) {
      return true
    }
    return false
  },
})
