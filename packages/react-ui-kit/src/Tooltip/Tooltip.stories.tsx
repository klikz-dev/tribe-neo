import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { Tooltip } from './Tooltip'

export default {
  title: 'Elements/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export const Template = (args: any) => (
  <Tooltip {...args}>
    <Tooltip.Trigger>
      <Button>{args.trigger}</Button>
    </Tooltip.Trigger>
    <Tooltip.Panel>{args.children}</Tooltip.Panel>
  </Tooltip>
)

Template.args = {
  placement: 'top',
  trigger: 'Hover me',
  children: "Hey, I'm here!",
}

export const WithLongText = (args: any) => (
  <Tooltip {...args}>
    <Tooltip.Trigger>
      <Button>Hover me</Button>
    </Tooltip.Trigger>
    <Tooltip.Panel>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </Tooltip.Panel>
  </Tooltip>
)

const WithPlacement = ({ placement }) => (
  <div className="w-min">
    <Tooltip placement={placement}>
      <Tooltip.Trigger>
        <Button>{placement}</Button>
      </Tooltip.Trigger>
      <Tooltip.Panel>Tooltip on {placement}</Tooltip.Panel>
    </Tooltip>
  </div>
)

export const Placement = () => (
  <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4">
    <div></div>
    <WithPlacement placement="left" />
    <div></div>
    <WithPlacement placement="top" />
    <div></div>
    <WithPlacement placement="bottom" />
    <div></div>
    <WithPlacement placement="right" />
    <div></div>
  </div>
)

export const WithImage = (args: any) => (
  <Tooltip {...args}>
    <Tooltip.Trigger>
      <Button>Hover me</Button>
    </Tooltip.Trigger>
    <Tooltip.Panel>
      <div className="flex items-center flex-col">
        <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        <h3 className="mt-2 text-white text-sm font-medium">Tom Cook</h3>
      </div>
    </Tooltip.Panel>
  </Tooltip>
)
