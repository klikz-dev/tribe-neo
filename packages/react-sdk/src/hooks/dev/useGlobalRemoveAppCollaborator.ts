import { ClientError } from '@tribeplatform/gql-client'
import {
  Action,
  MutationGlobalRemoveAppCollaboratorArgs,
} from '@tribeplatform/gql-client/types'

import { useMutation, UseMutationOptions, useQueryClient } from '../../lib'
import { useTribeClient } from '../../useTribeClient'
import { getAppCollaboratorsKey } from '../../utils/keys'

export const useGlobalRemoveAppCollaborator = (options?: {
  useMutationOptions?: UseMutationOptions<
    Action,
    ClientError,
    MutationGlobalRemoveAppCollaboratorArgs
  >
}) => {
  const { useMutationOptions } = options || {}
  const { client } = useTribeClient()
  const queryClient = useQueryClient()

  return useMutation<
    Action,
    ClientError,
    MutationGlobalRemoveAppCollaboratorArgs
  >(input => client.dev.removeAppCollaborator(input), {
    onSettled: () => {
      const appCollaboratorsKey = getAppCollaboratorsKey()
      queryClient.invalidateQueries(appCollaboratorsKey)
    },
    ...useMutationOptions,
  })
}
