import {
  Types,
  MemberFields,
  SpaceMemberFields,
} from '@tribeplatform/gql-client'

import { UseInfiniteQueryOptions, useInfiniteQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getMembersKey } from '../../utils/keys'

export const DefaultMembersLimit = 10

export const useMembers = (options?: {
  variables?: Types.QueryMembersArgs
  fields?: MemberFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<Types.PaginatedMember>
}) => {
  const {
    variables = { limit: DefaultMembersLimit },
    fields = 'basic',
    useInfiniteQueryOptions,
  } = options || {}
  const { client } = useTribeClient()
  const membersKey = getMembersKey(variables)

  return useInfiniteQuery<Types.PaginatedMember>(
    membersKey,
    ({ pageParam: after }) =>
      client?.members.list({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}

export const useSpaceMembers = (options?: {
  variables?: Types.QuerySpaceMembersArgs
  fields?: SpaceMemberFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<Types.PaginatedSpaceMember>
}) => {
  const { variables, fields = 'basic', useInfiniteQueryOptions } = options || {}
  const { client } = useTribeClient()
  const spacesKey = getMembersKey(variables)

  return useInfiniteQuery<Types.PaginatedSpaceMember>(
    spacesKey,
    ({ pageParam: after }) =>
      client?.spaceMembers.listMembers({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}
