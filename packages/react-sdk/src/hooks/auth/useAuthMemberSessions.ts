import { Member } from '@tribeplatform/gql-client/types'

import { useQuery, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAuthMemberSessionsKey } from '../../utils/keys'

export const useAuthMemberSessions = (options?: {
  useQueryOptions?: UseQueryOptions<Member>
  fields: 'basic'
}) => {
  const { useQueryOptions, fields = 'basic' } = options || {}
  const { client } = useTribeClient()
  const authMemberSessionsKey = getAuthMemberSessionsKey()

  return useQuery<Member>(
    authMemberSessionsKey,
    () => client.auth.authMember({ activeSession: fields, sessions: fields }),
    {
      ...useQueryOptions,
    },
  )
}
