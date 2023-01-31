import MailIcon from '@heroicons/react/outline/MailIcon'
import PhoneIcon from '@heroicons/react/outline/PhoneIcon'

import { Button } from '../Button'
import { PageHeader } from './PageHeader'

export default {
  title: 'Elements/Page Header',
  component: PageHeader,
}

export const Template = (args: any) => <PageHeader {...args} />

Template.args = {
  title: 'Page title',
  description: '',
}

export const Simple = (args: any) => <PageHeader title="Page title" />

export const WithDescription = (args: any) => (
  <PageHeader title="Page title" description="Short description" />
)

export const WithLongDescription = (args: any) => (
  <PageHeader
    title="Page title"
    description="Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente."
  />
)

export const WithAction = (args: any) => (
  <PageHeader
    title="Page title"
    action={
      <>
        <Button variant="outline">Edit</Button>
        <Button>Publish</Button>
      </>
    }
  />
)

export const WithDescriptionAndAction = (args: any) => (
  <PageHeader
    title="Page title"
    description="Description"
    action={
      <>
        <Button variant="outline">Edit</Button>
        <Button>Publish</Button>
      </>
    }
  />
)

export const WithCustomContent = (args: any) => (
  <PageHeader
    title="Ricardo Cooper"
    avatar="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
    backgroundImage="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    action={
      <>
        <Button variant="outline" leadingIcon={<MailIcon />}>
          Message
        </Button>
        <Button variant="outline" leadingIcon={<PhoneIcon />}>
          Call
        </Button>
      </>
    }
  />
)
