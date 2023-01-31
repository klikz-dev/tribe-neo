import { ComponentProps, createRef, FC, Fragment, useState } from 'react'

import { Menu, Transition } from '@headlessui/react'
import DotsHorizontalIcon from '@heroicons/react/outline/DotsHorizontalIcon'
import { Placement } from '@popperjs/core'
import clsx from 'clsx'
import { usePopper } from 'react-popper'
import { twMerge } from 'tailwind-merge'

import { useBackgroundContext } from '../BackgroundContext'
import { Icon, IconProps } from '../Icon'
import { ChevronDownIcon } from '../icons'
import { Portal } from '../Portal'
import { HTMLTribeProps } from '../system'
import { runIfFn } from '../utils'
import { DropdownProvider, useDropdown } from './DropdownContext'

export type DropdownProps = HTMLTribeProps<'div'> & {
  /**
   * Alias for popper.js placement, see https://popper.js.org/docs/v2/constructors/#placement
   */
  placement?: Placement
}

/**
 * Menus offer an easy way to build custom, accessible dropdown components with robust support for keyboard navigation.
 */
export const Dropdown = (props: DropdownProps) => {
  const { children, as, className, placement = 'bottom-start' } = props

  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(triggerRef, tooltipRef, {
    placement,
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
  })

  return (
    <Menu
      as={as || 'div'}
      className={clsx('relative inline-block text-left', className)}
    >
      {renderProps => (
        <DropdownProvider
          open={renderProps.open}
          styles={styles}
          attributes={attributes}
          setButtonElement={setTriggerRef}
          setPanelElement={setTooltipRef}
          close={() => triggerRef?.click()}
        >
          {runIfFn(children, renderProps)}
        </DropdownProvider>
      )}
    </Menu>
  )
}

export type ButtonProps = ComponentProps<'button'> & {
  icon?: IconProps
}

const Button: FC<ButtonProps> = props => {
  const { children, icon, className, ...rest } = props
  const { setButtonElement } = useDropdown()

  const { backgroundType } = useBackgroundContext()
  const buttonClsx = [
    backgroundType === 'main' &&
      'text-basicMain-700 bg-main-50 hover:bg-main-100',
    backgroundType === 'surface' &&
      'text-basicSurface-700 bg-surface-50 hover:bg-surface-100',
    backgroundType === 'secondary' &&
      'text-basicSecondary-700 bg-actionSecondary-50 hover:bg-actionSecondary-100',
  ]

  return (
    <Menu.Button
      ref={setButtonElement}
      className={twMerge(
        clsx(
          'inline-flex justify-center items-center w-full rounded-md border border-neutral-300 shadow-sm px-4 py-2 text-sm font-medium ',
          buttonClsx,
          'focus:outline-none focus-visible:ring',
          className,
        ),
      )}
      {...rest}
    >
      <span className="sr-only">Open options</span>
      {children}
      <Icon className="-mr-1 ml-2 h-5 w-5">{icon || <ChevronDownIcon />}</Icon>
    </Menu.Button>
  )
}

const ButtonMinimal: FC<ButtonProps> = props => {
  const { className, children, ...rest } = props
  const { setButtonElement } = useDropdown()

  const { backgroundType } = useBackgroundContext()
  const buttonClsx = [
    backgroundType === 'main' && 'text-basicMain-400 hover:text-basicMain-600',
    backgroundType === 'surface' &&
      ' text-basicSurface-400 hover:text-basicSurface-600',
    backgroundType === 'secondary' &&
      ' text-basicSecondary-400 hover:text-basicSecondary-600',
  ]

  return (
    <Menu.Button
      ref={setButtonElement}
      className={twMerge(
        clsx(
          'rounded-full flex items-center',
          buttonClsx,
          'focus:outline-none focus-visible:ring',
          className,
        ),
      )}
      {...rest}
    >
      {children || (
        <>
          <span className="sr-only">Open options</span>
          <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </>
      )}
    </Menu.Button>
  )
}

export type DropdownItemsProps = ComponentProps<'div'>

const Items: FC<DropdownItemsProps> = props => {
  const { children, className, ...rest } = props

  const { open, styles, attributes, setPanelElement } = useDropdown()
  const panelRef = createRef<HTMLDivElement>()

  return (
    <Portal>
      <div ref={panelRef} style={styles.popper} {...attributes.popper}>
        <Transition
          show={open}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          beforeEnter={() => setPanelElement(panelRef.current)}
          afterLeave={() => setPanelElement(null)}
        >
          <Menu.Items
            static
            className={clsx(
              'py-1 rounded-md shadow-lg bg-surface-50 border border-neutral-200',
              'focus-visible:ring focus:outline-none',
              className,
            )}
            {...rest}
          >
            {children}
          </Menu.Items>
        </Transition>
      </div>
    </Portal>
  )
}

export type DropdownItemProps = HTMLTribeProps<'a'> & {
  disabled?: boolean
  leadingIcon?: IconProps
}

const Item: FC<DropdownItemProps> = props => {
  const { as, children, leadingIcon, disabled, className, ...rest } = props

  const Component = as || 'a'

  return (
    <Menu.Item disabled={disabled}>
      {({ active }) => (
        <Component
          className={clsx(
            active
              ? 'bg-surface-100 text-basicSurface-900'
              : 'bg-surface-50 text-basicSurface-700',
            'flex items-center px-4 py-2',
            disabled
              ? 'opacity-60 cursor-default pointer-events-none'
              : 'cursor-pointer',
            className,
          )}
          {...rest}
        >
          {leadingIcon && (
            <Icon className="mr-3 h-5 w-5 text-basicSurface-400 group-hover:text-basicSurface-500">
              {leadingIcon}
            </Icon>
          )}
          {children}
        </Component>
      )}
    </Menu.Item>
  )
}

Dropdown.Button = Button
Dropdown.ButtonMinimal = ButtonMinimal
Dropdown.Items = Items
Dropdown.Item = Item
