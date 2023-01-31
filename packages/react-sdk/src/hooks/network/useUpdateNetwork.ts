import { NetworkFields } from '@tribeplatform/gql-client'
import {
  Network,
  MutationUpdateNetworkArgs,
  AuthToken,
} from '@tribeplatform/gql-client/types'

import { useQueryClient, useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getAuthTokensKey,
  getNetworkKey,
  getUpdateNetworkKey,
} from '../../utils/keys'

export const useUpdateNetwork = (options?: {
  fields?: NetworkFields
  useMutationOptions?: UseMutationOptions<
    Network,
    Error,
    MutationUpdateNetworkArgs,
    { snapshot: Network }
  >
}) => {
  const { useMutationOptions, fields } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const networkKey = getNetworkKey()
  const updateNetworkKey = getUpdateNetworkKey()
  const authTokenKey = getAuthTokensKey()

  return useMutation<
    Network,
    Error,
    MutationUpdateNetworkArgs,
    { snapshot: Network }
  >(
    (input: MutationUpdateNetworkArgs) => client.network.update(input, fields),
    {
      onMutate: async variables => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(networkKey)

        // Snapshot the previous value
        const snapshot = queryClient.getQueryData<Network>(networkKey)

        // Optimistically update to the new value
        // TODO: this is wrong, variables type is not Network, we should spread variables.input
        queryClient.setQueryData<Network>(networkKey, old => ({
          ...old,
          ...variables,
        }))

        // TODO: find a way to automatically update the network
        queryClient.setQueriesData<AuthToken>(authTokenKey, old => ({
          ...old,
          network: {
            ...old.network,
            hideDefaultAuthenticationForm:
              variables.input.hideDefaultAuthenticationForm,
          },
        }))

        // Return a context object with the snapshotted value
        return { snapshot }
      },
      onSuccess: data => {
        queryClient.setQueryData<Network>(networkKey, oldData => ({
          ...oldData,
          ...data,
        }))
      },
      onError: (err, newNetwork, context) => {
        // revert back the optimistic response
        queryClient.setQueryData<Network>(networkKey, context.snapshot)
      },
      onSettled: () => {
        // Re-fetch the network
        queryClient.invalidateQueries(networkKey)

        // Re-fetch the auth tokens
        queryClient.invalidateQueries(authTokenKey)
      },
      mutationKey: updateNetworkKey,
      ...useMutationOptions,
    },
  )
}
