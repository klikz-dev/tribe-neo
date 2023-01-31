import { useMemo } from 'react'

import { Scalars, Member } from '@tribeplatform/gql-client/types'

import { useQueryClient } from '../../lib'
import { getPostKey } from '../../utils/keys'

const findMemberInPost = (id: Scalars['ID'], queryClient): Member => {
  const postKey = getPostKey()
  let cachedMember = null

  const queries = queryClient.getQueriesData({ queryKey: postKey })
  queries?.forEach(query => {
    const post = query[1] as { owner: { member: { id } } }
    if (post?.owner?.member?.id === id) {
      cachedMember = post.owner.member
    }
  })

  return cachedMember
}

export const useCachedMember = (id: Scalars['ID']): Member => {
  const queryClient = useQueryClient()
  return useMemo(() => findMemberInPost(id, queryClient), [id, queryClient])
}
