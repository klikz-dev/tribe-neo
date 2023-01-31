import { UserSettings, SetUserSettingType } from './@types'

const isClient = typeof window !== 'undefined'

export const getUserSettings = (): UserSettings =>
  isClient && JSON?.parse(window.localStorage.getItem('userSettings') || '""')

export const setUserSetting = (
  type: SetUserSettingType,
  value,
): UserSettings | undefined => {
  if (isClient) {
    const userSettings: UserSettings = getUserSettings()
    let newUserSettings: UserSettings

    switch (type) {
      case 'spaceCollection':
        newUserSettings = {
          ...userSettings,
          spaceCollections: {
            ...userSettings?.spaceCollections,
            [value?.id]: {
              isExpanded: value?.isExpanded,
              name: value?.name,
            },
          },
        }
        break

      case 'appearance':
        newUserSettings = {
          ...userSettings,
          appearance: {
            ...userSettings?.appearance,
            ...value,
          },
        }
        break

      default:
        return undefined
    }

    window.localStorage.setItem(
      'userSettings',
      JSON?.stringify(newUserSettings),
    )
    return newUserSettings
  }
}
