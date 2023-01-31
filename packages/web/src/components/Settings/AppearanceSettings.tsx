import { useEffect, useState } from 'react'

import MoonIcon from '@heroicons/react/outline/MoonIcon'
import SunIcon from '@heroicons/react/outline/SunIcon'

import { Form } from '@tribeplatform/react-sdk/components'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { RadioGroup } from '@tribeplatform/react-ui-kit/RadioGroup'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

import { getUserSettings, setUserSetting } from '../../lib/userSettings'
import { useTheme } from '../../themes/ThemeProvider.component'

export const AppearanceSettings = () => {
  const { darkMode, setDarkMode } = useTheme()
  const { appearance = { colorMode: 'light', syncColorMode: true } } =
    getUserSettings() || {}

  const [deviceColorMode, setDeviceColorMode] = useState('light')
  const [syncColorMode, setSyncColorMode] = useState(
    appearance.syncColorMode || false,
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const event = window.matchMedia('(prefers-color-scheme: dark)')
      setDeviceColorMode(event?.matches ? 'dark' : 'light')
    }
  }, [])

  return (
    <div className="flex flex-col space-y-5">
      <Card>
        <Card.Header title="Dark mode" />
        <Card.Content>
          <Form
            defaultValues={{
              colorMode: darkMode ? 'dark' : 'light',
              syncColorMode: appearance.syncColorMode,
            }}
            onSubmit={async ({ colorMode, syncColorMode }) => {
              setDarkMode(colorMode === 'dark')
              setUserSetting('appearance', {
                colorMode,
                syncColorMode,
              })
              toast({
                icon: colorMode === 'dark' ? <MoonIcon /> : <SunIcon />,
                title: 'Appearance updated',
                description: `You look nice ${
                  colorMode === 'dark' ? 'tonight' : 'today'
                }.`,
              })
            }}
            className="flex flex-col space-y-5"
          >
            {({ getValues, setValue }) => {
              return (
                <>
                  <Form.Checkbox
                    name="syncColorMode"
                    label="Sync with OS settings"
                    helperText="Automatically switch between light and dark themes when your system does."
                    onChange={() => {
                      const { syncColorMode = false } = getValues() || {}
                      setSyncColorMode(!syncColorMode)
                      if (!syncColorMode) {
                        setValue('colorMode', deviceColorMode)
                      }
                    }}
                  />

                  <Form.RadioGroup name="colorMode">
                    <RadioGroup.Items>
                      <RadioGroup.Item
                        value="light"
                        title="Light"
                        disabled={syncColorMode}
                        description={
                          syncColorMode && deviceColorMode === 'light'
                            ? 'Chosen automatically by your OS.'
                            : ''
                        }
                      />
                      <RadioGroup.Item
                        value="dark"
                        title="Dark"
                        disabled={syncColorMode}
                        description={
                          syncColorMode && deviceColorMode === 'dark'
                            ? 'Chosen automatically by your OS.'
                            : ''
                        }
                      />
                    </RadioGroup.Items>
                  </Form.RadioGroup>
                  <Form.Actions>
                    <Button type="submit" size="lg">
                      Update
                    </Button>
                  </Form.Actions>
                </>
              )
            }}
          </Form>
        </Card.Content>
      </Card>
    </div>
  )
}
