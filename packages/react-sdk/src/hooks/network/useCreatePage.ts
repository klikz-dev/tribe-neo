import { ClientError, PageFields } from '@tribeplatform/gql-client'
import {
  AuthToken,
  MutationCreatePageArgs,
  Network,
  Page,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAuthTokensKey, getNetworkKey, getPageKey } from '../../utils/keys'
import { authTokenUpdater, networkUpdater } from '../cache/useCachedNetwork'

export const useCreatePage = (options?: {
  fields?: PageFields
  useMutationOptions?: UseMutationOptions<
    Page,
    ClientError,
    MutationCreatePageArgs
  >
}) => {
  const { useMutationOptions, fields = 'all' } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const networkKey = getNetworkKey()
  const authTokenKey = getAuthTokensKey()

  return useMutation<Page, ClientError, MutationCreatePageArgs>(
    (input: MutationCreatePageArgs) => client.pages.create(input, fields),
    {
      onSuccess: newPage => {
        const pageKey = getPageKey({ id: newPage.id })
        queryClient.setQueryData<Page>(pageKey, newPage)
        queryClient.setQueryData<Network>(
          networkKey,
          networkUpdater(network => ({
            pages: [...network.pages, newPage],
          })),
        )
        queryClient.setQueryData<AuthToken>(
          authTokenKey,
          authTokenUpdater({
            network: network => ({
              pages: [...network.pages, newPage],
            }),
          }),
        )
      },
      ...useMutationOptions,
    },
  )
}
