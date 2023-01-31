import { forwardRef, FC, cloneElement } from 'react'

import clsx from 'clsx'

import { CheckIcon } from '../icons'
import { Portal } from '../Portal'
import { HTMLTribeProps } from '../system'
import { getValidChildren, runIfFn } from '../utils'
import { useSearchableSelect } from './SearchableSelectContext'

export type SearchableSelectItemsProps = HTMLTribeProps<'ul'> & {
  static?: boolean
}
export const SearchableSelectItems = forwardRef<
  HTMLUListElement,
  SearchableSelectItemsProps
>((props, ref) => {
  const { children, className, static: staticProp = false, ...rest } = props

  const { isOpen, getMenuProps, styles, attributes, setPanelElement } =
    useSearchableSelect()

  const validChildren = getValidChildren(children)

  const clones = validChildren.map((child, index) => {
    const childProps = {
      index,
      ...child.props,
    }

    return cloneElement(child, childProps)
  })

  const open = isOpen || staticProp

  return (
    <Portal>
      <div ref={setPanelElement} style={styles.popper} {...attributes.popper}>
        <ul
          className={clsx(
            'w-full bg-surface-50 shadow-lg max-h-60 rounded-md py-1 text-base border border-neutral-200 overflow-auto sm:text-sm',
            'focus-visible:ring-1 focus:outline-none',
            !open && 'hidden',
            className,
          )}
          ref={ref}
          {...getMenuProps({}, { suppressRefError: true })}
          {...rest}
        >
          {open && clones}
        </ul>
      </div>
    </Portal>
  )
})

export type SearchableSelectItemProps<T> = Omit<
  HTMLTribeProps<'li'>,
  'value'
> & {
  value: T
  index?: number
  disabled?: boolean
}
export const SearchableSelectItem: FC<
  SearchableSelectItemProps<unknown>
> = props => {
  const { value, children, disabled, index, className, ...rest } = props

  const { selectedItem, getItemProps, highlightedIndex } = useSearchableSelect()

  const selected = selectedItem === value
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
      {...getItemProps({ item: value, index, disabled })}
      {...rest}
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
}

export type SearchableSelectItemsEmptyProps = HTMLTribeProps<'div'>

export const SearchableSelectItemsEmpty: FC<
  SearchableSelectItemsEmptyProps
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
