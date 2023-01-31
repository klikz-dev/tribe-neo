import { UseQueryOptions } from 'react-query'

import { QuerySsosArgs, Sso } from '@tribeplatform/gql-client/types'

import { useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getSsosKey } from '../../utils/keys'

export const useSsos = (options?: {
  variables: QuerySsosArgs
  useQueryOptions?: UseQueryOptions<Sso[]>
}) => {
  const { variables, useQueryOptions } = options || {}
  const { client } = useTribeClient()
  const ssosKey = getSsosKey()

  return useQuery<Sso[]>(
    ssosKey,
    () => client.auth.ssos(variables),
    useQueryOptions,
  )
}
