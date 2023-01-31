import { FC } from 'react'

import clsx from 'clsx'

import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XCircleIcon,
  XIcon,
} from '../icons'
import { HTMLTribeProps } from '../system'

export type AlertStatus = 'error' | 'warning' | 'success' | 'info'

export type AlertProps = HTMLTribeProps<'div'> & {
  status?: AlertStatus
  title?: string
  withClose?: boolean
}

/**
 * Alerts are used to communicate a state that affects a system, feature or page.
 */
export const Alert: FC<AlertProps> = props => {
  const {
    as,
    status,
    title,
    children,
    withClose = false,
    className,
    ...rest
  } = props

  let icon
  switch (status) {
    case 'error':
      icon = (
        <XCircleIcon className="h-5 w-5 text-danger-400" aria-hidden="true" />
      )
      break
    case 'warning':
      icon = (
        <ExclamationIcon
          className="h-5 w-5 text-warning-400"
          aria-hidden="true"
        />
      )
      break
    case 'success':
      icon = (
        <CheckCircleIcon
          className="h-5 w-5 text-success-400"
          aria-hidden="true"
        />
      )
      break
    case 'info':
      icon = (
        <InformationCircleIcon
          className="h-5 w-5 text-info-400"
          aria-hidden="true"
        />
      )
      break
    default:
      break
  }

  const Component = as || 'div'

  return (
    <Component
      className={clsx(
        'relative rounded-md p-4',
        [
          status === 'error' && 'bg-danger-50',
          status === 'warning' && ' bg-warning-50',
          status === 'success' && 'bg-success-50',
          status === 'info' && 'bg-info-50 ',
        ],
        className,
      )}
      {...rest}
    >
      <div className="flex">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3">
          {title && (
            <h3
              className={clsx('text-sm font-medium ', [
                status === 'error' && 'text-danger-800',
                status === 'warning' && 'text-warning-800',
                status === 'success' && 'text-success-800',
                status === 'info' && 'text-info-800',
              ])}
            >
              {title}
            </h3>
          )}
          {children && (
            <div
              className={clsx('text-sm', !!title && 'mt-2 ', [
                status === 'error' && 'text-danger-700',
                status === 'warning' && 'text-warning-700',
                status === 'success' && 'text-success-700',
                status === 'info' && 'text-info-700',
              ])}
            >
              {children}
            </div>
          )}
          {withClose && (
            <span className="absolute top-0 right-0 flex items-center mr-2 mt-2">
              <button
                type="button"
                className={clsx('inline-flex rounded-md p-1.5', [
                  status === 'error' && 'bg-danger-50',
                  status === 'warning' && ' bg-warning-50',
                  status === 'success' && 'bg-success-50',
                  status === 'info' && 'bg-info-50 ',
                ])}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon
                  className={clsx('h-4 w-4', [
                    status === 'error' && 'text-danger-700',
                    status === 'warning' && 'text-warning-700',
                    status === 'success' && 'text-success-700',
                    status === 'info' && 'text-info-700',
                  ])}
                  aria-hidden="true"
                />
              </button>
            </span>
          )}
        </div>
      </div>
    </Component>
  )
}
