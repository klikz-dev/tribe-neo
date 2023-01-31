import { UseQueryOptions } from 'react-query'

import { PostFields } from '@tribeplatform/gql-client'
import { Post, Scalars } from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getPostKey } from '../../utils/keys'
import { useCachedPost } from '../cache'

export const usePost = (options: {
  id: Scalars['ID']
  fields?: PostFields
  useQueryOptions?: UseQueryOptions<Post>
}) => {
  const { id, fields = 'default', useQueryOptions } = options
  const { client } = useTribeClient()
  const postKey = getPostKey(id)
  const placeHolderPost = useCachedPost(id)

  return useQuery<Post>(postKey, () => client.posts.get(id, fields), {
    placeholderData: (): Post => placeHolderPost,
    ...useQueryOptions,
  })
}
