import { NewThemeFields, Types } from '@tribeplatform/gql-client'
import { AuthToken } from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getAuthTokensKey,
  getNetworkKey,
  getUpsertThemeKey,
} from '../../utils/keys'
import { authTokenUpdater, networkUpdater } from '../cache/useCachedNetwork'

export const useUpsertTheme = (options?: {
  fields?: NewThemeFields
  useMutationOptions?: UseMutationOptions<
    Types.NewTheme,
    Error,
    Types.MutationUpsertThemeArgs,
    { snapshot: Types.Network }
  >
}) => {
  const { useMutationOptions, fields } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const networkKey = getNetworkKey()
  const authTokenKey = getAuthTokensKey()
  const upsertThemeKey = getUpsertThemeKey()

  return useMutation<
    Types.NewTheme,
    Error,
    Types.MutationUpsertThemeArgs,
    { snapshot: Types.Network }
  >(
    (input: Types.MutationUpsertThemeArgs) =>
      client.theme.upsert(input, fields),
    {
      onMutate: async newTheme => {
        const snapshot = queryClient.getQueryData<Types.Network>(networkKey)

        if (newTheme.input?.active) {
          await queryClient.cancelQueries(networkKey)

          queryClient.setQueryData<Types.Network>(
            networkKey,
            networkUpdater({ activeTheme: newTheme.input }),
          )
          queryClient.setQueryData<AuthToken>(
            authTokenKey,
            authTokenUpdater({
              network: { activeTheme: newTheme.input },
            }),
          )
        }

        return { snapshot }
      },
      onSuccess: newTheme => {
        queryClient.setQueryData<Types.NewTheme>(
          upsertThemeKey,
          networkUpdater({ activeTheme: newTheme }),
        )
        queryClient.setQueryData<AuthToken>(
          authTokenKey,
          authTokenUpdater({
            network: { activeTheme: newTheme },
          }),
        )
      },
      onError: (err, newTheme, context) => {
        queryClient.setQueryData<Types.Network>(networkKey, context.snapshot)
        queryClient.setQueryData<AuthToken>(
          authTokenKey,
          authTokenUpdater({ network: context.snapshot }),
        )

        queryClient.invalidateQueries(networkKey)
      },
      mutationKey: upsertThemeKey,
      ...useMutationOptions,
    },
  )
}
