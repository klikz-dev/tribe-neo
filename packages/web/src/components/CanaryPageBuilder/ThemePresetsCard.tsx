import { FC, useRef } from 'react'

import PlusIcon from '@heroicons/react/outline/PlusIcon'
import SparklesIcon from '@heroicons/react/solid/SparklesIcon'
import clsx from 'clsx'

import { Card } from '@tribeplatform/react-ui-kit/Card'

import { ColorTemplate, colorTemplates } from '../../themes/colors/templates'
import { Theme } from '../../themes/types'

export type ThemePresetsCardProps = {
  theme: Theme
  mainTheme: Theme
  setPreset: (template: ColorTemplate) => void
}

export const ThemePresetsCard: FC<ThemePresetsCardProps> = ({
  mainTheme,
  setPreset,
  theme,
}) => {
  const isCustom = useRef<boolean>(true)
  return (
    <Card>
      <Card.Header>
        <h5 className="flex space-x-2 items-center text-base font-semibold">
          <SparklesIcon className="h-4 w-4" /> Theme Presets
        </h5>
      </Card.Header>
      <Card.Content>
        <div className="grid grid-cols-3 items-center gap-y-4 space-x-0">
          {colorTemplates.map(template => {
            if (template.name === theme.name) {
              isCustom.current = false
            }
            return (
              <TemplateCard
                key={template.name}
                setPreset={setPreset}
                active={template.name === theme.name}
                template={template}
              />
            )
          })}
          {/* Custom Card */}
          <TemplateCard
            setPreset={setPreset}
            template={{ colors: mainTheme.colors, name: 'Custom' }}
            className="bg-gray-500 flex items-center justify-center"
            style={{ backgroundColor: 'initial' }}
            active={isCustom.current}
          >
            <PlusIcon className="w-8 h-8" />
          </TemplateCard>
        </div>
      </Card.Content>
    </Card>
  )
}

const TemplateCard: FC<
  React.HTMLProps<HTMLElement> & {
    active: boolean
    template: ColorTemplate
    setPreset: (template: ColorTemplate) => void
  }
> = ({ children, style, template, active, className, setPreset }) => (
  <div
    className="flex flex-col items-center cursor-pointer"
    key={template.name}
    onClick={() => {
      setPreset(template)
    }}
  >
    <div
      className={clsx(
        className,
        'h-16 w-24 rounded-md border-2 shadow-md transition-all',
        {
          'border-actionPrimary-500': active,
        },
      )}
      style={{
        backgroundColor: template.colors.light.actionPrimary[500],
        ...style,
      }}
    >
      {children}
    </div>
    <small className="mt-1 text-xs text-basicSurface-500">
      {template.name}
    </small>
  </div>
)
