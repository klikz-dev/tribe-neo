import { ClientError } from '@tribeplatform/gql-client'
import {
  AuthToken,
  MutationJoinNetworkArgs,
  MutationJoinNetworkWithInvitationLinkArgs,
  MutationJoinNetworkWithTokenArgs,
} from '@tribeplatform/gql-client/types'
import { UseMutationOptions } from '@tribeplatform/react-sdk/lib'

import {
  useJoinNetwork,
  useJoinNetworkWithLink,
  useJoinNetworkWithToken,
} from '../auth'

type Variables =
  | MutationJoinNetworkArgs
  | MutationJoinNetworkWithTokenArgs
  | MutationJoinNetworkWithInvitationLinkArgs

export const useSignup = (props?: {
  invitationToken?: string
  invitationLinkId?: string
}) => {
  const { invitationToken, invitationLinkId } = props
  const joinNetworkMutation = useJoinNetwork()
  const joinNetworkWithTokenMutation = useJoinNetworkWithToken()
  const joinNetworkWithLinkMutation = useJoinNetworkWithLink()

  const signupAsync = (
    variables: Variables,
    useMutationOptions?: UseMutationOptions<
      AuthToken,
      ClientError,
      Variables,
      { snapshot: AuthToken }
    >,
  ) => {
    if (invitationLinkId) {
      return joinNetworkWithLinkMutation.mutateAsync(
        {
          input: { ...variables.input, invitationLinkId },
        } as MutationJoinNetworkWithInvitationLinkArgs,
        useMutationOptions,
      )
    }
    if (invitationToken) {
      delete (variables.input as any).email
      return joinNetworkWithTokenMutation.mutateAsync(
        {
          input: { ...variables.input, token: invitationToken },
        } as MutationJoinNetworkWithTokenArgs,
        useMutationOptions,
      )
    }

    return joinNetworkMutation.mutateAsync(
      variables as MutationJoinNetworkArgs,
      useMutationOptions,
    )
  }

  return {
    mutateAsync: signupAsync,
    isLoading:
      joinNetworkMutation.isLoading ||
      joinNetworkWithLinkMutation.isLoading ||
      joinNetworkWithTokenMutation.isLoading,
  }
}
