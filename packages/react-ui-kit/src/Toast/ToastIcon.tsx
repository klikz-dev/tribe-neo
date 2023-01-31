import { FC } from 'react'

import clsx from 'clsx'

import { Icon } from '../Icon'
import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '../icons'
import { ToastStatus } from './ToastContext'

export type ToastIconProps = {
  status: ToastStatus
}

export const ToastIcon: FC<ToastIconProps> = ({ status, children }) => {
  let icon

  const iconClsx = [
    status === 'neutral' && 'text-basicSurface-700',
    status === 'error' && 'text-danger-700',
    status === 'warning' && ' text-warning-700',
    status === 'success' && 'text-success-700',
    status === 'info' && 'text-info-700 ',
  ]

  switch (status) {
    case 'error':
      icon = <XCircleIcon />
      break
    case 'warning':
      icon = <ExclamationIcon />
      break
    case 'success':
      icon = <CheckCircleIcon />
      break
    case 'info':
      icon = <InformationCircleIcon />
      break
    case 'neutral':
      icon = children
      break
    default:
      break
  }

  return icon ? <Icon className={clsx('h-6 w-6', iconClsx)}>{icon}</Icon> : null
}
