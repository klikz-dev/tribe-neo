import { createContext, useMemo, useContext } from 'react'

import { PopperContext } from '../utils'

export type SelectContext = PopperContext & {
  open: boolean
  invalid?: boolean
}

const SelectContext = createContext<SelectContext>(undefined)

export const SelectProvider = ({
  open,
  invalid,
  styles,
  attributes,
  setButtonElement,
  setPanelElement,
  children,
}) => {
  const value = useMemo(
    () => ({
      open,
      invalid,
      styles,
      attributes,
      setButtonElement,
      setPanelElement,
    }),
    [open, invalid, styles, attributes, setButtonElement, setPanelElement],
  )

  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  )
}

export const useSelect = () => {
  const context = useContext(SelectContext)
  if (context === undefined) {
    throw new Error('useSelect must be used within a SelectProvider')
  }
  return context
}
