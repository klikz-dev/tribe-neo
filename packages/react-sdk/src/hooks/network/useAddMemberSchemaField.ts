import { NetworkFields } from '@tribeplatform/gql-client'
import {
  Network,
  MutationAddMemberSchemaFieldArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'

export const useAddMemberSchemaField = (options?: {
  fields?: NetworkFields
  useMutationOptions?: UseMutationOptions<
    Network,
    Error,
    MutationAddMemberSchemaFieldArgs
  >
}) => {
  const { useMutationOptions, fields = 'default' } = options || {}
  const { client } = useTribeClient()

  return useMutation<Network, Error, MutationAddMemberSchemaFieldArgs>(
    input => client.network.addMemberSchemaField(input, fields),
    useMutationOptions,
  )
}
