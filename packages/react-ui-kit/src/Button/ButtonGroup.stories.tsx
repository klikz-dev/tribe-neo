import ChevronLeftIcon from '@heroicons/react/solid/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/solid/ChevronRightIcon'

import { Button, BUTTON_SIZES } from './Button'
import { ButtonGroup } from './ButtonGroup'

export default {
  title: 'Elements/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    size: {
      options: BUTTON_SIZES,
      control: { type: 'radio' },
    },
  },
}

export const Template = (args: any) => (
  <ButtonGroup {...args}>
    <Button>Years</Button>
    <Button>Months</Button>
    <Button>Days</Button>
  </ButtonGroup>
)

Template.args = {
  size: 'md',
}

export const IconOnly = (args: any) => (
  <ButtonGroup {...args}>
    <Button leadingIcon={<ChevronLeftIcon />} />
    <Button leadingIcon={<ChevronRightIcon />} />
  </ButtonGroup>
)
