import { useState } from 'react'

import { Button } from '../Button'
import { Modal } from './Modal'

export default {
  title: 'View/Modal',
  component: Modal,
}

export const Template = (args: any) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        <Modal.Header title={args.title} description={args.description} />
        <Modal.Content>
          <Button fullWidth onClick={() => setOpen(false)}>
            Go back to dashboard
          </Button>
        </Modal.Content>
      </Modal>
    </>
  )
}

Template.args = {
  title: 'Payment successful',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.',
  size: 'md',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.\n',
}

export const Sizes = args => {
  const [mdOpen, setMdOpen] = useState(false)
  const [fullOpen, setFullOpen] = useState(true)

  return (
    <div className="space-y-4">
      <div className="space-x-4">
        <Button onClick={() => setMdOpen(true)}>Open md size</Button>
        <Modal open={mdOpen} onClose={() => setMdOpen(false)} size="md">
          <Modal.Header title="Modal title" />
          <Modal.Content>Content</Modal.Content>
        </Modal>
      </div>
      <div className="space-x-4">
        <Button onClick={() => setFullOpen(true)}>Open full size</Button>
        <Modal open={fullOpen} onClose={() => setFullOpen(false)} size="full">
          <Modal.Header title="Modal title" />
          <Modal.Content>Content</Modal.Content>
        </Modal>
      </div>
    </div>
  )
}
