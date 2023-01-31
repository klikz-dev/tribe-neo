import { Fragment, FC } from 'react'

import { Transition } from '@headlessui/react'
import clsx from 'clsx'

import { BackgroundProvider } from '../BackgroundContext'
import { IconProps } from '../Icon'
import { XIcon } from '../icons'
import { ToastProvider, ToastStatus, useToastContext } from './ToastContext'
import { ToastIcon } from './ToastIcon'

/**
 * Toast panel, dynamically insert this into the live region when it needs to be displayed
 */
export type ToastComponentProps = React.ComponentProps<'div'> & {
  status?: ToastStatus
  open: boolean
  onClose: () => void
}

/**
 * Toast panel, dynamically insert this into the live region when it needs to be displayed
 */
export const ToastComponent = (props: ToastComponentProps) => {
  const {
    open,
    onClose,
    status = 'neutral',
    children,
    className,
    ...rest
  } = props

  return (
    <Transition
      show={open}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsx(
          'max-w-sm w-full shadow-lg rounded-lg overflow-hidden pointer-events-auto border border-neutral-200',
          'bg-surface-50 text-basicSurface-500',
          'focus-visible:ring-1 focus:outline-none',
          className,
        )}
        {...rest}
      >
        <ToastProvider onClose={onClose} status={status}>
          <BackgroundProvider backgroundType="surface">
            {children}
          </BackgroundProvider>
        </ToastProvider>
      </div>
    </Transition>
  )
}

export type ToastContentProps = React.ComponentProps<'div'> & {
  title?: string
  description?: string
  withClose?: boolean
  icon?: IconProps
}
const ToastContent: FC<ToastContentProps> = props => {
  const {
    children,
    title,
    description,
    icon,
    withClose = true,
    className,
    ...rest
  } = props

  const { status, onClose } = useToastContext()

  return (
    <div
      className={clsx(
        'p-4 relative',
        [
          status === 'neutral' && 'bg-surface-50',
          status === 'error' && 'bg-danger-50',
          status === 'warning' && ' bg-warning-50',
          status === 'success' && 'bg-success-50',
          status === 'info' && 'bg-info-50 ',
        ],
        className,
      )}
      {...rest}
    >
      <div className="flex items-start text-sm ">
        <div className="flex-shrink-0">
          <ToastIcon status={status}>{icon}</ToastIcon>
        </div>
        <div className={clsx('ml-3 flex-1', withClose && 'mr-8')}>
          {title && (
            <p
              className={clsx('font-medium', [
                status === 'neutral' && 'text-basicSurface-900',
                status === 'error' && 'text-danger-800',
                status === 'warning' && 'text-warning-800',
                status === 'success' && 'text-success-800',
                status === 'info' && 'text-info-800',
              ])}
            >
              {title}
            </p>
          )}
          {description && (
            <p
              className={clsx('mt-1', [
                status === 'neutral' && 'text-basicSurface-500',
                status === 'error' && 'text-danger-700',
                status === 'warning' && 'text-warning-700',
                status === 'success' && 'text-success-700',
                status === 'info' && 'text-info-700',
              ])}
            >
              {description}
            </p>
          )}
          {children}
        </div>
        {withClose && (
          <span className="absolute top-0 right-0 flex items-center mr-4 mt-4">
            <button
              type="button"
              className={clsx(
                'rounded-md inline-flex focus:outline-none focus-visible:ring',
                [
                  status === 'neutral' && 'bg-surface-50',
                  status === 'error' && 'bg-danger-50',
                  status === 'warning' && ' bg-warning-50',
                  status === 'success' && 'bg-success-50',
                  status === 'info' && 'bg-info-50 ',
                ],
              )}
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XIcon
                className={clsx('h-5 w-5', [
                  status === 'neutral' &&
                    'text-basicSurface-400 hover:text-basicSurface-500',
                  status === 'error' && 'text-danger-400 hover:text-danger-500',
                  status === 'warning' &&
                    'text-warning-400 hover:text-warning-500',
                  status === 'success' &&
                    'text-success-400 hover:text-success-500',
                  status === 'info' && 'text-info-400 hover:text-info-500',
                ])}
                aria-hidden="true"
              />
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

ToastComponent.Content = ToastContent
