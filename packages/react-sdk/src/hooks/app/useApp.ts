import { UseQueryOptions } from 'react-query'

import { AppFields } from '@tribeplatform/gql-client'
import { App, QueryAppArgs } from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppKey } from '../../utils/keys'

export const useApp = (options: {
  variables: QueryAppArgs
  fields?: AppFields
  useQueryOptions?: UseQueryOptions<App>
}) => {
  const { variables, fields = 'basic', useQueryOptions } = options
  const { client } = useTribeClient()
  const appKey = getAppKey(variables)

  return useQuery<App>(
    appKey,
    () => client.app.get(variables, fields),
    useQueryOptions,
  )
}
