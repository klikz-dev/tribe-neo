import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationGlobalUnPublishAppPrivatelyArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppPublicationsKey } from '../../utils/keys'

export const useGlobalUnPublishAppPrivately = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationGlobalUnPublishAppPrivatelyArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    Action,
    ClientError,
    MutationGlobalUnPublishAppPrivatelyArgs
  >(input => client.dev.unPublishAppPrivately(input), {
    onSettled: (data, error, variables) => {
      const appPublicationsKey = getAppPublicationsKey({
        appId: variables.appId,
      })
      queryClient.invalidateQueries(appPublicationsKey)
    },
    ...useMutationOptions,
  })
}
