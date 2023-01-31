import { UseQueryOptions } from 'react-query'

import { SpaceJoinRequestFields } from '@tribeplatform/gql-client'
import {
  QueryMemberSpaceMembershipRequestArgs,
  SpaceJoinRequest,
} from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getMemberSpaceMembershipRequest } from '../../utils/keys'

export const useMemberSpaceMembershipRequest = (options: {
  variables?: QueryMemberSpaceMembershipRequestArgs
  fields?: SpaceJoinRequestFields
  useQueryOptions?: UseQueryOptions<Array<SpaceJoinRequest>>
}) => {
  const { fields = 'basic', useQueryOptions, variables } = options
  const { client } = useTribeClient()
  const key = getMemberSpaceMembershipRequest()

  return useQuery<Array<SpaceJoinRequest>>(
    key,
    () => client.spaceMembership.getMemberRequests(variables, fields),
    {
      ...useQueryOptions,
    },
  )
}
