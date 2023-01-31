import { ClientError, MemberFields } from '@tribeplatform/gql-client'
import {
  Member,
  MutationUpdateMemberArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getMemberKey, getMembersKey } from '../../utils/keys'
import {
  getAuthTokensKey,
  getAuthMemberKey,
} from '../../utils/keys/authToken.keys'
import { useAuthMember } from '../auth/useAuthMember'

export const useUpdateMember = (options?: {
  fields?: MemberFields
  useMutationOptions?: UseMutationOptions<
    Member,
    ClientError,
    MutationUpdateMemberArgs,
    { snapshot: Member }
  >
}) => {
  const { useMutationOptions, fields = 'default' } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const { data: authMember } = useAuthMember()

  return useMutation<
    Member,
    ClientError,
    MutationUpdateMemberArgs,
    { snapshot: Member }
  >((input: MutationUpdateMemberArgs) => client.members.update(input, fields), {
    onMutate: async newMember => {
      const memberKey = getMemberKey({ id: newMember.id })
      await queryClient.cancelQueries(memberKey)
      const snapshot = queryClient.getQueryData<Member>(memberKey)

      queryClient.setQueriesData<Member>(memberKey, old => ({
        ...old,
        ...newMember,
      }))

      return { snapshot }
    },
    onSuccess: (updatedMember, vars, context) => {
      const memberKey = getMemberKey({ id: updatedMember.id })
      queryClient.setQueryData<Member>(memberKey, oldMember => ({
        ...oldMember,
        ...updatedMember,
      }))
      if (authMember.id === updatedMember.id) {
        queryClient.invalidateQueries(getAuthMemberKey())
      }
      useMutationOptions?.onSuccess?.(updatedMember, vars, context)
    },
    onError: (err, newMember, context) => {
      const memberKey = getMemberKey({ id: newMember.id })
      queryClient.setQueryData<Member>(memberKey, context.snapshot)

      queryClient.invalidateQueries(memberKey)

      useMutationOptions?.onError?.(err, newMember, context)
    },
    onSettled: () => {
      const membersKey = getMembersKey()
      const authTokenKey = getAuthTokensKey()
      queryClient.invalidateQueries(membersKey)
      queryClient.invalidateQueries(authTokenKey)
    },
    ...useMutationOptions,
  })
}
