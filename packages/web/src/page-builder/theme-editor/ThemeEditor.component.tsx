import { ReactElement } from 'react'

import { List } from '@tribeplatform/react-ui-kit/Layout'

import { ColorsEditor } from './colors-editor/ColorsEditor.component'
import { ColorTemplatePicker } from './colors-editor/ColorTemplatePicker'
import { TypographyEditor } from './TypographyEditor.component'

export const ThemeEditor = ({
  theme,
  darkMode,
  setDarkMode,
  setThemeUpdates,
}): ReactElement => {
  return (
    <>
      <List spacing="md">
        <List.Item>
          <ColorTemplatePicker
            theme={theme}
            setThemeUpdates={setThemeUpdates}
          />
        </List.Item>
        <List.Item>
          <ColorsEditor
            theme={theme}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setThemeUpdates={setThemeUpdates}
          />
        </List.Item>
        <List.Item>
          <TypographyEditor theme={theme} setThemeUpdates={setThemeUpdates} />
        </List.Item>
      </List>
    </>
  )
}
