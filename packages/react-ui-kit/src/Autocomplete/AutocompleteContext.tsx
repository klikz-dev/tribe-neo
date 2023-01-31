import { createContext, useContext } from 'react'

import { UseComboboxReturnValue } from 'downshift'

import { PopperContext } from '../utils'

export type AutocompleteContext<Item> = PopperContext &
  UseComboboxReturnValue<Item> & {
    disabled: boolean
    loading: boolean
  }

export const AutocompleteContext =
  createContext<AutocompleteContext<unknown>>(undefined)

export const useAutocomplete = () => {
  const context = useContext(AutocompleteContext)
  if (context === undefined) {
    throw new Error(
      'useAutocomplete must be used within a AutocompleteProvider',
    )
  }
  return context
}
