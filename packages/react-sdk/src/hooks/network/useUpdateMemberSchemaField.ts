import { NetworkFields } from '@tribeplatform/gql-client'
import {
  Network,
  MutationUpdateMemberSchemaFieldArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'

export const useUpdateMemberSchemaField = (options?: {
  fields?: NetworkFields
  useMutationOptions?: UseMutationOptions<
    Network,
    Error,
    MutationUpdateMemberSchemaFieldArgs
  >
}) => {
  const { useMutationOptions, fields = 'default' } = options || {}
  const { client } = useTribeClient()

  return useMutation<Network, Error, MutationUpdateMemberSchemaFieldArgs>(
    input => client.network.updateMemberSchemaField(input, fields),
    useMutationOptions,
  )
}
