interface UserSettingsSpaceCollections {
  isExpanded: boolean
  name: string
}

interface UserSettingValue extends UserSettingsSpaceCollections {
  id: string
}

interface AppearanceValue {
  syncColorMode: boolean
  colorMode: 'light' | 'dark'
}

export type SetUserSettingType = 'spaceCollection' | 'appearance'

export type SetUserSettingValue = UserSettingValue

export interface UserSettings {
  spaceCollections: Record<UserSettingValue['id'], UserSettingsSpaceCollections>
  appearance: AppearanceValue
}
