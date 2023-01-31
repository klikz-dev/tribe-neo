import { useCallback } from 'react'

import { ClientError, SearchEntityFields } from '@tribeplatform/gql-client'
import { QuerySearchArgs, SearchResult } from '@tribeplatform/gql-client/types'

import { UseQueryOptions, useQueryClient, useQuery } from '../lib'
import { useTribeClient } from '../useTribeClient'
import { getSearchKey } from '../utils/keys'

export const useSearch = (options?: {
  variables?: QuerySearchArgs
  fields?: SearchEntityFields
  useQueryOptions?: UseQueryOptions<SearchResult, ClientError>
}) => {
  const { variables, fields, useQueryOptions } = options || {}
  const queryClient = useQueryClient()
  const { client } = useTribeClient()

  const asyncSearch = useCallback(
    async (variables: QuerySearchArgs) => {
      const data = await queryClient.fetchQuery<SearchResult, ClientError>(
        getSearchKey(variables),
        () => client.search(variables, fields),
        useQueryOptions,
      )
      return data
    },
    [queryClient, client, useQueryOptions, fields],
  )

  return {
    ...useQuery<SearchResult, ClientError>(
      getSearchKey(variables),
      () => client.search(variables, fields),
      { ...useQueryOptions, enabled: !!variables?.input?.query },
    ),
    asyncQuery: asyncSearch,
  }
}
