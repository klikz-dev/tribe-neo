import { PostFields } from '@tribeplatform/gql-client'
import {
  Post,
  QuerySpacePinnedPostsArgs,
} from '@tribeplatform/gql-client/types'

import { useQuery, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getPinnedPostsKey } from '../../utils/keys'

export const usePinnedPosts = (options: {
  useQueryOptions?: UseQueryOptions<Post[]>
  variables?: QuerySpacePinnedPostsArgs
  fields?: PostFields
}) => {
  const { variables, fields = 'default', useQueryOptions } = options || {}
  const { client } = useTribeClient()
  const pinnedPostsKey = getPinnedPostsKey(variables)

  return useQuery<Post[]>(
    pinnedPostsKey,
    () => client?.spaces.pinnedPosts(variables, fields),
    useQueryOptions,
  )
}
