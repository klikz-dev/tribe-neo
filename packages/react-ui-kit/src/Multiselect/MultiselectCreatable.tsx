import { ReactNode, useMemo, useState, FC, useEffect } from 'react'

import { ModifierPhases } from '@popperjs/core'
import clsx from 'clsx'
import { useCombobox, useMultipleSelection } from 'downshift'
import { usePopper } from 'react-popper'

import { Portal } from '../Portal'
import { HTMLTribeProps } from '../system'
import { runIfFn } from '../utils'
import { MultiselectButton, MultiselectSelectedItem } from './MultiselectButton'
import { MultiselectContext, useMultiselect } from './MultiselectContext'
import { MultiselectItem, MultiselectItemsEmpty } from './MultiselectItems'

export type MultiselectCreatableProps = {
  value: string[]
  options: string[]
  onChange?: (newValue: string[]) => void
  className?: string
  children: ReactNode
  disabled?: boolean
  searchable?: boolean
  onInputChange?: (newValue: string) => void
  onCreateItem?: (newItem: string) => void
  /**
   * Sets the position of the createOption element in your options list.
   * @default 'last'
   */
  createItemPosition?: 'first' | 'last'
}

export const MultiselectCreatable = (props: MultiselectCreatableProps) => {
  const {
    children,
    value,
    options,
    onChange,
    className,
    disabled = false,
    searchable = false,
    onInputChange,
    onCreateItem,
    createItemPosition = 'last',
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

  const [creating, setCreating] = useState(false)
  const [inputItems, setInputItems] = useState(options)

  const dsMultiple = useMultipleSelection<string>({
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
    stateReducer: (_, actionAndChanges) => {
      const { type, changes } = actionAndChanges
      switch (type) {
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          return {
            ...changes,
            activeIndex: null,
          }
        default:
          return changes
      }
    },
  })

  const dsCombobox = useCombobox<string>({
    items: inputItems,
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
            inputValue: '', // don't add the item string as input value at selection.
          }
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            inputValue: '', // don't add the item string as input value at selection.
          }
        default:
          return changes
      }
    },
    onInputValueChange: changes => {
      setCreating(false)
      setInputItems([])

      if (searchable) {
        onInputChange?.(changes.inputValue)
      }
    },
    onStateChange: changes => {
      const { type } = changes
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (onCreateItem && creating) {
            onCreateItem(inputValue)
            setCreating(false)
          }
          break
        default:
          break
      }
    },
  })

  const { inputValue, setHighlightedIndex } = dsCombobox

  useEffect(() => {
    if (inputValue.length > 0) {
      if (!options.includes(inputValue)) {
        setCreating(true)
        if (createItemPosition === 'last') {
          setInputItems([...options, inputValue])
        } else {
          setInputItems([inputValue, ...options])
        }
        setHighlightedIndex(0)
      } else {
        setInputItems(options)
        setCreating(false)
      }
    } else {
      setInputItems(options)
    }
  }, [options, inputValue, createItemPosition, setHighlightedIndex])

  return (
    <div className={clsx('relative isolate', className)} {...rest}>
      <MultiselectContext.Provider
        value={{
          ...dsMultiple,
          ...dsCombobox,
          searchable,
          disabled,
          creating,
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

export type MultiselectCreatableItemsProps = HTMLTribeProps<'ul'>

const MultiselectCreatableItems: FC<MultiselectCreatableItemsProps> = props => {
  const { children, className, ...rest } = props
  const {
    isOpen,
    getMenuProps,
    creating,
    inputValue,
    styles,
    attributes,
    setPanelElement,
  } = useMultiselect()

  return (
    <Portal>
      <div ref={setPanelElement} style={styles.popper} {...attributes.popper}>
        <ul
          className={clsx(
            'w-full bg-surface-50 shadow-lg max-h-60 rounded-md py-1 text-base border overflow-auto sm:text-sm',
            'focus-visible:ring-1 focus:outline-none',
            !isOpen && 'hidden',
            className,
          )}
          {...getMenuProps({}, { suppressRefError: true })}
          {...rest}
        >
          {isOpen && runIfFn(children, { creating, inputValue })}
        </ul>
      </div>
    </Portal>
  )
}

MultiselectCreatable.Button = MultiselectButton
MultiselectCreatable.SelectedItem = MultiselectSelectedItem
MultiselectCreatable.Items = MultiselectCreatableItems
MultiselectCreatable.ItemsEmpty = MultiselectItemsEmpty
MultiselectCreatable.Item = MultiselectItem
