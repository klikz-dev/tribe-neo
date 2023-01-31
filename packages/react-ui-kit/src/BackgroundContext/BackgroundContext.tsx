import { createContext, ReactNode, useContext, useMemo } from 'react'

export type BackgroundType = 'main' | 'surface' | 'secondary'

export interface BackgroundContext {
  backgroundType: BackgroundType
  backgroundClsx: string[]
  text400Clsx: string[]
  text500Clsx: string[]
  text900Clsx: string[]
}

const BackgroundContext = createContext<BackgroundContext>({
  backgroundType: 'main',
  backgroundClsx: ['bg-main-50'],
  text400Clsx: ['text-basicMain-400'],
  text500Clsx: ['text-basicMain-500'],
  text900Clsx: ['text-basicMain-900'],
})

export const BackgroundProvider = ({
  backgroundType,
  children,
}: {
  backgroundType: BackgroundType
  children: ReactNode
}) => {
  const value = useMemo(() => {
    const backgroundClsx = [
      backgroundType === 'main' && 'bg-main-50',
      backgroundType === 'surface' && 'bg-surface-50',
      backgroundType === 'secondary' && 'bg-actionSecondary-50',
    ]
    const text500Clsx = [
      backgroundType === 'main' && 'text-basicMain-500',
      backgroundType === 'surface' && 'text-basicSurface-500',
      backgroundType === 'secondary' && 'text-basicSecondary-500',
    ]
    const text400Clsx = [
      backgroundType === 'main' && 'text-basicMain-400',
      backgroundType === 'surface' && 'text-basicSurface-400',
      backgroundType === 'secondary' && 'text-basicSecondary-400',
    ]
    const text900Clsx = [
      backgroundType === 'main' && 'text-basicMain-900',
      backgroundType === 'surface' && 'text-basicSurface-900',
      backgroundType === 'secondary' && 'text-basicSecondary-900',
    ]

    return {
      backgroundType,
      backgroundClsx,
      text400Clsx,
      text500Clsx,
      text900Clsx,
    }
  }, [backgroundType])

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  )
}

export const useBackgroundContext = () => {
  return useContext(BackgroundContext)
}
