import { FC } from 'react'

import { Disclosure, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { useBackgroundContext } from '../BackgroundContext'
import { ChevronDownIcon } from '../icons'
import { HTMLTribeProps } from '../system'

export type AccordionProps = HTMLTribeProps<'div'>

/**
 * Accordions display a list of high-level options that can expand/collapse to reveal more information.
 */
export const Accordion = (props: AccordionProps) => {
  const { as, children, className, ...rest } = props
  const Component = as || 'div'

  return (
    <Disclosure
      as={Component}
      className={clsx('space-y-1', className)}
      {...rest}
    >
      {children}
    </Disclosure>
  )
}

export type AccordionButtonProps = HTMLTribeProps<'button'>

/**
 *  The button that toggles the expand/collapse state of the accordion item.
 */
const AccordionButton = (props: AccordionButtonProps) => {
  const { children, className, ...rest } = props

  const { backgroundType } = useBackgroundContext()

  const hoverClsx = [
    backgroundType === 'main' &&
      'text-basicMain-600 bg-main-50 hover:bg-main-100 hover:text-basicMain-900',
    backgroundType === 'surface' &&
      'text-basicSurface-600 bg-surface-50 hover:bg-surface-100 hover:text-basicSurface-900',
    backgroundType === 'secondary' &&
      'text-basicSecondary-600 bg-actionSecondary-50 hover:bg-actionSecondary-100 hover:text-basicSecondary-200',
  ]

  const iconHoverClsx = [
    backgroundType === 'main' && 'group-hover:text-basicMain-400',
    backgroundType === 'surface' && 'group-hover:text-basicSurface-400',
    backgroundType === 'secondary' && 'group-hover:text-basicSecondary-400',
  ]

  return (
    <Disclosure.Button
      className={clsx(
        hoverClsx,
        'group w-full flex items-center pr-2 py-2 text-left rounded-md',
        'focus:outline-none focus-visible:ring',
        className,
      )}
      {...rest}
    >
      {({ open }) => (
        <>
          <ChevronDownIcon
            className={clsx(
              'mr-2 flex-shrink-0 h-5 w-5 transform transition-all ease-in-out duration-150',
              iconHoverClsx,
              open ? '' : '-rotate-90',
            )}
          />
          {children}
        </>
      )}
    </Disclosure.Button>
  )
}

export type AccordionPanelProps = HTMLTribeProps<'div'>

/**
 *  The container for the details to be revealed.
 */
const AccordionPanel: FC<AccordionPanelProps> = props => {
  const { children, className, ...rest } = props
  const { backgroundClsx, text500Clsx } = useBackgroundContext()

  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Disclosure.Panel
        className={clsx(
          'group w-full flex items-center py-2 text-left rounded-md',
          'focus:outline-none focus-visible:ring',
        )}
        {...rest}
      >
        <div className={clsx(backgroundClsx, text500Clsx, className)}>
          {children}
        </div>
      </Disclosure.Panel>
    </Transition>
  )
}

Accordion.Button = AccordionButton
Accordion.Panel = AccordionPanel
