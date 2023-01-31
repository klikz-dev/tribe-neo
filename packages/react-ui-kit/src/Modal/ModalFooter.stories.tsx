import { useRef, useState } from 'react'

import { Button } from '../Button'
import { Modal } from './Modal'

export default {
  title: 'View/Modal/Footer',
  component: Modal.Footer,
}

export const Template = (args: any) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header title="Modal title" />
        <Modal.Content>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam
          laudantium explicabo pariatur iste dolorem animi vitae error totam. At
          sapiente aliquam accusamus facere veritatis.
        </Modal.Content>
        <Modal.Footer {...args}>{args.children}</Modal.Footer>
      </Modal>
    </>
  )
}

Template.args = {
  withBorder: false,
  children: 'Footer content',
}

export const Simple = (args: any) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header title="Modal title" />
        <Modal.Content>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam
          laudantium explicabo pariatur iste dolorem animi vitae error totam. At
          sapiente aliquam accusamus facere veritatis.
        </Modal.Content>
        <Modal.Footer>Footer content</Modal.Footer>
      </Modal>
    </>
  )
}

export const WithBorder = (args: any) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={setOpen} {...args}>
        <Modal.Header title="Modal title" />
        <Modal.Content>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam
          laudantium explicabo pariatur iste dolorem animi vitae error totam. At
          sapiente aliquam accusamus facere veritatis.
        </Modal.Content>
        <Modal.Footer withBorder>Footer content</Modal.Footer>
      </Modal>
    </>
  )
}

export const WithFullWidthButton = (args: any) => {
  const [open, setOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={setOpen} {...args}>
        <Modal.Header title="Modal title" />
        <Modal.Content>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam
          laudantium explicabo pariatur iste dolorem animi vitae error totam. At
          sapiente aliquam accusamus facere veritatis.
        </Modal.Content>
        <Modal.Footer>
          <Button fullWidth variant="outline">
            See all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const WithActionButtons = (args: any) => {
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={setOpen}
        initialFocus={cancelButtonRef}
        {...args}
      >
        <Modal.Header title="Modal title" />
        <Modal.Content>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam
          laudantium explicabo pariatur iste dolorem animi vitae error totam. At
          sapiente aliquam accusamus facere veritatis.
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Deactivate</Button>

          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            ref={cancelButtonRef}
          >
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}
