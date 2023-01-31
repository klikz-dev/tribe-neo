import { SpaceNotificationPreference } from '@tribeplatform/gql-client/types'
import { RadioGroup } from '@tribeplatform/react-ui-kit/RadioGroup'

import { NotificationSettingOptions } from './utils'

export const NotificationPreferences = ({
  value,
  onChange,
  showDescriptions = true,
}: {
  value: SpaceNotificationPreference
  onChange: (newValue: SpaceNotificationPreference) => void
  showDescriptions?: boolean
}) => (
  <RadioGroup value={value} onChange={onChange}>
    <RadioGroup.Items>
      {NotificationSettingOptions.map(option => (
        <RadioGroup.Item key={option.value} value={option.value}>
          <span className="block">{option.label}</span>
          {showDescriptions && (
            <span className="text-basicSurface-500 block text-sm">
              {option.description}
            </span>
          )}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Items>
  </RadioGroup>
)
