import { ReactElement } from 'react'

import ExclamationIcon from '@heroicons/react/outline/ExclamationIcon'
import InformationCircleIcon from '@heroicons/react/solid/InformationCircleIcon'
import clsx from 'clsx'

import { List } from '@tribeplatform/react-ui-kit/Layout'
import { Tabs } from '@tribeplatform/react-ui-kit/Tabs'
import { toast } from '@tribeplatform/react-ui-kit/Toast'
import { Tooltip } from '@tribeplatform/react-ui-kit/Tooltip'

import { Theme } from '../../../themes/types'
import { ColorCirclePicker } from './ColorCirclePicker.component'
import {
  linkColors,
  mainColors,
  primaryColors,
  secondaryColors,
  surfaceColors,
} from './constants'
import { checkColorsContrast } from './utils'

export type ColorsEditorProps = {
  theme: Theme
  darkMode: boolean
  setDarkMode: (props: boolean) => void
  setThemeUpdates: (props) => void
}

export const ColorsEditor = ({
  theme,
  darkMode,
  setDarkMode,
  setThemeUpdates,
}: ColorsEditorProps): ReactElement => {
  return (
    <List spacing="sm">
      <List.Item>
        <div className="flex flex-row items-center">
          <h3 className="flex leading-6 text-basicSurface-500">Colors</h3>
          {false && (
            <InformationCircleIcon
              className="ml-2 h-5 w-5 text-actionAccent-600 hover:text-actionAccentHover-500 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(theme.colors))
                toast({
                  title: 'Copied!',
                  description:
                    'You copied your custom theme into the clipboard.',
                  status: 'info',
                })
              }}
            />
          )}
        </div>
      </List.Item>
      <ColorsPickerList theme={theme} setThemeUpdates={setThemeUpdates} />
      {false && (
        <Tabs.Group
          onChange={index => setDarkMode(index === 1)}
          defaultIndex={darkMode ? 1 : 0}
        >
          <Tabs.List className="mt-3 overflow-hidden" size="sm" fullWidth>
            <Tabs.Tab name="light">Light</Tabs.Tab>
            <Tabs.Tab name="dark">Dark</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel>
              <ColorsPickerList
                theme={theme}
                setThemeUpdates={setThemeUpdates}
              />
            </Tabs.Panel>
            <Tabs.Panel>
              <ColorsPickerList
                theme={theme}
                setThemeUpdates={setThemeUpdates}
                dark
              />
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs.Group>
      )}
    </List>
  )
}

export type ColorsPickerListProps = {
  theme: Theme
  setThemeUpdates: (props) => void
  dark?: boolean
}

const ColorsPickerList: React.FC<ColorsPickerListProps> = ({
  theme,
  setThemeUpdates,
  dark,
}) => {
  return (
    <List divider>
      <ColorsPickerItem
        title="Background"
        colors={mainColors}
        theme={theme}
        setThemeUpdates={setThemeUpdates}
        dark={dark}
        checkContrast
      />
      <ColorsPickerItem
        title="Card"
        colors={surfaceColors}
        theme={theme}
        setThemeUpdates={setThemeUpdates}
        dark={dark}
        checkContrast
      />
      <ColorsPickerItem
        title="Navbar"
        colors={secondaryColors}
        theme={theme}
        setThemeUpdates={setThemeUpdates}
        dark={dark}
        checkContrast
      />
      <ColorsPickerItem
        title="Buttons & Labels"
        colors={primaryColors}
        theme={theme}
        setThemeUpdates={setThemeUpdates}
        dark={dark}
        checkContrast
      />
      <ColorsPickerItem
        title="Link"
        colors={linkColors}
        theme={theme}
        setThemeUpdates={setThemeUpdates}
        dark={dark}
      />
    </List>
  )
}

export type ColorsPickerItemProps = {
  title: string
  colors: any
  theme: Theme
  setThemeUpdates: (props) => void
  dark?: boolean
  checkContrast?: boolean
}

const ColorsPickerItem: React.FC<ColorsPickerItemProps> = ({
  title,
  colors,
  theme,
  setThemeUpdates,
  checkContrast = false,
  dark = false,
}) => {
  let ContrastComponent: ReactElement = null
  if (checkContrast) {
    const { ratio, wcagAaPassed } = checkColorsContrast(colors, theme, dark)
    ContrastComponent = (
      <Tooltip>
        <Tooltip.Trigger>
          <ExclamationIcon
            className={clsx(
              'w-6 h-6',
              ratio < 3 && 'text-danger-500',
              ratio >= 3 && ratio <= 4.5 && 'text-warning-500',
              ratio > 4.5 && 'hidden',
            )}
          />
        </Tooltip.Trigger>
        <Tooltip.Panel>
          <p>
            Members may find colors hard to read{' '}
            {!wcagAaPassed ? '(not passing WCAG 2.1 AA)' : ''}
          </p>
        </Tooltip.Panel>
      </Tooltip>
    )
  }
  return (
    <List.Item>
      <div className="flex flex-row space-x-2 items-center justify-between">
        <p className="text-basicSurface-500">{title}</p>
        <div className="flex flex-grow" />
        <div className="flex flex-row space-x-4 items-center">
          {ContrastComponent}
          {colors.map(color => (
            <ColorCirclePicker
              theme={theme}
              key={color.name}
              title={color.title}
              colorName={color.name}
              variants={dark ? color.variants.dark : color.variants.light}
              background={color.background}
              dark={dark}
              setThemeUpdates={setThemeUpdates}
            />
          ))}
        </div>
      </div>
    </List.Item>
  )
}
