import { FC, ReactElement, ReactNode } from 'react'

import { Dialog } from '@headlessui/react'
import clsx from 'clsx'
import FullscreenExitLineIcon from 'remixicon-react/FullscreenExitLineIcon'
import FullscreenLineIcon from 'remixicon-react/FullscreenLineIcon'

import { XIcon } from '../icons'
import { ModalProps } from './types'

export type ModalHeaderProps = React.ComponentProps<'div'> & {
  title?: ReactNode | ReactElement
  description?: ReactNode | ReactElement
  withBorder?: boolean
  onClose?: ModalProps['onClose']
  size?: ModalProps['size']
  showZenModeBtn?: ModalProps['showZenModeBtn']
  showCloseBtn?: boolean
  toggleZenMode?: () => void
}

export const ModalHeader: FC<ModalHeaderProps> = props => {
  const {
    title,
    description,
    withBorder = false,
    onClose,
    size,
    className,
    children,
    showCloseBtn = true,
    showZenModeBtn,
    toggleZenMode,
    ...rest
  } = props

  return (
    <div
      className={clsx(
        'px-4 py-5 sm:p-6',
        'flex justify-between',
        !withBorder && 'pb-0 sm:pb-0',
        withBorder && 'border-b border-neutral-200',
        !description && 'items-center',
        !!description && 'items-start',
        className,
      )}
      {...rest}
    >
      {children || (
        <>
          <div className="text-center sm:mt-0 sm:text-left">
            <Dialog.Title as="h3" className="text-basicSurface-900">
              {title}
            </Dialog.Title>
            {description && (
              <div className="mt-1">
                <p className="text-basicSurface-500">{description}</p>
              </div>
            )}
          </div>
        </>
      )}

      {(showZenModeBtn || showCloseBtn) && (
        <div className="space-x-2 flex items-center">
          {showZenModeBtn && (
            <button
              tabIndex={0}
              type="button"
              className="hidden sm:block bg-surface-50 rounded-md text-basicSurface-400 hover:text-basicSurface-500 focus:outline-none focus-visible:ring"
              onClick={toggleZenMode}
            >
              <span className="sr-only">Zen Mode</span>
              {size !== 'zen' ? (
                <FullscreenLineIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FullscreenExitLineIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              )}
            </button>
          )}
          {showCloseBtn && (
            <button
              tabIndex={0}
              type="button"
              className="bg-surface-50 rounded-md text-basicSurface-400 hover:text-basicSurface-500 focus:outline-none focus-visible:ring"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
