import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationApproveSpaceMembershipRequestArgs,
  SpaceJoinRequestStatus,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getApproveSpaceMembershipRequestKey,
  getSpaceMembershipRequest,
} from '../../utils/keys'

export const useApproveSpaceMembershipRequest = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationApproveSpaceMembershipRequestArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    Action,
    ClientError,
    MutationApproveSpaceMembershipRequestArgs
  >(variables => client.spaceMembership.approveRequest(variables), {
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
