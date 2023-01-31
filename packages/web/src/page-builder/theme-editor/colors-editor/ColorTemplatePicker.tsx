import { ReactElement } from 'react'

import clsx from 'clsx'

import { List } from '@tribeplatform/react-ui-kit/Layout'
import { RadioGroup } from '@tribeplatform/react-ui-kit/RadioGroup'
import { equals } from '@tribeplatform/slate-kit/utils'

import { ColorTemplate, colorTemplates } from '../../../themes/colors/templates'
import { Theme } from '../../../themes/types'
import { ColorCircle } from './ColorCircle'

export type ColorTemplatePickerProps = {
  theme: Theme
  setThemeUpdates: (props) => void
}

export const ColorTemplatePicker = ({
  theme,
  setThemeUpdates,
}: ColorTemplatePickerProps): ReactElement => {
  const selectedTemplate = colorTemplates.findIndex(template =>
    equals(template.colors, theme.colors),
  )
  return (
    <List spacing="sm">
      <List.Item>
        <h3 className="leading-6 text-basicSurface-500">Color Templates</h3>
      </List.Item>
      <List.Item>
        <RadioGroup
          value={`${selectedTemplate}`}
          onChange={idx => {
            setThemeUpdates(updates => ({
              ...updates,
              colors: colorTemplates[idx].colors,
            }))
          }}
          variant="stacked-cards"
        >
          <RadioGroup.Items>
            {colorTemplates.map((template, idx) => (
              <RadioGroup.Item key={template.name} value={`${idx}`}>
                {({ checked }) => (
                  <SingleTemplatePicker template={template} checked={checked} />
                )}
              </RadioGroup.Item>
            ))}
          </RadioGroup.Items>
        </RadioGroup>
      </List.Item>
    </List>
  )
}

const SingleTemplatePicker = ({
  template,
  checked,
}: {
  template: ColorTemplate
  checked: boolean
}) => (
  <>
    <div className="w-full flex flex-row items-center">
      <div className="flex flex-grow items-center">
        <p>{template.name}</p>
      </div>
      <div className="flex flex-shrink-0 justify-center items-center h-full space-x-1">
        <ColorCircle
          size="md"
          color={template.colors.light.actionPrimary[500]}
        />
        <ColorCircle
          size="md"
          color={template.colors.light.actionSecondary[500]}
        />
        <ColorCircle size="md" color={template.colors.light.main[50]} />
        <ColorCircle size="md" color={template.colors.light.surface[50]} />
        <ColorCircle
          size="md"
          color={template.colors.light.actionAccent[500]}
        />
      </div>
    </div>
    <div
      className={clsx(
        checked ? 'border-actionPrimary-500' : 'border-transparent',
        'absolute -inset-px rounded-lg border-2 pointer-events-none',
      )}
      aria-hidden="true"
    />
  </>
)
