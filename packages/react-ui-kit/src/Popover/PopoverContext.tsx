import { createContext, useContext } from 'react'

import { PopperContext } from '../utils'

export const POPOVER_PADDINGS = ['sm', 'md', 'lg'] as const
export type PopoverPadding = typeof POPOVER_PADDINGS[number]

export const POPOVER_TRIGGER_TYPE = ['click', 'hover'] as const
export type PopoverTriggerType = typeof POPOVER_TRIGGER_TYPE[number]

export type PopoverContext = PopperContext & {
  open: boolean
  onOpen: () => void
  onClose: () => void

  padding: PopoverPadding
}

export const PopoverContext = createContext<PopoverContext>(undefined)

export const usePopover = () => {
  const context = useContext(PopoverContext)
  if (context === undefined) {
    throw new Error('usePopover must be used within a PopoverProvider')
  }
  return context
}
