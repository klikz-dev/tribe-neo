import { useLocation } from 'wouter'

import { Modal } from '@tribeplatform/react-ui-kit/Modal'

import { CreateAppModal } from './components'

export const CreateAppContainer = () => {
  const [, setLocation] = useLocation()
  const onClose = () => {
    setLocation('/apps')
  }

  return (
    <Modal open onClose={onClose}>
      <Modal.Header title="Create a new app" />
      <Modal.Content>
        <CreateAppModal onClose={onClose} />
      </Modal.Content>
    </Modal>
  )
}
