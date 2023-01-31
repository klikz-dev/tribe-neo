import {
  MemberInvitationLink,
  QueryInvitationLinkValidityArgs,
} from '@tribeplatform/gql-client/types'

import { useQuery, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getMemberInvitationLinkValidity } from '../../utils/keys'

export const useValidateLink = (options?: {
  variables: QueryInvitationLinkValidityArgs
  useQueryOptions?: UseQueryOptions<MemberInvitationLink>
}) => {
  const { useQueryOptions, variables } = options || {}
  const { client } = useTribeClient()
  const memberInvitationLinkValidityKey = getMemberInvitationLinkValidity(
    variables.id,
  )

  return useQuery<MemberInvitationLink>(
    memberInvitationLinkValidityKey,
    () => client.invitations.validateLink(variables),
    useQueryOptions,
  )
}
