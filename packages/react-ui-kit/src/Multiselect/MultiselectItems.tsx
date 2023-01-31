import { ComponentProps, FC, forwardRef } from 'react'

import clsx from 'clsx'

import { CheckIcon } from '../icons'
import { Portal } from '../Portal'
import { HTMLTribeProps } from '../system'
import { runIfFn } from '../utils'
import { useMultiselect } from './MultiselectContext'

export type MultiselectItemsProps = ComponentProps<'ul'> & {
  variant?: 'default' | 'unstyled'
}
export const MultiselectItems = forwardRef<
  HTMLUListElement,
  MultiselectItemsProps
>((props, ref) => {
  const { children, className, variant = 'default', ...rest } = props
  const { isOpen, getMenuProps, styles, attributes, setPanelElement } =
    useMultiselect()

  if (variant === 'unstyled') {
    return (
      <ul
        {...getMenuProps(
          {
            ref,
            ...rest,
          },
          { suppressRefError: true },
        )}
      >
        {children}
      </ul>
    )
  }

  return (
    <Portal>
      <div ref={setPanelElement} style={styles.popper} {...attributes.popper}>
        <ul
          className={clsx(
            'w-full bg-surface-50 shadow-lg max-h-60 rounded-md py-1 text-base border border-neutral-200 overflow-auto sm:text-sm',
            'focus-visible:ring-1 focus:outline-none',
            !isOpen && 'hidden',
            className,
          )}
          {...getMenuProps(
            {
              ref,
              ...rest,
            },
            { suppressRefError: true },
          )}
        >
          {isOpen && children}
        </ul>
      </div>
    </Portal>
  )
})

export type MultiselectItemProps<T = unknown> = Omit<
  ComponentProps<'li'>,
  'value' | 'css'
> & {
  value: T
  index: number
  disabled?: boolean
}

export const MultiselectItem = forwardRef<HTMLLIElement, MultiselectItemProps>(
  (props, ref) => {
    const { value, index, children, disabled, className, ...rest } = props

    const { selectedItems, getItemProps, highlightedIndex } = useMultiselect()

    const selected = selectedItems.includes(value)
    const active = highlightedIndex === index

    return (
      <li
        className={clsx(
          active
            ? 'text-basicPrimary-500 bg-actionPrimary-600'
            : 'text-basicSurface-900',
          'cursor-default select-none relative py-2 pl-3 pr-9',
          className,
        )}
        {...getItemProps({ ref, item: value, index, disabled, ...rest })}
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
                active ? 'text-basicPrimary-500' : 'text-actionPrimary-600',
                'absolute inset-y-0 right-0 flex items-center pr-4',
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      </li>
    )
  },
)

export type MultiselectItemsEmptyProps = HTMLTribeProps<'div'>
export const MultiselectItemsEmpty: FC<MultiselectItemsEmptyProps> = props => {
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
