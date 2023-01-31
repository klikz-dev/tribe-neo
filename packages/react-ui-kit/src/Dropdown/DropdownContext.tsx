import { createContext, useContext, useMemo } from 'react'

import { PopperContext } from '../utils'

export type DropdownContext = PopperContext & {
  open: boolean
  close: () => void
}

const DropdownContext = createContext<DropdownContext>(undefined)

export const DropdownProvider = ({
  open,
  styles,
  attributes,
  setButtonElement,
  setPanelElement,
  close,
  children,
}) => {
  const value = useMemo(
    () => ({
      open,
      styles,
      attributes,
      setButtonElement,
      setPanelElement,
      close,
    }),
    [open, styles, attributes, setButtonElement, setPanelElement, close],
  )

  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  )
}

export const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (context === undefined) {
    throw new Error('useDropdown must be used within a DropdownProvider')
  }
  return context
}
