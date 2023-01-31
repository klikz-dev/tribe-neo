import {
  CSSProperties,
  forwardRef,
  Fragment,
  ReactNode,
  useMemo,
  useState,
  FC,
  createRef,
} from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { ModifierPhases } from '@popperjs/core'
import clsx from 'clsx'
import { usePopper } from 'react-popper'
import { twMerge } from 'tailwind-merge'

import { CheckIcon, SelectorIcon } from '../icons'
import { Portal } from '../Portal'
import { HTMLTribeProps } from '../system'
import { runIfFn } from '../utils'
import { SelectProvider, useSelect } from './SelectContext'

export type SelectProps<T> = {
  value: T
  onChange: (newValue: T) => void
  className?: string
  children: ReactNode
  disabled?: boolean
  popperStyles?: CSSProperties
  placeholder?: string
  items?: Array<{ value: string; text: string | ReactNode }>
  invalid?: boolean
  name?: string
}

/**
 * The Select component is a component that allows users pick a value from predefined options.
 */
export const Select = <T extends unknown>(props: SelectProps<T>) => {
  const {
    children,
    className,
    popperStyles,
    value,
    placeholder,
    items,
    invalid = false,
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

  return (
    <Listbox {...rest} value={value}>
      {renderProps => {
        let content
        if (items) {
          content = (
            <>
              <SelectButton placeholder={placeholder}>
                {items.find(item => value === item.value)?.text || null}
              </SelectButton>
              <SelectItems>
                {items.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.text}
                  </SelectItem>
                ))}
              </SelectItems>
            </>
          )
        } else {
          content = runIfFn(children, renderProps)
        }

        return (
          <div className={twMerge(clsx('relative isolate', className))}>
            <SelectProvider
              open={renderProps.open}
              invalid={invalid}
              styles={{
                ...styles,
                popper: {
                  ...styles.popper,
                  ...popperStyles,
                },
              }}
              attributes={attributes}
              setButtonElement={setTriggerRef}
              setPanelElement={setTooltipRef}
            >
              {content}
            </SelectProvider>
          </div>
        )
      }}
    </Listbox>
  )
}

export type SelectButtonProps = HTMLTribeProps<'button'> & {
  arrowsClassname?: string
}

const SelectButton: FC<SelectButtonProps> = props => {
  const { children, className, placeholder, arrowsClassname, ...rest } = props
  const { invalid, setButtonElement } = useSelect()

  return (
    <div ref={setButtonElement}>
      <Listbox.Button
        className={twMerge(
          clsx(
            'relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default',
            'focus:outline-none focus-visible:ring',
            !invalid && 'border border-neutral-300',
            invalid &&
              'border border-danger-300 text-danger-900 placeholder-danger-300 focus:outline-none focus:ring-danger-500 focus:border-danger-500',
            'text-basicSurface-500 bg-surface-50',
            className,
          ),
        )}
        {...rest}
      >
        {({ disabled }) => (
          <>
            <span
              className={clsx('block truncate', disabled ? 'opacity-50' : '')}
            >
              {children || (
                <div className="text-basicSurface-300">
                  {placeholder || '\u00A0'}
                </div>
              )}
            </span>
            <span
              className={clsx(
                'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
                arrowsClassname,
              )}
            >
              <SelectorIcon
                className="w-5 h-5 text-basicSurface-400"
                aria-hidden="true"
              />
            </span>
          </>
        )}
      </Listbox.Button>
    </div>
  )
}

export type SelectItemsProps = HTMLTribeProps<'ul'> & {
  transitionProps?: any
  usePortal?: boolean
}

const SelectItems: FC<SelectItemsProps> = forwardRef((props, ref) => {
  const {
    children,
    className,
    transitionProps,
    usePortal = true,
    ...rest
  } = props

  const { open, styles, attributes, setPanelElement } = useSelect()
  const panelRef = createRef<HTMLDivElement>()

  const content = (
    <div ref={panelRef} style={styles.popper} {...attributes.popper}>
      <Transition
        show={open}
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        beforeEnter={() => setPanelElement(panelRef.current)}
        afterLeave={() => setPanelElement(null)}
        {...transitionProps}
      >
        <Listbox.Options
          className={twMerge(
            clsx(
              'w-full text-basicSurface-500 bg-surface-50 shadow-lg max-h-60 rounded-md py-1 text-base border border-neutral-200 overflow-auto',
              'focus-visible:ring-1 focus:outline-none',
              className,
            ),
          )}
          {...rest}
          ref={ref}
        >
          {children}
        </Listbox.Options>
      </Transition>
    </div>
  )

  return usePortal ? <Portal>{content}</Portal> : content
})

export type SelectItemProps<T> = Omit<HTMLTribeProps<'li'>, 'value'> & {
  value: T
  disabled?: boolean
  className?: string
}

const SelectItem: FC<SelectItemProps<unknown>> = props => {
  const { value, children, disabled, className, ...rest } = props

  return (
    <Listbox.Option
      className={({ active }) =>
        clsx(
          active
            ? 'text-basicPrimary-500 bg-actionPrimary-600'
            : 'text-basicSurface-900',
          'cursor-default select-none relative py-2 pl-3 pr-9',
          className,
        )
      }
      value={value}
      disabled={disabled}
      {...rest}
    >
      {({ selected, active }) => (
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
      )}
    </Listbox.Option>
  )
}

Select.Button = SelectButton
Select.Items = SelectItems
Select.Item = SelectItem
