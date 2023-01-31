import { NetworkFields } from '@tribeplatform/gql-client'
import {
  Network,
  MutationArchiveMemberSchemaFieldArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions } from '../../lib'
import { useTribeClient } from '../../useTribeClient'

export const useArchiveMemberSchemaField = (options?: {
  fields?: NetworkFields
  useMutationOptions?: UseMutationOptions<
    Network,
    Error,
    MutationArchiveMemberSchemaFieldArgs
  >
}) => {
  const { useMutationOptions, fields = 'default' } = options || {}
  const { client } = useTribeClient()

  return useMutation<Network, Error, MutationArchiveMemberSchemaFieldArgs>(
    input => client.network.archiveMemberSchemaField(input, fields),
    useMutationOptions,
  )
}
