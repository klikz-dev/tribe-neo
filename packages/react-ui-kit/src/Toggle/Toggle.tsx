import { FC } from 'react'

import { Switch } from '@headlessui/react'
import clsx from 'clsx'

import { useBackgroundContext } from '../BackgroundContext'
import { HTMLTribeProps } from '../system'

export type ToggleProps = HTMLTribeProps<'input'> & {
  checked: boolean
  onChange: (value: boolean) => void
  title?: string
  name?: string
  description?: string
}
/**
 * The Toggle component is used as an alternative for the Checkbox component. You can switch between enabled or disabled states.
 */
export const Toggle: FC<ToggleProps> = props => {
  const { title, description, checked, disabled = false, onChange } = props
  const { text500Clsx, text900Clsx } = useBackgroundContext()

  if (title || description) {
    return (
      <Switch.Group as="div" className="flex items-center justify-between">
        <span className="flex-grow flex flex-col">
          <Switch.Label
            as="span"
            className={clsx('font-medium', text900Clsx)}
            passive
          >
            {title}
          </Switch.Label>
          <Switch.Description
            as="span"
            className={clsx('text-sm', text500Clsx)}
          >
            {description}
          </Switch.Description>
        </span>
        <Switch
          checked={checked}
          onChange={onChange}
          className={clsx(
            checked ? 'bg-actionPrimary-600' : 'bg-surface-300',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200',
            !disabled && 'cursor-pointer',
            disabled && 'opacity-50 cursor-default',
            'focus:outline-none focus-visible:ring',
          )}
          disabled={disabled}
        >
          <span
            aria-hidden="true"
            className={clsx(
              checked ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-surface-50 shadow transform transition ease-in-out duration-200',
            )}
          />
        </Switch>
      </Switch.Group>
    )
  }

  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={clsx(
        checked ? 'bg-actionPrimary-600' : 'bg-surface-300',
        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200',
        !disabled && 'cursor-pointer',
        disabled && 'opacity-50 cursor-default',
        'focus:outline-none focus-visible:ring',
      )}
      disabled={disabled}
    >
      <span className="sr-only">{title}</span>
      <span
        aria-hidden="true"
        className={clsx(
          checked ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-surface-50 shadow transform transition ease-in-out duration-200',
        )}
      />
    </Switch>
  )
}
