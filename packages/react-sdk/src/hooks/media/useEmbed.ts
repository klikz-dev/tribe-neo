import { useCallback } from 'react'

import { ClientError } from '@tribeplatform/gql-client'
import { Embed, EmbedInput } from '@tribeplatform/gql-client/types'

import { UseQueryOptions, useQueryClient, useQuery } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getEmbedKey } from '../../utils/keys'

export const useEmbed = (options?: {
  variables?: EmbedInput
  useQueryOptions?: UseQueryOptions<Embed, ClientError>
}) => {
  const { variables, useQueryOptions } = options || {}
  const queryClient = useQueryClient()
  const { client } = useTribeClient()

  const asyncEmbed = useCallback(
    async (variables: EmbedInput) => {
      const data = await queryClient.fetchQuery<Embed, ClientError>(
        getEmbedKey(variables),
        () =>
          client.media.embed({
            options: JSON.stringify({
              iframe: '1',
              omit_script: '1',
            }),
            ...variables,
          }),
        useQueryOptions,
      )
      return data
    },
    [queryClient, client, useQueryOptions],
  )

  return {
    ...useQuery<Embed, ClientError>(
      getEmbedKey(variables),
      () => client.media.embed(variables),
      { ...useQueryOptions, enabled: !!variables?.url },
    ),
    asyncQuery: asyncEmbed,
  }
}
