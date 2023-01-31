import { useState } from 'react'

import { Button } from '../Button'
import { Input } from '../Input'
import { Link } from '../Link'
import { Toggle } from '../Toggle'
import { ActionPanel } from './ActionPanel'

export default {
  title: 'View/ActionPanel',
  component: ActionPanel,
}

export const Template = (args: any) => <ActionPanel {...args} />
Template.args = {
  title: 'Delete your account',
  description:
    'Once you delete your account, you will lose all data associated with it.',
  children: <Button variant="danger">Delete account</Button>,
}

export const WithLink = () => (
  <ActionPanel
    title="Continuous Integration"
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, totam at reprehenderit maxime aut beatae ad."
  >
    <Link>
      Learn more about our CI features <span aria-hidden="true">&rarr;</span>
    </Link>
  </ActionPanel>
)

export const WithTrailingPlacement = () => (
  <ActionPanel
    title="Manage subscription"
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, totam at reprehenderit maxime aut beatae ad."
    placement="trailing"
  >
    <Button>Change plan</Button>
  </ActionPanel>
)

export const WithTrailingTopPlacement = () => (
  <ActionPanel
    title="Manage subscription"
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, totam at reprehenderit maxime aut beatae ad."
    placement="trailing-top"
  >
    <Button>Change plan</Button>
  </ActionPanel>
)

export const WithToggle = () => {
  const [checked, onChange] = useState(false)

  return (
    <ActionPanel
      title="Renew subscription automatically"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo totam non cumque deserunt officiis ex maiores nostrum."
      placement="trailing"
    >
      <Toggle checked={checked} onChange={() => onChange(!checked)}>
        Change plan
      </Toggle>
    </ActionPanel>
  )
}

export const WithInput = (args: any) => {
  return (
    <ActionPanel
      title="A simple form"
      description="This is how simple forms will appear."
      {...args}
    >
      <div className="sm:flex sm:items-center">
        <div className="w-full sm:max-w-xs">
          <Input name="email" placeholder="Placeholder text" />
        </div>
        <Button className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Button
        </Button>
      </div>
    </ActionPanel>
  )
}
