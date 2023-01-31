import isEqual from 'react-fast-compare'

import { MemberFields } from '@tribeplatform/gql-client'
import { AuthToken, Member, RoleType } from '@tribeplatform/gql-client/types'

import { useQuery, UseQueryOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAuthTokensKey, getAuthMemberKey } from '../../utils/keys'

export const useAuthMember = (options?: {
  useQueryOptions?: UseQueryOptions<Member>
  fields: MemberFields
}) => {
  const queryClient = useQueryClient()
  const { useQueryOptions, fields = 'default' } = options || {}
  const { client } = useTribeClient()
  const authMemberKey = getAuthMemberKey()
  const authTokenKey = getAuthTokensKey()

  const query = useQuery<Member>(
    authMemberKey,
    () => client.auth.authMember(fields),
    {
      isDataEqual: isEqual,
      initialData: () => {
        return queryClient.getQueryData<AuthToken>(authTokenKey)?.member
      },
      ...useQueryOptions,
    },
  )

  const member = query?.data
  const isAdmin = member?.role?.type === RoleType.ADMIN
  const isModerator =
    member?.role?.type === RoleType.MODERATOR ||
    member?.role?.type === RoleType.ADMIN
  const isGuest = !member || member?.role?.type === RoleType.GUEST

  return {
    isAdmin,
    isGuest,
    isModerator,
    ...query,
  }
}
