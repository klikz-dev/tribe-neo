import CheckCircleIcon from '@heroicons/react/outline/CheckCircleIcon'
import InboxIcon from '@heroicons/react/outline/InboxIcon'

import { Button } from '../Button'
import { Link } from '../Link'
import { toast } from './toast'
import { ToastComponent } from './ToastComponent'
import { ToastContainer } from './ToastContainer'

export default {
  title: 'Utility/Toast',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
}

export const Template = args => {
  const notify = () =>
    toast({
      title: args.title,
      description: args.description,
    })

  return (
    <>
      <Button variant="outline" onClick={notify}>
        Open toast
      </Button>
      <ToastContainer />
    </>
  )
}

Template.args = {
  title: 'Successfully saved!',
  description: 'Anyone with a link can now view this file.',
}

export const WithIcon = args => {
  const notify = () =>
    toast({
      title: 'Successfully saved!',
      description: 'Anyone with a link can now view this file.',
      icon: <CheckCircleIcon />,
    })

  return (
    <>
      <Button variant="outline" onClick={notify}>
        Open toast
      </Button>
      <ToastContainer />
    </>
  )
}

export const Variants = (args: any) => {
  const defaultToast = () =>
    toast({
      title: 'Default',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    })
  const successToast = () =>
    toast({
      title: 'Success',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      status: 'success',
    })
  const infoToast = () =>
    toast({
      title: 'Info',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      status: 'info',
    })
  const warningToast = () =>
    toast({
      title: 'Warning',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      status: 'warning',
    })
  const errorToast = () =>
    toast({
      title: 'Error',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      status: 'error',
    })

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          defaultToast()
          successToast()
          infoToast()
          warningToast()
          errorToast()
        }}
      >
        Open variants
      </Button>
      <ToastContainer />
    </>
  )
}

export const Condensed = (args: any) => {
  const notify = () =>
    toast({
      custom: ({ onClose }) => (
        <ToastComponent.Content>
          <div className="flex flex-1 items-center  justify-between">
            <p className="text-sm font-medium text-basicSurface-900">
              Discussion archived
            </p>

            <Link href="#" onClick={onClose}>
              Undo
            </Link>
          </div>
        </ToastComponent.Content>
      ),
    })

  return (
    <>
      <Button variant="outline" onClick={notify}>
        Open toast
      </Button>
      <ToastContainer />
    </>
  )
}

export const WithActionsBelow = (args: any) => {
  const notify = () =>
    toast({
      custom: ({ onClose }) => (
        <ToastComponent.Content
          icon={<InboxIcon />}
          title="Discussion moved"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum
              tenetur."
        >
          <div className="mt-3 flex space-x-7">
            <Link href="#" onClick={onClose}>
              Undo
            </Link>
            <Link href="#" variant="neutral" onClick={onClose}>
              Dismiss
            </Link>
          </div>
        </ToastComponent.Content>
      ),
    })

  return (
    <>
      <Button variant="outline" onClick={notify}>
        Open toast
      </Button>
      <ToastContainer />
    </>
  )
}

export const WithSplitButtons = (args: any) => {
  const notify = () =>
    toast({
      custom: ({ onClose }) => (
        <div className="flex divide-x divide-neutral-200">
          <div className="w-0 flex-1 flex items-center p-4">
            <div className="w-full">
              <p className="text-sm font-medium text-basicSurface-900">
                Receive toasts
              </p>
              <p className="mt-1 text-sm text-basicSurface-500">
                Toasts may include alerts, sounds, and badges.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col divide-y divide-neutral-200">
              <div className="h-0 flex-1 flex">
                <button
                  type="button"
                  className="w-full border border-transparent rounded-none rounded-tr-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-actionPrimary-600 hover:text-actionPrimary-500 focus:outline-none focus:z-10 focus-visible:ring"
                  onClick={onClose}
                >
                  Reply
                </button>
              </div>
              <div className="h-0 flex-1 flex">
                <button
                  type="button"
                  className="w-full border border-transparent rounded-none rounded-br-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-basicSurface-700 hover:text-basicSurface-500 focus:outline-none focus-visible:ring"
                  onClick={onClose}
                >
                  Don&apos;t allow
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    })

  return (
    <>
      <Button variant="outline" onClick={notify}>
        Open toast
      </Button>
      <ToastContainer />
    </>
  )
}
