import { TagFields } from '@tribeplatform/gql-client'
import { PaginatedTag, QueryTagsArgs } from '@tribeplatform/gql-client/types'

import { UseInfiniteQueryOptions, useInfiniteQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getTagsKey } from '../../utils/keys'

export const useSpaceTags = (options: {
  variables: QueryTagsArgs
  fields?: TagFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<PaginatedTag>
}) => {
  const { variables, fields = 'basic', useInfiniteQueryOptions } = options || {}
  const { client } = useTribeClient()
  const tagsKey = getTagsKey(variables)

  return useInfiniteQuery<PaginatedTag>(
    tagsKey,
    ({ pageParam: after }) => client.tags.list({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}
