import {
  DomainTransferStatus,
  MutationUpdateNewDomainArgs,
  AuthToken,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAuthTokensKey } from '../../utils/keys'

export const useUpdateNewDomain = (options?: {
  useMutationOptions?: UseMutationOptions<
    DomainTransferStatus,
    Error,
    MutationUpdateNewDomainArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<DomainTransferStatus, Error, MutationUpdateNewDomainArgs>(
    input => client.network.updateNewDomain(input),
    {
      onMutate: variables => {
        const authTokenKey = getAuthTokensKey()
        queryClient.setQueriesData<AuthToken>(authTokenKey, old => ({
          ...old,
          network: {
            ...old.network,
            newDomain: variables.input.domain,
          },
        }))
      },
      onSettled: () => {
        const authTokenKey = getAuthTokensKey()
        queryClient.invalidateQueries(authTokenKey)
      },
      ...useMutationOptions,
    },
  )
}
