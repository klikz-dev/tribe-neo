import { createContext, useContext } from 'react'

import { UseComboboxReturnValue } from 'downshift'

import { PopperContext } from '../utils'

export type SearchableSelectContext<Item> = PopperContext &
  UseComboboxReturnValue<Item> & {
    disabled: boolean
  }

export const SearchableSelectContext =
  createContext<SearchableSelectContext<unknown>>(undefined)

export const useSearchableSelect = () => {
  const context = useContext(SearchableSelectContext)
  if (context === undefined) {
    throw new Error(
      'useSearchableSelect must be used within a SearchableSelectProvider',
    )
  }
  return context
}
