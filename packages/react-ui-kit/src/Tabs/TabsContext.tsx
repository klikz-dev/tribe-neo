import { createContext, useContext } from 'react'

export const TAB_VARIANTS = ['bar', 'pills', 'pills-accent'] as const
export type TabVariant = typeof TAB_VARIANTS[number]

export const TAB_SIZES = ['sm', 'md'] as const
export type TabSize = typeof TAB_SIZES[number]

export interface TabsContext {
  variant: TabVariant
  size: TabSize
  fullWidth?: boolean
}

const TabsContext = createContext<TabsContext>(undefined)

export const TabsProvider = ({ variant, size, fullWidth, children }) => (
  <TabsContext.Provider
    value={{
      variant,
      size,
      fullWidth,
    }}
  >
    {children}
  </TabsContext.Provider>
)

export const useTabs = () => {
  const context = useContext(TabsContext)
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabsProvider')
  }
  return context
}
