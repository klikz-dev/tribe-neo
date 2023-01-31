import { forwardRef, FC } from 'react'

import clsx from 'clsx'

import { CheckIcon } from '../icons'
import { Portal } from '../Portal'
import { HTMLTribeProps } from '../system'
import { getValidChildren, runIfFn } from '../utils'
import { useAutocomplete } from './AutocompleteContext'

export type AutocompleteItemsProps = React.ComponentProps<'ul'>

export const AutocompleteItems: FC<AutocompleteItemsProps> = forwardRef(
  (props, ref) => {
    const { children, className, ...rest } = props

    const {
      isOpen,
      inputValue,
      getMenuProps,
      styles,
      attributes,
      setPanelElement,
    } = useAutocomplete()

    const validChildren = getValidChildren(children)

    return (
      <Portal>
        <div ref={setPanelElement} style={styles.popper} {...attributes.popper}>
          <ul
            className={clsx(
              'w-full bg-surface-50 shadow-lg max-h-96 rounded-md text-base border border-neutral-200 overflow-auto sm:text-sm',
              'focus-visible:ring-1 focus:outline-none',
              (!isOpen || validChildren?.length === 0) && 'hidden',
              className,
            )}
            {...getMenuProps(
              { open: isOpen, ref, ...rest },
              { suppressRefError: true },
            )}
          >
            {(() => {
              if (!isOpen) {
                return null
              }

              if (!inputValue) {
                return (
                  <AutocompleteItemsEmpty>
                    Please enter a search query
                  </AutocompleteItemsEmpty>
                )
              }

              return validChildren
            })()}
          </ul>
        </div>
      </Portal>
    )
  },
)

export type AutocompleteItemProps<T> = Omit<
  React.ComponentProps<'li'>,
  'value'
> & {
  value: T
  index?: number
  disabled?: boolean
}
export const AutocompleteItem: FC<AutocompleteItemProps<unknown>> = props => {
  const { value, children, disabled, index, className, ...rest } = props

  const { selectedItem, getItemProps, highlightedIndex } = useAutocomplete()

  const selected = selectedItem === value
  const active = highlightedIndex === index

  return (
    <li
      className={clsx(
        active
          ? 'text-basicSurface-700 bg-surface-100'
          : 'text-basicSurface-700 bg-surface-50',
        'cursor-default select-none relative py-2 pl-3 pr-9',
        className,
      )}
      {...getItemProps({ item: value, index, disabled, ...rest })}
    >
      <>
        <span
          className={clsx(
            selected ? 'font-semibold' : 'font-normal',
            disabled ? 'opacity-50' : '',
            'block truncate',
          )}
        >
          {runIfFn(children, {
            selected,
            active,
          })}
        </span>

        {selected ? (
          <span
            className={clsx(
              active ? 'text-basicSurface-500' : 'text-basicSurface-600',
              'absolute inset-y-0 right-0 flex items-center pr-4',
            )}
          >
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
      </>
    </li>
  )
}

export type AutocompleteItemsEmptyProps = HTMLTribeProps<'div'>

export const AutocompleteItemsEmpty: FC<
  AutocompleteItemsEmptyProps
> = props => {
  const { children, className, ...rest } = props

  return (
    <div
      className={clsx(
        'text-basicSurface-900',
        'cursor-default select-none relative py-2 pl-3 pr-9',
        className,
      )}
      {...rest}
    >
      <span className="font-normal block truncate">{children}</span>
    </div>
  )
}
