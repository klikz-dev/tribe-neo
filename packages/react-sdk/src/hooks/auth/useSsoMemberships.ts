import {
  SsoMembership,
  QuerySsoMembershipsArgs,
} from '@tribeplatform/gql-client/types'

import { useQuery, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getSsoMembershipKey } from '../../utils/keys'

export const useSsoMemberships = (options?: {
  variables: QuerySsoMembershipsArgs
  useQueryOptions?: UseQueryOptions<SsoMembership[]>
}) => {
  const { useQueryOptions, variables } = options || {}
  const { client } = useTribeClient()
  const ssoMembershipKey = getSsoMembershipKey()

  return useQuery<SsoMembership[]>(
    ssoMembershipKey,
    () => client.auth.ssoMemberships(variables),
    useQueryOptions,
  )
}
