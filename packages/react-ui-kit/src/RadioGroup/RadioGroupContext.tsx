import { createContext, useContext } from 'react'

export type RadioGroupVariant = 'list' | 'stacked-cards'

export interface RadioGroupsContext {
  variant: RadioGroupVariant
}

const RadioGroupsContext = createContext<RadioGroupsContext>(undefined)

export const RadioGroupsProvider = ({ variant, children }) => (
  <RadioGroupsContext.Provider
    value={{
      variant,
    }}
  >
    {children}
  </RadioGroupsContext.Provider>
)

export const useRadioGroups = () => {
  const context = useContext(RadioGroupsContext)
  if (context === undefined) {
    throw new Error('useRadioGroups must be used within a RadioGroupsProvider')
  }
  return context
}
