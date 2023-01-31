import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationDeleteMemberArgs,
  ActionFields,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getMembersKey,
  getDeleteMemberKey,
  getMemberKey,
} from '../../utils/keys'

export const useDeleteMember = (options?: {
  fields?: ActionFields
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationDeleteMemberArgs
  >
}) => {
  const { useMutationOptions, fields = 'basic' } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<Action, ClientError, MutationDeleteMemberArgs>(
    (input: MutationDeleteMemberArgs) => client.members.delete(input, fields),
    {
      onSettled: (data, error, input) => {
        const memberKey = getMemberKey({ id: input.id })
        queryClient.removeQueries(memberKey)

        const membersKey = getMembersKey()
        queryClient.invalidateQueries(membersKey)
      },
      mutationKey: getDeleteMemberKey(),
      ...useMutationOptions,
    },
  )
}
