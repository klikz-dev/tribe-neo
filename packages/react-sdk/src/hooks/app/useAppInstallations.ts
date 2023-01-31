import { AppInstallationFields } from '@tribeplatform/gql-client'
import {
  PaginatedAppInstallation,
  QueryGetNetworkAppInstallationsArgs,
} from '@tribeplatform/gql-client/types'

import { UseInfiniteQueryOptions, useInfiniteQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppInstallationsKey } from '../../utils/keys'

export const useAppInstallations = (options: {
  variables: QueryGetNetworkAppInstallationsArgs
  fields?: AppInstallationFields
  useInfiniteQueryOptions?: UseInfiniteQueryOptions<PaginatedAppInstallation>
}) => {
  const { variables, fields = 'basic', useInfiniteQueryOptions } = options || {}
  const { client } = useTribeClient()
  const appInstallationsKey = getAppInstallationsKey(variables)

  return useInfiniteQuery<PaginatedAppInstallation>(
    appInstallationsKey,
    ({ pageParam: after }) =>
      client?.app.appInstallations({ after, ...variables }, fields),
    useInfiniteQueryOptions,
  )
}
