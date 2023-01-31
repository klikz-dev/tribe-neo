import { ClientError } from '@tribeplatform/gql-client'
import {
  AppCollaborator,
  MutationGlobalAddAppCollaboratorArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppCollaboratorsKey } from '../../utils/keys'

export const useGlobalAddAppCollaborator = (options?: {
  useMutationOptions?: UseMutationOptions<
    AppCollaborator,
    ClientError,
    MutationGlobalAddAppCollaboratorArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    AppCollaborator,
    ClientError,
    MutationGlobalAddAppCollaboratorArgs
  >(input => client.dev.addAppCollaborator(input), {
    onSettled: () => {
      const appCollaboratorsKey = getAppCollaboratorsKey()
      queryClient.invalidateQueries(appCollaboratorsKey)
    },
    ...useMutationOptions,
  })
}
