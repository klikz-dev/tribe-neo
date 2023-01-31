import { Form } from '@tribeplatform/react-sdk/components'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Modal } from '@tribeplatform/react-ui-kit/Modal'

import { MenuItem } from '../extensions/slash-menu/items'

export const EmbedFormDialog = ({
  onSubmit,
  onClose,
  open,
  embedItem,
}: {
  open?: boolean
  onSubmit: (data: { link: string }, methods: unknown) => void
  onClose?: () => void
  embedItem?: MenuItem
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header
      title={
        <span className="flex items-center">
          {embedItem?.icon && (
            <span className="flex items-center w-8 h-8 mr-2">
              {embedItem.icon}
            </span>
          )}
          Add {embedItem?.label || 'Embed'}
        </span>
      }
      description={embedItem?.description}
    />
    <Modal.Content>
      <Form onSubmit={onSubmit}>
        <Form.Input
          name="link"
          autoComplete="href"
          label="Link"
          validation={{
            required: 'Please add a valid link',
          }}
        />
        <div className="mt-5 sm:flex sm:flex-row-reverse">
          <Button
            type="submit"
            variant="primary"
            className="w-full sm:ml-3 sm:w-auto "
          >
            Add
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
