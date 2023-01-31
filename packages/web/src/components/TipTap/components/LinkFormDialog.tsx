import { useEffect, useRef } from 'react'

import { Form, FormRef } from '@tribeplatform/react-sdk/components'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'

export const LinkFormDialog = ({
  onSubmit,
  onClose,
  open,
  defaultValues,
}: {
  open?: boolean
  defaultValues?: { text?: string; link?: string }
  onSubmit: (data: { link: string; text?: string }) => void
  onClose?: () => void
}) => {
  const formRef = useRef<FormRef>()

  useEffect(() => {
    if (formRef?.current?.methods) {
      formRef.current.methods.setValue('text', defaultValues.text)
    }
  }, [defaultValues, formRef])

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header title="Add Link" />
      <Modal.Content>
        <Form
          ref={formRef}
          onSubmit={onSubmit}
          className="mt-5 space-y-6"
          defaultValues={defaultValues}
        >
          <Form.Input name="text" label="Text" />
          <Form.Input
            name="link"
            autoComplete="href"
            label="Link"
            validation={{
              required: 'Please add a valid link',
            }}
          />
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:ml-3 sm:w-auto "
            >
              Save
            </Button>
            <Button
              variant="outline"
              className="w-full sm:ml-3 sm:w-auto"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
