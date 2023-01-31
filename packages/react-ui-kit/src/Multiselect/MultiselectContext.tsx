import { createContext, useContext } from 'react'

import {
  UseComboboxReturnValue,
  UseMultipleSelectionReturnValue,
} from 'downshift'

import { PopperContext } from '../utils'

export type MultiselectContext<Item> = PopperContext &
  UseMultipleSelectionReturnValue<Item> &
  UseComboboxReturnValue<Item> & {
    searchable: boolean
    disabled: boolean
    creating: boolean
  }

export const MultiselectContext =
  createContext<MultiselectContext<unknown>>(undefined)

export const useMultiselect = () => {
  const context = useContext(MultiselectContext)
  if (context === undefined) {
    throw new Error('useMultiselect must be used within a MultiselectProvider')
  }
  return context
}
