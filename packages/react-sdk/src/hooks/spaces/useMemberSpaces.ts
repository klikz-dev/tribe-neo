import { SpaceMemberFields } from '@tribeplatform/gql-client/graphql'
import {
  QueryMemberSpacesArgs,
  PaginatedSpaceMember,
} from '@tribeplatform/gql-client/types'

import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '../../lib/useInfiniteQuery'
import { useTribeClient } from '../../useTribeClient'
import { getSpacesKey } from '../../utils/keys'

export const useMemberSpaces = (options?: {
  variables?: QueryMemberSpacesArgs
  fields?: SpaceMemberFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<PaginatedSpaceMember>
}) => {
  const {
    variables,
    fields = { space: 'basic', member: 'basic', role: 'basic' },
    useInfiniteQueryOptions,
  } = options || {}
  const { client } = useTribeClient()
  const spacesKey = getSpacesKey(variables)

  return useInfiniteQuery<PaginatedSpaceMember>(
    spacesKey,
    ({ pageParam: after }) =>
      client?.spaceMembers.listSpaces({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}
