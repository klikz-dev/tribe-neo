import { useCallback, useState } from 'react'

import { ClientError } from '@tribeplatform/gql-client'
import { AuthTokenFields } from '@tribeplatform/gql-client/graphql'
import {
  AuthToken,
  QueryLoginNetworkArgs,
} from '@tribeplatform/gql-client/types'

import { useQueryClient, UseQueryOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAuthTokensKey, getLoginKey } from '../../utils/keys'

type Login = ({
  variables,
  useQueryOptions,
  fields,
}: {
  variables: QueryLoginNetworkArgs
  useQueryOptions?: UseQueryOptions<AuthToken, ClientError>
  fields?: AuthTokenFields
  willReload?: boolean
}) => Promise<AuthToken>

export const useLogin = () => {
  const queryClient = useQueryClient()
  const { client } = useTribeClient()
  const [isLoading, setLoading] = useState<boolean>(false)
  const loginKey = getLoginKey()
  const authTokenKey = getAuthTokensKey()

  const login: Login = useCallback(
    async ({
      variables,
      willReload = false,
      useQueryOptions,
      fields = 'default',
    }) => {
      setLoading(true)
      try {
        const data = await queryClient.fetchQuery<AuthToken, ClientError>(
          loginKey,
          () => client?.auth.login(variables, fields),
          useQueryOptions,
        )
        // Do not set loading to false and update cache if we're reloading the page right after.
        if (!willReload) {
          queryClient.setQueryData(authTokenKey, data)
          setLoading(false)
        }
        return data
      } catch (error) {
        setLoading(false)
        throw error
      }
    },
    [authTokenKey, client?.auth, loginKey, queryClient],
  )

  return {
    login,
    isLoading,
  }
}
