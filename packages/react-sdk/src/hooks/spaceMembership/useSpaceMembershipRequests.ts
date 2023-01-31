import { UseQueryOptions } from 'react-query'

import { SpaceJoinRequestFields } from '@tribeplatform/gql-client'
import {
  SpaceJoinRequest,
  QuerySpaceMembershipRequestsArgs,
} from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getSpaceMembershipRequest } from '../../utils/keys'

export const useSpaceMembershipRequests = (options: {
  variables: QuerySpaceMembershipRequestsArgs
  fields?: SpaceJoinRequestFields
  useQueryOptions?: UseQueryOptions<Array<SpaceJoinRequest>>
}) => {
  const { variables, fields = 'basic', useQueryOptions } = options
  const { client } = useTribeClient()
  const key = getSpaceMembershipRequest(variables)

  return useQuery<Array<SpaceJoinRequest>>(
    key,
    () => client.spaceMembership.getRequests(variables, fields),
    {
      ...useQueryOptions,
    },
  )
}
