import { ReactNode, useMemo, useState } from 'react'

import { ModifierPhases } from '@popperjs/core'
import clsx from 'clsx'
import { useCombobox, useMultipleSelection } from 'downshift'
import { usePopper } from 'react-popper'

import { MultiselectButton, MultiselectSelectedItem } from './MultiselectButton'
import { MultiselectContext } from './MultiselectContext'
import {
  MultiselectItem,
  MultiselectItems,
  MultiselectItemsEmpty,
} from './MultiselectItems'

export type MultiselectProps<Item> = {
  value: Item[]
  options: Item[]
  onChange?: (newValue: Item[]) => void
  className?: string
  children: ReactNode
  disabled?: boolean
  searchable?: boolean
  onInputChange?: (newValue: string) => void
}

/**
 * Component that displays a list of options and allows for multiple selections from this list
 */
export const Multiselect = <Item extends unknown>(
  props: MultiselectProps<Item>,
) => {
  const {
    children,
    value,
    options,
    onChange,
    className,
    disabled = false,
    searchable = false,
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

  const dsMultiple = useMultipleSelection<Item>({
    initialSelectedItems: value,
    onSelectedItemsChange: changes => {
      const newItemsLength = changes.selectedItems?.length
      if (
        typeof onChange === 'function' &&
        // Only if a tag was added or removed
        newItemsLength !== value?.length
      ) {
        onChange(changes.selectedItems)
        update?.()
      }
    },
  })

  const dsCombobox = useCombobox<Item>({
    items: options,
    selectedItem: null,
    onSelectedItemChange: changes => {
      if (
        !changes.selectedItem ||
        changes.type === useCombobox.stateChangeTypes.InputBlur
      ) {
        return
      }

      const index = dsMultiple.selectedItems.indexOf(changes.selectedItem)
      if (index > 0) {
        dsMultiple.setSelectedItems([
          ...dsMultiple.selectedItems.slice(0, index),
          ...dsMultiple.selectedItems.slice(index + 1),
        ])
      } else if (index === 0) {
        dsMultiple.setSelectedItems([...dsMultiple.selectedItems.slice(1)])
      } else {
        dsMultiple.setSelectedItems([
          ...dsMultiple.selectedItems,
          changes.selectedItem,
        ])
      }
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep menu open after selection.
            highlightedIndex: state.highlightedIndex,
            inputValue: state.inputValue, // don't add the item string as input value at selection.
          }
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            inputValue: '', // don't add the item string as input value at selection.
            isOpen: false,
          }
        case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem:
          return {
            ...changes,
            inputValue: state.inputValue,
          }
        case useCombobox.stateChangeTypes.FunctionOpenMenu:
        case useCombobox.stateChangeTypes.ToggleButtonClick:
          return changes
        default:
          return {
            ...changes,
            isOpen: state.isOpen,
          }
      }
    },
    onInputValueChange: changes => {
      if (searchable) {
        onInputChange?.(changes.inputValue)
      }
    },
  })

  return (
    <div className={clsx('relative isolate', className)} {...rest}>
      <MultiselectContext.Provider
        value={{
          ...dsMultiple,
          ...dsCombobox,
          searchable,
          disabled,
          creating: false,
          styles,
          attributes,
          setButtonElement: setTriggerRef,
          setPanelElement: setTooltipRef,
        }}
      >
        {children}
      </MultiselectContext.Provider>
    </div>
  )
}

Multiselect.Button = MultiselectButton
Multiselect.SelectedItem = MultiselectSelectedItem
Multiselect.Items = MultiselectItems
Multiselect.ItemsEmpty = MultiselectItemsEmpty
Multiselect.Item = MultiselectItem
