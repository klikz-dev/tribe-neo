import { FC, useEffect, useState } from 'react'

import { useAuthToken } from '@tribeplatform/react-sdk/hooks'

import { getUserSettings } from '../lib/userSettings'
import { BASE_THEME } from './base.theme'
import { ThemeConvertor } from './theme-convertor'
import { Theme } from './types'
import { applyDarkMode, applyTheme } from './utils'

export type ThemeProps = {
  theme: Theme
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  toggleDarkMode: () => void
}

export const ThemeContext = React.createContext<ThemeProps>({
  theme: BASE_THEME,
  darkMode: false,
  setDarkMode: () => undefined,
  toggleDarkMode: () => undefined,
})

export const useTheme = (): ThemeProps => {
  const context = React.useContext(ThemeContext)
  return context
}

export type ThemeProviderProps = {
  customTheme?: Theme
  customDarkMode?: boolean
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  customTheme,
}) => {
  const {
    data: { network },
  } = useAuthToken()
  const { appearance } = getUserSettings()
  const { colorMode = 'light', syncColorMode = false } = appearance || {}
  const userDefinedSettings = !!appearance
  const [mode, setMode] = useState<'light' | 'dark'>(colorMode)

  useEffect(() => {
    const fn = event => {
      setMode(event.matches ? 'dark' : 'light')
    }
    // if (!userDefinedSettings) {
    //   fn(window.matchMedia('(prefers-color-scheme: dark)'))
    // }

    if (userDefinedSettings && syncColorMode) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', fn)
      return () => {
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .removeEventListener('change', fn)
      }
    }
  }, [])

  const theme =
    customTheme ||
    new ThemeConvertor({
      base: BASE_THEME,
      networkOldTheme: network?.themes?.active,
      networkTheme: network?.activeTheme,
    }).toTheme()

  useEffect(() => {
    applyTheme(document, theme, mode === 'dark')
  }, [JSON.stringify(theme), mode === 'dark'])

  useEffect(() => {
    applyDarkMode(document.documentElement, mode === 'dark')
  }, [mode])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        darkMode: mode === 'dark',
        setDarkMode: isDark => {
          setMode(isDark ? 'dark' : 'light')
        },
        toggleDarkMode: () => {
          setMode(mode === 'dark' ? 'light' : 'dark')
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
