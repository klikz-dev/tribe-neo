import { useState } from 'react'

import { Role } from '@tribeplatform/gql-client/types'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { Select } from '@tribeplatform/react-ui-kit/Select'
import { Text } from '@tribeplatform/react-ui-kit/Text'

import { useUserImportContext } from './UserImportContext'

export interface RoleSelectProps {
  options: Role[]
  onChange: (value: Role) => void
  value: Role
  onBlur
  name: string
}

export const RoleSelect: React.FC<RoleSelectProps> = ({
  options,
  onChange,
  value,
}) => {
  const context = useUserImportContext()

  const [customSelect, setCustomSelect] = useState(false)

  return (
    <>
      {customSelect && (
        <Select onChange={onChange} value={value}>
          <Select.Button placeholder="Select role">{value?.name}</Select.Button>
          <Select.Items>
            {options.map(role => (
              <Select.Item key={role.id} value={role}>
                {role.name}
              </Select.Item>
            ))}
          </Select.Items>
        </Select>
      )}
      {!customSelect && (
        <div className="text-sm flex space-x-2 text-basicSurface-500">
          {value && (
            <Text>
              New members will automatically become <b>{value.name}</b>
            </Text>
          )}
          {context?.hasInviteDefaultsPermission && (
            <Link
              href="#"
              onClick={() => setCustomSelect(true)}
              data-testid="role-edit"
            >
              Edit
            </Link>
          )}
        </div>
      )}
    </>
  )
}
