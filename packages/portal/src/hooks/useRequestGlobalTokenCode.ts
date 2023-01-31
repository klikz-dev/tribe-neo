import { gql, request } from 'graphql-request'
import { useMutation, UseMutationOptions } from 'react-query'

import { ClientError } from '@tribeplatform/gql-client'
import { Action } from '@tribeplatform/gql-client/types'

import { getRuntimeConfigVariable } from '../config'

export const useRequestGlobalTokenCode = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    {
      email: string
    }
  >
}) => {
  const { useMutationOptions } = options || {}

  return useMutation(
    async input => {
      return request(
        getRuntimeConfigVariable('TRIBE_GQL_ENDPOINT'),
        gql`
          mutation requestGlobalTokenCode($input: RequestGlobalTokenInput!) {
            requestGlobalTokenCode(input: $input) {
              status
            }
          }
        `,
        {
          input,
        },
      )
    },
    {
      ...useMutationOptions,
    },
  )
}
