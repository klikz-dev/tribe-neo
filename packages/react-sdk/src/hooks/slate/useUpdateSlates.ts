import { SlateFields, Types } from '@tribeplatform/gql-client'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getAuthTokensKey,
  getNetworkKey,
  getUpdateSlatesKey,
} from '../../utils/keys'
import {
  authTokenUpdater,
  navigationSlateReducer,
  networkUpdater,
} from '../cache/useCachedNetwork'

export const useUpdateSlates = (options?: {
  fields?: SlateFields
  useMutationOptions?: UseMutationOptions<
    Types.Slate[],
    Error,
    Types.MutationUpdateSlatesArgs
  >
}) => {
  const { useMutationOptions, fields } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const networkKey = getNetworkKey()
  const authTokenKey = getAuthTokensKey()
  const updateSlatesKey = getUpdateSlatesKey()

  return useMutation<Types.Slate[], Error, Types.MutationUpdateSlatesArgs>(
    (input: Types.MutationUpdateSlatesArgs) =>
      client.slates.update(input, fields),
    {
      onSuccess: data => {
        const updatedSlateIds = data.map(slate => slate.id)
        // queryClient.invalidateQueries(networkKey)
        queryClient.setQueryData<Types.Network>(
          networkKey,
          networkUpdater(network => ({
            navigationSlates: navigationSlateReducer(
              network,
              updatedSlateIds,
              data,
            ),
          })),
        )
        queryClient.setQueryData<Types.AuthToken>(
          authTokenKey,
          authTokenUpdater({
            network: networkUpdater(network => ({
              navigationSlates: navigationSlateReducer(
                network,
                updatedSlateIds,
                data,
              ),
            })),
          }),
        )
      },
      mutationKey: updateSlatesKey,
      ...useMutationOptions,
    },
  )
}
