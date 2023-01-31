import { createContext, useContext } from 'react'

import { PopperContext } from '../utils'

export type TooltipContext = PopperContext & {
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export const TooltipContext = createContext<TooltipContext>(undefined)

export const useTooltip = () => {
  const context = useContext(TooltipContext)
  if (context === undefined) {
    throw new Error('useTooltip must be used within a TooltipProvider')
  }
  return context
}
