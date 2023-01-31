import { ClientError, PageFields } from '@tribeplatform/gql-client'
import {
  AuthToken,
  MutationUpdatePageArgs,
  Network,
  Page,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import {
  getAuthTokensKey,
  getNetworkKey,
  getPageKey,
  getPagesKey,
} from '../../utils/keys'
import { authTokenUpdater, networkUpdater } from '../cache/useCachedNetwork'

export const useUpdatePage = (options?: {
  fields?: PageFields
  useMutationOptions?: UseMutationOptions<
    Page,
    ClientError,
    MutationUpdatePageArgs,
    { snapshot: Page }
  >
}) => {
  const { useMutationOptions, fields = 'all' } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  const networkKey = getNetworkKey()
  const authTokenKey = getAuthTokensKey()

  return useMutation<
    Page,
    ClientError,
    MutationUpdatePageArgs,
    { snapshot: Page }
  >((input: MutationUpdatePageArgs) => client.pages.update(input, fields), {
    onMutate: async newPage => {
      const pageKey = getPageKey({ id: newPage.id })

      await queryClient.cancelQueries(pageKey)
      const snapshot = queryClient.getQueryData<Page>(pageKey)

      queryClient.setQueriesData<Page>(pageKey, old => ({
        ...old,
        ...newPage,
      }))

      return { snapshot }
    },
    onSuccess: updatedPage => {
      const pageKey = getPageKey({ id: updatedPage.id })
      queryClient.setQueryData<Page>(pageKey, oldPage => ({
        ...oldPage,
        ...updatedPage,
      }))
      queryClient.setQueryData<Network>(
        networkKey,
        networkUpdater(network => ({
          pages: network.pages.map(page =>
            page.slug === updatedPage.slug ? updatedPage : page,
          ),
        })),
      )
      queryClient.setQueryData<AuthToken>(
        authTokenKey,
        authTokenUpdater({
          network: network => ({
            pages: network.pages.map(page =>
              page.slug === updatedPage.slug ? updatedPage : page,
            ),
          }),
        }),
      )
    },
    onError: (err, newPage, context) => {
      const pageKey = getPageKey({ id: newPage.id })
      queryClient.setQueryData<Page>(pageKey, context.snapshot)

      queryClient.invalidateQueries(pageKey)
    },
    onSettled: () => {
      const networkKey = getNetworkKey()
      const pagesKey = getPagesKey()
      queryClient.invalidateQueries(pagesKey)
      queryClient.invalidateQueries(networkKey)
    },
    ...useMutationOptions,
  })
}
