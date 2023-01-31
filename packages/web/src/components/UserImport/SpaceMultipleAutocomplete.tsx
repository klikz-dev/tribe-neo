import { FC, useState } from 'react'

import { Space } from '@tribeplatform/gql-client/types'
import { SpacePicker } from '@tribeplatform/react-sdk/components'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { Text } from '@tribeplatform/react-ui-kit/Text'

import { useUserImportContext } from './UserImportContext'

export interface SpaceMultipleAutocompleteProps {
  onChange: (values: Space[]) => void
  value: Space[]
}

export const SpaceMultipleAutocomplete: FC<
  SpaceMultipleAutocompleteProps
> = props => {
  const { onChange, value = [] } = props
  const context = useUserImportContext()

  const [customSelect, setCustomSelect] = useState(false)

  return (
    <>
      {customSelect && (
        <SpacePicker
          onChange={onChange}
          value={value}
          placeholder="Search spaces"
          multiple
        />
      )}
      {!customSelect && (
        <div className="text-sm flex space-x-2 text-basicSurface-500">
          {value?.length > 0 && (
            <Text>
              Newly invited members will automatically join{' '}
              {value.map(it => it.name).join(', ')}
            </Text>
          )}
          {context?.hasInviteDefaultsPermission && (
            <Link
              href="#"
              onClick={() => setCustomSelect(true)}
              data-testid="spaces-edit"
            >
              Edit
            </Link>
          )}
        </div>
      )}
    </>
  )
}
