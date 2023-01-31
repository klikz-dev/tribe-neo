import { ReactElement } from 'react'

import { DeepPartial } from 'react-hook-form'

import { RadioGroup } from '@tribeplatform/react-ui-kit/RadioGroup'

import { Theme } from '../../themes/types'
import {
  TypographyTheme,
  typographyThemes,
} from '../../themes/typography/themes'

export type TypographyPickerProps = {
  theme: Theme
  setThemeUpdates: React.Dispatch<React.SetStateAction<DeepPartial<Theme>>>
}

export const TypographyPicker = ({
  theme,
  setThemeUpdates,
}: TypographyPickerProps): ReactElement => {
  const { typography } = theme
  const { theme: typographyTheme } = typography

  const setFontFamily = (typographyTheme: TypographyTheme) => {
    setThemeUpdates(themeUpdates => ({
      ...(themeUpdates || {}),
      typography: {
        ...(themeUpdates?.typography || {}),
        theme: typographyTheme,
      },
    }))
  }

  return (
    <RadioGroup value={typographyTheme} onChange={setFontFamily}>
      <RadioGroup.Items>
        {Object.keys(typographyThemes).map(key => (
          <RadioGroup.Item
            key={key}
            value={key}
            title={typographyThemes[key].title}
          />
        ))}
      </RadioGroup.Items>
    </RadioGroup>
  )
}
