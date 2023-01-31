import {
  cloneElement,
  ComponentProps,
  FC,
  Fragment,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from 'react'

import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { BackgroundProvider } from '../BackgroundContext'
import { ModalActions, ModalFooter } from './ModalFooter'
import { ModalHeader } from './ModalHeader'
import { ModalProps } from './types'

/**
 * A dialog is a window overlaid on either the primary window or another dialog window.
 * Content behind a modal dialog is inert, meaning that users cannot interact with it.
 */
export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const {
    open = false,
    onClose,
    children,
    size: _size = 'lg',
    showCloseBtn,
    className,
    showZenModeBtn,
    ...rest
  } = props
  const initialSize = useRef<ModalProps['size']>(_size)
  const [size, setSize] = useState(_size)

  const sizeClsx = [
    size === 'md' && 'sm:max-w-md w-full',
    size === 'lg' && 'sm:max-w-lg w-full',
    size === 'xl' && 'sm:max-w-xl w-full',
    size === '2xl' && 'sm:max-w-2xl w-full',
    size === '3xl' && 'sm:max-w-3xl w-full',
    size === '5xl' && 'sm:max-w-5xl w-full',
    size === 'full' && 'w-full sm:inset-4 sm:w-auto sm:absolute',
    size === 'zen' && 'w-full h-screen sm:rounded-none',
  ]

  const toggleZenMode = useCallback(() => {
    setSize(size === 'zen' ? initialSize.current : 'zen')
  }, [size, initialSize])

  return (
    <BackgroundProvider backgroundType="surface">
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={onClose}
          {...rest}
        >
          <div
            className={clsx(
              'flex justify-center min-h-screen text-center sm:block',
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0">
                <div
                  className="absolute inset-0 bg-semi-transparent"
                  onClick={onClose}
                />
              </Dialog.Overlay>
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className={twMerge(
                  clsx(
                    'inline-block align-bottom sm:rounded-lg text-left shadow-xl transform transition-all sm:align-middle isolate',
                    'bg-surface-50 text-basicSurface-500',
                    sizeClsx,
                    size !== 'full' && size !== 'zen' && 'm-0 sm:m-4',
                    size !== 'zen' && 'sm:max-h-[calc(100vh-2rem)]', // inside scroll
                    className,
                  ),
                )}
              >
                {Array.isArray(children)
                  ? children.map((child, idx) =>
                      cloneElement(child, {
                        onClose,
                        showCloseBtn,
                        key: idx,
                        size,
                        showZenModeBtn,
                        toggleZenMode,
                      }),
                    )
                  : children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </BackgroundProvider>
  )
}

export type ModalContentProps = ComponentProps<'div'> & {
  padding?: boolean
}

const ModalContent: FC<ModalContentProps> = ({
  children,
  className,
  padding = true,
  ...rest
}) => (
  <div
    className={clsx('flex-1', padding && 'px-4 py-5 sm:p-6', className)}
    {...rest}
  >
    {children}
  </div>
)

Modal.Header = ModalHeader
Modal.Content = ModalContent
Modal.Footer = ModalFooter
Modal.Actions = ModalActions
