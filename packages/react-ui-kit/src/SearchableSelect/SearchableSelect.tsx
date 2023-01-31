import { ReactNode, useMemo, useState } from 'react'

import { ModifierPhases } from '@popperjs/core'
import clsx from 'clsx'
import { useCombobox } from 'downshift'
import { usePopper } from 'react-popper'

import { SearchableSelectButton } from './SearchableSelectButton'
import { SearchableSelectContext } from './SearchableSelectContext'
import {
  SearchableSelectItem,
  SearchableSelectItems,
  SearchableSelectItemsEmpty,
} from './SearchableSelectItems'

export type SearchableSelectProps<Item> = {
  value: Item
  options: Item[]
  onChange: (newValue: Item) => void
  className?: string
  children: ReactNode
  disabled?: boolean
  onInputChange?: (newValue: string) => void
}

/**
 * The SearchableSelect component is a component that allows users pick a value from predefined options.
 */

export const SearchableSelect = <Item,>(props: SearchableSelectProps<Item>) => {
  const {
    children,
    // value,
    options,
    onChange,
    className,
    disabled = false,
    onInputChange,
    ...rest
  } = props

  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLElement | null>(null)

  const modifiers = useMemo(
    () => [
      { name: 'offset', options: { offset: [0, 4] } },
      {
        // https://github.com/popperjs/popper-core/issues/794
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite' as ModifierPhases,
        requires: ['computeStyles'],
        fn({ state }) {
          state.styles.popper.minWidth = `${state.rects.reference.width}px`
        },
        effect({ state }) {
          state.elements.popper.style.minWidth = `${state.elements.reference.offsetWidth}px`
          state.elements.popper.style.maxWidth = `${state.elements.reference.offsetWidth}px`
        },
      },
    ],
    [],
  )

  const { styles, attributes, ...popperProps } = usePopper(
    triggerRef,
    tooltipRef,
    {
      placement: 'bottom-start',
      modifiers,
    },
  )
  const { update } = popperProps

  const dsCombobox = useCombobox<Item>({
    items: options,
    onSelectedItemChange: changes => {
      onChange(changes.selectedItem)
      update?.()
    },
    onInputValueChange: changes => {
      onInputChange?.(changes.inputValue)
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            inputValue: '',
          }
        default:
          return changes
      }
    },
  })

  return (
    <div className={clsx('relative isolate', className)} {...rest}>
      <SearchableSelectContext.Provider
        value={{
          ...dsCombobox,
          disabled,
          styles,
          attributes,
          setButtonElement: setTriggerRef,
          setPanelElement: setTooltipRef,
        }}
      >
        {children}
      </SearchableSelectContext.Provider>
    </div>
  )
}

SearchableSelect.Button = SearchableSelectButton
SearchableSelect.Items = SearchableSelectItems
SearchableSelect.ItemsEmpty = SearchableSelectItemsEmpty
SearchableSelect.Item = SearchableSelectItem
