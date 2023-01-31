import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationDeclineSpaceMembershipRequestArgs,
  SpaceJoinRequestStatus,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getApproveSpaceMembershipRequestKey,
  getSpaceMembershipRequest,
} from '../../utils/keys'

export const useDeclineSpaceMembershipRequest = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationDeclineSpaceMembershipRequestArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    Action,
    ClientError,
    MutationDeclineSpaceMembershipRequestArgs
  >(variables => client.spaceMembership.declineRequest(variables), {
    mutationKey: getApproveSpaceMembershipRequestKey(),
    onSettled: (data, error, variables) => {
      const key = getSpaceMembershipRequest({
        spaceId: variables.spaceId,
        status: SpaceJoinRequestStatus.PENDING,
      })
      queryClient.invalidateQueries(key)
    },
    ...useMutationOptions,
  })
}
