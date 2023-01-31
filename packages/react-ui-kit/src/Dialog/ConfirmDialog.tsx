import { Fragment, FC } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { BackgroundProvider } from '../BackgroundContext'
import { Button } from '../Button'
import { ExclamationOutlineIcon } from '../icons'

type ConfirmableProps = {
  proceed: (value: boolean) => void
  show: boolean
}

export type CreateConfirmationOptions = {
  title: string
  description?: string
  proceedLabel?: string
  cancelLabel?: string
  danger?: boolean
}

export type ConfirmDialogProps = ConfirmableProps & CreateConfirmationOptions

/**
 *
 */
export const ConfirmDialog: FC<ConfirmDialogProps> = props => {
  const {
    show,
    proceed,
    title,
    description,
    proceedLabel = 'Confirm',
    cancelLabel = 'Cancel',
    danger = false,
    ...rest
  } = props

  const dismiss = () => proceed(false)
  const confirm = () => proceed(true)

  return (
    <BackgroundProvider backgroundType="surface">
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={dismiss}
          {...rest}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                <div className="absolute inset-0 bg-semi-transparent" />
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
                className={clsx(
                  'inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6',
                  'bg-surface-50 text-basicSurface-500',
                )}
              >
                <div className="sm:flex sm:items-start">
                  <div
                    className={clsx(
                      'mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10',
                      !danger && 'bg-surface-200',
                      danger && 'bg-danger-100',
                    )}
                  >
                    <ExclamationOutlineIcon
                      className={clsx(
                        'h-6 w-6',
                        !danger && 'text-basicSurface-600',
                        danger && 'text-danger-600',
                      )}
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-basicSurface-900" id="modal-title">
                      {title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-basicSurface-500">{description}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <Button
                    onClick={confirm}
                    variant={danger ? 'danger' : 'primary'}
                    className="w-full sm:ml-3 sm:w-auto "
                  >
                    {proceedLabel}
                  </Button>
                  <Button
                    onClick={dismiss}
                    variant="outline"
                    className="sm:mt-0 sm:w-auto mt-3 w-full "
                  >
                    {cancelLabel}
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </BackgroundProvider>
  )
}
