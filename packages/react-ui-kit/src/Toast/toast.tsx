import { ReactNode } from 'react'

import { toast as hotToast } from 'react-hot-toast'

import { runIfFn } from '../utils'
import { ToastComponent, ToastContentProps } from './ToastComponent'
import { ToastStatus } from './ToastContext'

export type ToastOptions = ToastContentProps & {
  status?: ToastStatus
  custom?: ReactNode
}

export const toast = (options: ToastOptions) => {
  const { title, description, icon, status, custom } = options

  if (custom) {
    return hotToast.custom(t => (
      <ToastComponent
        open
        onClose={() => hotToast.remove(t.id)}
        status={status}
      >
        {runIfFn(custom, {
          onClose: () => hotToast.remove(t.id),
        })}
      </ToastComponent>
    ))
  }

  return hotToast.custom(t => (
    <ToastComponent open onClose={() => hotToast.remove(t.id)} status={status}>
      <ToastComponent.Content
        title={title}
        description={description}
        icon={icon}
      />
    </ToastComponent>
  ))
}
