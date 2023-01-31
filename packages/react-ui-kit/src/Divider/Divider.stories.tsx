import PlusIcon from '@heroicons/react/solid/PlusIcon'

import { Button } from '../Button'
import { Divider, DIVIDER_PADDINGS } from './Divider'

export default {
  title: 'Elements/Divider',
  component: Divider,
  argTypes: {
    padding: {
      options: DIVIDER_PADDINGS,
      control: { type: 'radio' },
    },
  },
  decorators: [
    Story => (
      <>
        <DummyContent />
        {Story()}
        <DummyContent />
      </>
    ),
  ],
}

const DummyContent = () => (
  <div className="p-4 border-4 border-dashed border-neutral-100 w-full h-48 bg-surface-100 flex flex-wrap place-content-center ">
    content
  </div>
)

export const Template = (args: any) => <Divider {...args} />
Template.args = {}

export const WithText = (args: any) => <Divider {...args}>Continue</Divider>

export const WithIcon = (args: any) => (
  <Divider>
    <PlusIcon className="h-5 w-5" />
  </Divider>
)

export const WithButton = (args: any) => (
  <Divider {...args}>
    <Button leadingIcon={<PlusIcon />} variant="outline" rounded>
      Button text
    </Button>
  </Divider>
)
