import { MemberFields } from '@tribeplatform/gql-client'
import {
  PaginatedPostReactionParticipant,
  QueryPostReactionParticipantsArgs,
} from '@tribeplatform/gql-client/types'

import { UseInfiniteQueryOptions, useInfiniteQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getPostReactionParticipantsKey } from '../../utils/keys'

export const usePostReactionParticipants = (options: {
  variables: QueryPostReactionParticipantsArgs
  fields?: MemberFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<PaginatedPostReactionParticipant>
}) => {
  const { variables, fields = 'basic', useInfiniteQueryOptions } = options || {}
  const { client } = useTribeClient()
  const postReactionParticipantsKey = getPostReactionParticipantsKey(variables)

  return useInfiniteQuery<PaginatedPostReactionParticipant>(
    postReactionParticipantsKey,
    ({ pageParam: after }) =>
      client?.posts.reactionParticipants({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}
