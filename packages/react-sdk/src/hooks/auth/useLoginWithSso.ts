import { useCallback, useState } from 'react'

import { QuerySsoUrlArgs, SsoUrl } from '@tribeplatform/gql-client/types'

import { useQueryClient, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getLoginWithSsoKey } from '../../utils/keys'

export const useLoginWithSso = (options?: {
  useQueryOptions?: UseQueryOptions<SsoUrl>
}) => {
  const { useQueryOptions } = options || {}
  const queryClient = useQueryClient()
  const { client } = useTribeClient()
  const [isLoading, setLoading] = useState(false)
  const loginWithSsoKey = getLoginWithSsoKey()

  const login = useCallback(
    async (variables: QuerySsoUrlArgs) => {
      setLoading(true)
      const data = await queryClient.fetchQuery(
        loginWithSsoKey,
        () => client?.auth.ssoUrl(variables),
        useQueryOptions,
      )
      setLoading(false)
      return data
    },
    [loginWithSsoKey, client?.auth, queryClient, useQueryOptions],
  )

  return {
    login,
    isLoading,
  }
}
