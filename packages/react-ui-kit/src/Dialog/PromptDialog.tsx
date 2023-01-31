import { Fragment, FC, cloneElement, ReactElement } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { BackgroundProvider } from '../BackgroundContext'

type ConfirmableProps = {
  proceed: (value: boolean) => void
  show: boolean
}

export type CreatePromptOptions = {
  title: string
  description?: string
  proceedLabel?: string
  cancelLabel?: string
  formContent: ReactElement
}

export type PromptDialogProps = ConfirmableProps & CreatePromptOptions

/**
 *
 */
export const PromptDialog: FC<PromptDialogProps> = props => {
  const { show, proceed, title, description, formContent, ...rest } = props

  const dismiss = () => proceed(false)

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
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-basicSurface-900" id="modal-title">
                      {title}
                    </h3>
                    {description && (
                      <div className="mt-2">
                        <p className="text-basicSurface-500">{description}</p>
                      </div>
                    )}
                  </div>
                </div>
                {cloneElement(formContent, { close: dismiss })}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </BackgroundProvider>
  )
}
