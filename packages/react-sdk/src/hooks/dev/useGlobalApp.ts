import { UseQueryOptions } from 'react-query'

import { GlobalAppFields } from '@tribeplatform/gql-client'
import { App, QueryGlobalAppArgs } from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppKey } from '../../utils/keys'

export const useGlobalApp = (options: {
  variables: QueryGlobalAppArgs
  fields?: GlobalAppFields
  useQueryOptions?: UseQueryOptions<App>
}) => {
  const { variables, fields = 'basic', useQueryOptions } = options || {}
  const { client } = useTribeClient()
  const globalAppKey = getAppKey(variables)

  return useQuery<App>(
    globalAppKey,
    () => client?.dev.app(variables, fields),
    useQueryOptions,
  )
}
