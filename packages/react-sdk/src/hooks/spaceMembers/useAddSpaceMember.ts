import { ClientError } from '@tribeplatform/gql-client'
import {
  MutationAddSpaceMembersArgs,
  SpaceMember,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getMembersKey } from '../../utils/keys'

export const useAddSpaceMember = (options?: {
  useMutationOptions?: UseMutationOptions<
    Array<SpaceMember>,
    ClientError,
    MutationAddSpaceMembersArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    Array<SpaceMember>,
    ClientError,
    MutationAddSpaceMembersArgs
  >(input => client.spaceMembers.add(input), {
    onSettled: (data, error, variables) => {
      const membersKey = getMembersKey({
        spaceId: variables.spaceId,
        limit: undefined,
      })
      queryClient.invalidateQueries(membersKey)
    },
    ...useMutationOptions,
  })
}
