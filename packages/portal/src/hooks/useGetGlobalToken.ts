import { gql, request, ClientError as BaseClientError } from 'graphql-request'
import { useMutation, UseMutationOptions } from 'react-query'

import { ClientError, ErrorResponse, Types } from '@tribeplatform/gql-client'
import { flattenErrors } from '@tribeplatform/gql-client/utils/error'

import { getRuntimeConfigVariable } from '../config'

export const useGetGlobalToken = (options?: {
  useMutationOptions?: UseMutationOptions<
    { data: Types.GlobalToken },
    ClientError,
    {
      email: string
      verificationCode: string
    }
  >
}) => {
  const { useMutationOptions } = options || {}

  return useMutation(
    async input => {
      return request(
        getRuntimeConfigVariable('TRIBE_GQL_ENDPOINT'),
        gql`
          query globalToken($input: GlobalTokenInput!) {
            globalToken(input: $input) {
              accessToken
              email
            }
          }
        `,
        {
          input,
        },
      ).catch((error: BaseClientError) => {
        const normalizedError: Array<ErrorResponse> = flattenErrors(
          error?.response?.errors,
        )

        error.response.errors = normalizedError

        // eslint-disable-next-line no-throw-literal
        throw error as ClientError
      })
    },
    {
      ...useMutationOptions,
    },
  )
}
