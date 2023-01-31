import { ComponentProps, FC, forwardRef } from 'react'

import clsx from 'clsx'

import { Badge } from '../Badge'
import { Icon, IconProps } from '../Icon'
import { SelectorIcon, XIcon } from '../icons'
import { HTMLTribeProps } from '../system'
import { useMultiselect } from './MultiselectContext'

export type MultiselectButtonProps = ComponentProps<'button'> & {
  dense?: boolean
  leadingIcon?: IconProps
}

export const MultiselectButton = forwardRef<
  HTMLButtonElement,
  MultiselectButtonProps
>((props, ref) => {
  const {
    children,
    className,
    placeholder,
    dense = false,
    leadingIcon,
    ...rest
  } = props
  const {
    inputValue,
    searchable,
    disabled,
    isOpen,
    getComboboxProps,
    getInputProps,
    getDropdownProps,
    getToggleButtonProps,
    setSelectedItems,
    selectedItems,
    reset,
    setButtonElement,
  } = useMultiselect()

  const onKeyDown = event => {
    if (event.key === 'Backspace' && !inputValue) {
      setSelectedItems(selectedItems.slice(0, selectedItems.length - 1))
      reset()
    }
    if (event.key === 'Escape') {
      event.stopPropagation()
    }
  }

  return (
    <div ref={setButtonElement}>
      <div
        className={clsx(
          'block w-full sm:text-sm rounded-md group relative',
          'bg-surface-50 text-basicSurface-500',
          'py-2 text-left cursor-default',
          !dense && ' border-2 border-neutral-300 pl-3 pr-10',
          !disabled &&
            'focus:outline-none focus-visible:ring focus-within:ring-actionPrimary-500 focus-within:border-actionPrimary-500',
          disabled && 'opacity-60 cursor-default',
          className,
        )}
        {...getComboboxProps(getToggleButtonProps({ disabled, ref, ...rest }))}
      >
        <span className="block truncate">
          <div className="flex flex-wrap -ml-2 -mt-2">
            {leadingIcon && (
              <Icon
                className={clsx('ml-2 mt-2', 'h-5 w-5', !!children && 'mr-1')}
              >
                {leadingIcon}
              </Icon>
            )}
            {children}
            <input
              className={clsx(
                'placeholder-basicSurface-300 focus:outline-none bg-transparent flex-1 ml-2 mt-2',
                !searchable && ' caret-transparent',
              )}
              {...getInputProps({
                ...getDropdownProps({
                  preventKeyAction: isOpen,
                }),
                placeholder,
                disabled,
                onKeyDown,
              })}
              readOnly={!searchable}
            />
          </div>
        </span>
        {!dense && (
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            aria-label="toggle menu"
          >
            <SelectorIcon
              className="w-5 h-5 text-basicSurface-400"
              aria-hidden="true"
            />
          </span>
        )}
      </div>
    </div>
  )
})

export type MultiselectSelectedItemProps = HTMLTribeProps<'div'> & {
  value: unknown
  index: number
  disabled?: boolean
}

export const MultiselectSelectedItem: FC<
  MultiselectSelectedItemProps
> = props => {
  const { value, index, children, className, ...rest } = props

  const { removeSelectedItem, getSelectedItemProps } = useMultiselect()

  return (
    <Badge
      rounded
      trailingIcon={
        <Badge.Button
          onClick={e => {
            e.stopPropagation()
            removeSelectedItem(value)
          }}
        >
          <span className="sr-only">Remove option</span>
          <Icon className="h-2 w-2">
            <XIcon />
          </Icon>
        </Badge.Button>
      }
      className={clsx('ml-2 mt-2 truncate', className)}
      {...rest}
      {...getSelectedItemProps({ selectedItem: value, index })}
    >
      <div className="truncate">{children}</div>
    </Badge>
  )
}
