import { SsoUrl, QuerySsoUrlArgs } from '@tribeplatform/gql-client/types'

import { useQuery, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getSsoUrlKey } from '../../utils/keys'

export const useSsoUrl = (options?: {
  variables: QuerySsoUrlArgs
  useQueryOptions?: UseQueryOptions<SsoUrl>
}) => {
  const { useQueryOptions, variables } = options || {}
  const { client } = useTribeClient()
  const ssoUrlKey = getSsoUrlKey()

  return useQuery<SsoUrl>(
    ssoUrlKey,
    () => client.auth.ssoUrl(variables),
    useQueryOptions,
  )
}
