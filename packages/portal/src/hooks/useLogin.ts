import { useCallback, useState } from 'react'

import { UseMutationOptions } from 'react-query'

import { ClientError, Types } from '@tribeplatform/gql-client'

import { useGetGlobalToken } from './useGetGlobalToken'

type Login = (
  variables: {
    email: string
    verificationCode: string
  },
  useMutationOptions?: UseMutationOptions<
    { data: Types.GlobalToken },
    ClientError,
    {
      email: string
      verificationCode: string
    }
  >,
) => Promise<void>

export const useLogin = () => {
  const { mutateAsync: getGlobalToken } = useGetGlobalToken()
  const [isLoading, setLoading] = useState<boolean>(false)

  const login: Login = useCallback(
    async (variables, useMutationOptions) => {
      setLoading(true)
      try {
        // Do not set loading to false and update cache if we're reloading the page right after.
        return await getGlobalToken(variables, useMutationOptions)
      } catch (error) {
        setLoading(false)
        throw error
      }
    },
    [getGlobalToken],
  )

  return {
    login,
    isLoading,
  }
}
