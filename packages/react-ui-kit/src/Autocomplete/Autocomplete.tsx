import { FC, ReactNode, useMemo, useState } from 'react'

import { ModifierPhases } from '@popperjs/core'
import clsx from 'clsx'
import { useCombobox } from 'downshift'
import { usePopper } from 'react-popper'

import { IconProps } from '../Icon'
import { XIcon } from '../icons'
import { Input } from '../Input'
import { AutocompleteContext, useAutocomplete } from './AutocompleteContext'
import {
  AutocompleteItem,
  AutocompleteItems,
  AutocompleteItemsEmpty,
} from './AutocompleteItems'

export type AutocompleteProps<Item> = {
  itemToString: (newValue: Item) => string
  value: Item
  options: Item[]
  onChange: (newValue: Item) => void
  className?: string
  children: ReactNode
  disabled?: boolean
  onInputChange?: (newValue: string) => void
  loading?: boolean
}

/**
 * The Autocomplete component is suitable for search, it does not have predefined options
 */

export const Autocomplete = <Item,>(props: AutocompleteProps<Item>) => {
  const {
    itemToString,
    children,
    // value,
    options,
    onChange,
    className,
    disabled = false,
    loading = false,
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

  const { styles, attributes } = usePopper(triggerRef, tooltipRef, {
    placement: 'bottom-start',
    modifiers,
  })

  const dsCombobox = useCombobox<Item>({
    itemToString,
    items: options,
    onSelectedItemChange: changes => {
      onChange(changes.selectedItem)
    },
    onInputValueChange: changes => {
      onInputChange?.(changes.inputValue)
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownArrowDown:
        case useCombobox.stateChangeTypes.InputKeyDownArrowUp:
          // quick & dirty scroll when the focused element is under the sticky element
          if (changes.highlightedIndex === 0) {
            const list = tooltipRef.querySelector('ul')
            list.scrollTop = 0
          }
          return changes
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            inputValue: '', // don't add the item string as input value at selection.
          }
        default:
          return changes
      }
    },
  })

  return (
    <div className={clsx('relative isolate', className)} {...rest}>
      <AutocompleteContext.Provider
        value={{
          ...dsCombobox,
          disabled,
          loading,
          styles,
          attributes,
          setButtonElement: setTriggerRef,
          setPanelElement: setTooltipRef,
        }}
      >
        {children}
      </AutocompleteContext.Provider>
    </div>
  )
}

export type AutocompleteInputProps = React.ComponentProps<'input'> & {
  leadingIcon?: IconProps
  onEnter?: ({ highlightedIndex: number, inputValue: string }) => void
}

export const AutocompleteInput: FC<AutocompleteInputProps> = props => {
  const { className, placeholder, leadingIcon, onEnter, ...rest } = props
  const {
    selectedItem,
    disabled,
    getComboboxProps,
    getInputProps,
    reset,
    highlightedIndex,
    inputValue,
    setButtonElement,
  } = useAutocomplete()

  const clearButton = (
    <button
      type="button"
      className="absolute inset-y-0 right-0 flex items-center px-2 rounded-md"
      aria-label="clear selection"
      onClick={e => {
        e.stopPropagation()
        reset()
      }}
    >
      <XIcon className="w-5 h-5 text-basicSurface-400" aria-hidden="true" />
    </button>
  )

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      onEnter?.({ highlightedIndex, inputValue })
    }
  }

  return (
    <div ref={setButtonElement}>
      <div {...getComboboxProps({ disabled })}>
        <Input
          {...getInputProps({
            placeholder,
            disabled,
            className,
            onKeyDown,
            ...rest,
          })}
          leadingIcon={leadingIcon}
          trailingIcon={selectedItem && clearButton}
        />
      </div>
    </div>
  )
}

Autocomplete.Input = AutocompleteInput
Autocomplete.Items = AutocompleteItems
Autocomplete.ItemsEmpty = AutocompleteItemsEmpty
Autocomplete.Item = AutocompleteItem
