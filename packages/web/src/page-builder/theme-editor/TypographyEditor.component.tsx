import { ReactElement } from 'react'

import { DeepPartial } from 'react-hook-form'

import { List } from '@tribeplatform/react-ui-kit/Layout'

import { Theme } from '../../themes/types'
import { TypographyPicker } from './TypographyPicker.component'

export type TypographyEditorProps = {
  theme: Theme
  setThemeUpdates: React.Dispatch<React.SetStateAction<DeepPartial<Theme>>>
}

export const TypographyEditor = ({
  theme,
  setThemeUpdates,
}: TypographyEditorProps): ReactElement => {
  return (
    <List spacing="sm">
      <List.Item>
        <h3 className="leading-6 text-basicSurface-500">Typography</h3>
      </List.Item>
      <List.Item>
        <TypographyPicker theme={theme} setThemeUpdates={setThemeUpdates} />
      </List.Item>
    </List>
  )
}
