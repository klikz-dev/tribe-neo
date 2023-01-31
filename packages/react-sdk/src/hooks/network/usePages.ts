import { PageFields } from '@tribeplatform/gql-client'
import { Page } from '@tribeplatform/gql-client/types'

import { useQuery, useQueryClient, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getPageKey, getPagesKey } from '../../utils/keys'

export const usePages = (options?: {
  useQueryOptions?: UseQueryOptions<Page[]>
  fields?: PageFields
}) => {
  const { useQueryOptions, fields = 'all' } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()
  const pagesKey = getPagesKey()

  return useQuery<Page[]>(pagesKey, () => client.pages.list(fields), {
    onSuccess: pages => {
      pages.forEach(page =>
        queryClient.setQueriesData<Page>(getPageKey({ id: page.id }), page),
      )
    },
    ...useQueryOptions,
  })
}
