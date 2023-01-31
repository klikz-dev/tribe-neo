import { AppFields } from '@tribeplatform/gql-client'
import { PaginatedApp, QueryAppsArgs } from '@tribeplatform/gql-client/types'

import { UseInfiniteQueryOptions, useInfiniteQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppsKey } from '../../utils/keys'

export const useApps = (options: {
  variables: QueryAppsArgs
  fields?: AppFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<PaginatedApp>
}) => {
  const { variables, fields = 'basic', useInfiniteQueryOptions } = options || {}
  const { client } = useTribeClient()
  const appsKey = getAppsKey(variables)

  return useInfiniteQuery<PaginatedApp>(
    appsKey,
    ({ pageParam: after }) => client?.app.list({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}
