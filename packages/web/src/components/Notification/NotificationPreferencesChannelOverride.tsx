import {
  SpaceNotificationPreference,
  MemberSpaceNotificationSettings,
} from '@tribeplatform/gql-client/types'
import { Checkbox } from '@tribeplatform/react-ui-kit/Checkbox'
import { Select } from '@tribeplatform/react-ui-kit/Select'

import { NotificationSettingOptions } from './utils'

const getTextByValue = (value?: SpaceNotificationPreference | null): string => {
  switch (value) {
    case SpaceNotificationPreference.ALL:
      return 'All activity (new posts & replies)'
    case SpaceNotificationPreference.NEW_POST:
      return 'New posts'
    case SpaceNotificationPreference.NONE:
      return 'Posts of Interest'
    default:
      return ''
  }
}
export const NotificationPreferencesChannelOverride = ({
  defaultValue,
  notificationSettings,
  onChange,
}: {
  defaultValue: SpaceNotificationPreference
  notificationSettings: MemberSpaceNotificationSettings | null | undefined
  onChange: (
    sameAsDefault: boolean,
    newValue: SpaceNotificationPreference | null | undefined,
  ) => void
}) => {
  const value = notificationSettings?.preference ?? defaultValue
  return (
    <div>
      <Checkbox
        checked={!notificationSettings?.sameAsDefault}
        onChange={() => {
          onChange(!notificationSettings?.sameAsDefault, value)
        }}
      >
        Use different settings for email notifications
      </Checkbox>
      {!notificationSettings?.sameAsDefault && (
        <Select
          className="ml-6 mt-3"
          value={value}
          onChange={preference => {
            onChange(false, preference)
          }}
        >
          <Select.Button>{getTextByValue(value)}</Select.Button>
          <Select.Items>
            {NotificationSettingOptions.map(option => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Items>
        </Select>
      )}
    </div>
  )
}
