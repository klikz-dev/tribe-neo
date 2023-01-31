import { ClientError } from '@tribeplatform/gql-client'
import {
  MutationRequestSpaceMembershipArgs,
  SpaceJoinRequest,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getSpaceKey,
  getRequestSpaceMembershipKey,
  getMemberSpaceMembershipRequest,
} from '../../utils/keys'

export const useRequestSpaceMembership = (options?: {
  useMutationOptions?: UseMutationOptions<
    SpaceJoinRequest,
    ClientError,
    MutationRequestSpaceMembershipArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    SpaceJoinRequest,
    ClientError,
    MutationRequestSpaceMembershipArgs
  >(
    (input: MutationRequestSpaceMembershipArgs) =>
      client.spaceMembership.request(input),
    {
      onSettled: (data, error, variables) => {
        const spaceKey = getSpaceKey({ id: variables.spaceId })
        queryClient.invalidateQueries(spaceKey)
        queryClient.invalidateQueries(getMemberSpaceMembershipRequest())
      },
      mutationKey: getRequestSpaceMembershipKey(),
      ...useMutationOptions,
    },
  )
}
