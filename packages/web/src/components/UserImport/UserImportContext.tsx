import { createContext, useContext } from 'react'

import { Space, Role } from '@tribeplatform/gql-client/types'

export type UserImportContextProps = {
  defaultSpaces: Space[]
  hasInviteDefaultsPermission: boolean
  loading: boolean
  spaces: Space[]
  roles: Role[]
  defaultRole: Role
}
export const UserImportContext = createContext<
  UserImportContextProps | undefined
>(undefined)

export const useUserImportContext = () => {
  return useContext(UserImportContext)
}
