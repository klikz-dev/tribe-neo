import { createContext, useContext } from 'react'

export type ListSpacing = 'sm' | 'md' | 'none'
export type ListDirection = 'vertical' | 'horizontal'

export interface ListContext {
  spacing: ListSpacing
  direction: ListDirection
}

const ListContext = createContext<ListContext>(undefined)

export const ListProvider = ({ spacing, direction, children }) => (
  <ListContext.Provider
    value={{
      spacing,
      direction,
    }}
  >
    {children}
  </ListContext.Provider>
)

export const useList = () => {
  const context = useContext(ListContext)
  if (context === undefined) {
    throw new Error('useList must be used within a ListProvider')
  }
  return context
}
