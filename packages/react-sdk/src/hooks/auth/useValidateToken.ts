import { MemberInvitationFields } from '@tribeplatform/gql-client/graphql'
import {
  MemberInvitation,
  QueryMemberInvitationValidityArgs,
} from '@tribeplatform/gql-client/types'

import { useQuery, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getMemberInvitationValidity } from '../../utils/keys'

export const useValidateToken = (options?: {
  variables: QueryMemberInvitationValidityArgs
  fields?: MemberInvitationFields
  useQueryOptions?: UseQueryOptions<MemberInvitation>
}) => {
  const { useQueryOptions, fields, variables } = options || {}
  const { client } = useTribeClient()
  const memberInvitationValidityKey = getMemberInvitationValidity(
    variables.token,
  )

  return useQuery<MemberInvitation>(
    memberInvitationValidityKey,
    () => client.invitations.validate(variables, fields),
    useQueryOptions,
  )
}
