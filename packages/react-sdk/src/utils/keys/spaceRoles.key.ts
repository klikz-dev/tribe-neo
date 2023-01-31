import { QuerySpaceRolesArgs } from '@tribeplatform/gql-client/types'

export const SPACE_ROLES_KEY = 'spaceRoles'

export const getSpaceRolesKey = (args: QuerySpaceRolesArgs) => [
  SPACE_ROLES_KEY,
  args,
]
