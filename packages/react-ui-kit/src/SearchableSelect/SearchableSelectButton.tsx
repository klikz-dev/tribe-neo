import { ComponentProps, forwardRef } from 'react'

import clsx from 'clsx'

import { SelectorIcon, XIcon } from '../icons'
import { useSearchableSelect } from './SearchableSelectContext'

export type SearchableSelectButtonProps = ComponentProps<'button'> & {
  dense?: boolean
}

export const SearchableSelectButton = forwardRef<
  HTMLButtonElement,
  SearchableSelectButtonProps
>((props, ref) => {
  const { children, className, placeholder, dense = false, ...rest } = props
  const {
    inputValue,
    disabled,
    // isOpen,
    getComboboxProps,
    getInputProps,
    getToggleButtonProps,
    selectedItem,
    reset,
    setButtonElement,
  } = useSearchableSelect()

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

  const toggleButton = (
    <span
      className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
      aria-label="toggle menu"
    >
      <SelectorIcon
        className="w-5 h-5 text-basicSurface-400"
        aria-hidden="true"
      />
    </span>
  )

  return (
    <div ref={setButtonElement}>
      <div
        className={clsx(
          'block w-full rounded-md group relative',
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
          <div className="flex space-x-2">
            {selectedItem && !inputValue && (
              <div className="flex-shrink-0">{children}</div>
            )}
            <input
              className={clsx(
                'placeholder-basicSurface-300 focus:outline-none bg-transparent flex-1 overflow-hidden',
              )}
              {...getInputProps({
                placeholder: selectedItem ? '' : placeholder,
                disabled,
                onKeyDown: event => {
                  if (event.key === 'Backspace' && !inputValue) {
                    reset()
                  }
                },
              })}
            />
          </div>
        </span>
        {!dense && (selectedItem ? clearButton : toggleButton)}
      </div>
    </div>
  )
})
