import { ReactNode, FC, ComponentProps } from 'react'

import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { HTMLTribeProps } from '../system'
import { runIfFn } from '../utils'
import { Radio } from './Radio'
import {
  RadioGroupsProvider,
  RadioGroupVariant,
  useRadioGroups,
} from './RadioGroupContext'

export type RadioGroupProps<T = string> = Omit<
  ComponentProps<'div'>,
  'onChange'
> & {
  value: T
  onChange: (newValue: T) => void
  children: ReactNode
  disabled?: boolean
  variant?: RadioGroupVariant
  name?: string
}
/**
 * Radios are used when only one choice may be selected in a series of options.
 */
export const RadioGroup = (props: RadioGroupProps) => {
  const { children, variant = 'list', ...rest } = props

  return (
    <HeadlessRadioGroup {...rest}>
      <div className="relative isolate">
        <RadioGroupsProvider variant={variant}>{children}</RadioGroupsProvider>
      </div>
    </HeadlessRadioGroup>
  )
}

export type RadioGroupItemsProps = ComponentProps<'div'>

const RadioGroupItems: FC<RadioGroupItemsProps> = props => {
  const { children, className, ...rest } = props

  const { variant } = useRadioGroups()
  const variantClsx = [
    variant === 'list' && 'bg-surface-50 rounded-md -space-y-px',
    variant === 'stacked-cards' && 'space-y-4',
  ]

  return (
    <div className={clsx(variantClsx, className)} {...rest}>
      {children}
    </div>
  )
}

export type RadioGroupItemProps<T = any> = HTMLTribeProps<'div'> & {
  value: T
  disabled?: boolean
  title?: string
  description?: string
}

const RadioGroupItem: FC<RadioGroupItemProps> = props => {
  const { variant } = useRadioGroups()

  switch (variant) {
    case 'list':
    default:
      return <RadioGroupItemList {...props} />
    case 'stacked-cards':
      return <RadioGroupItemCard {...props} />
  }
}

const RadioGroupItemList: FC<RadioGroupItemProps> = props => {
  const { value, title, description, children, disabled, className, ...rest } =
    props

  return (
    <HeadlessRadioGroup.Option
      as="label"
      className={renderProps =>
        clsx(
          renderProps.checked
            ? 'bg-actionPrimary-50 border-actionPrimary-200 z-10'
            : 'border-neutral-200',
          'relative border p-4 flex',
          'focus:outline-none  focus-visible:ring',
          'first:rounded-tl-md first:rounded-tr-md',
          'last:rounded-bl-md last:rounded-br-md',
          !renderProps.disabled && ' cursor-pointer',
          renderProps.disabled && 'opacity-60 cursor-default',
          className,
        )
      }
      value={value}
      disabled={disabled}
      {...rest}
    >
      {renderProps => (
        <Radio
          active={renderProps.active}
          checked={renderProps.checked}
          disabled={renderProps.disabled}
        >
          {title ? (
            <>
              <HeadlessRadioGroup.Label
                as="span"
                className={clsx(
                  renderProps.checked
                    ? 'text-actionPrimary-900'
                    : 'text-basicSurface-900',
                  'block text-sm',
                )}
              >
                {title}
              </HeadlessRadioGroup.Label>
              {description && (
                <HeadlessRadioGroup.Description
                  as="span"
                  className={clsx(
                    renderProps.checked
                      ? 'text-actionPrimary-700'
                      : 'text-basicSurface-500',
                    'block text-sm',
                  )}
                >
                  {description}
                </HeadlessRadioGroup.Description>
              )}
            </>
          ) : (
            runIfFn(children, renderProps)
          )}
        </Radio>
      )}
    </HeadlessRadioGroup.Option>
  )
}

const RadioGroupItemCard: FC<RadioGroupItemProps> = props => {
  const { value, children, disabled, className, ...rest } = props

  return (
    <HeadlessRadioGroup.Option
      as="label"
      className={renderProps =>
        clsx(
          renderProps.active ? 'ring-1' : '',
          'relative block rounded-lg border border-neutral-300 shadow-sm px-6 py-4 sm:flex sm:justify-between',
          ' bg-surface-50 text-basicSurface-500',
          'focus:outline-none focus-visible:ring',
          !renderProps.disabled && 'cursor-pointer hover:border-neutral-400',
          renderProps.disabled && 'opacity-60 cursor-default',
          className,
        )
      }
      value={value}
      disabled={disabled}
      {...rest}
    >
      {renderProps => runIfFn(children, renderProps)}
    </HeadlessRadioGroup.Option>
  )
}

RadioGroup.Items = RadioGroupItems
RadioGroup.Item = RadioGroupItem
