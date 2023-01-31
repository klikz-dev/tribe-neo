import { ClientError } from '@tribeplatform/gql-client'
import {
  AppPublication,
  MutationGlobalPublishAppPrivatelyArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppPublicationsKey } from '../../utils/keys'

export const useGlobalPublishAppPrivately = (options?: {
  useMutationOptions?: UseMutationOptions<
    AppPublication,
    ClientError,
    MutationGlobalPublishAppPrivatelyArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    AppPublication,
    ClientError,
    MutationGlobalPublishAppPrivatelyArgs
  >(input => client.dev.publishAppPrivately(input), {
    onSettled: (data, error, variables) => {
      const appPublicationsKey = getAppPublicationsKey({
        appId: variables.appId,
      })
      queryClient.invalidateQueries(appPublicationsKey)
    },
    ...useMutationOptions,
  })
}
