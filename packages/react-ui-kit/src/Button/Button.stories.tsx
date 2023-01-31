import BellIcon from '@heroicons/react/outline/BellIcon'

import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from './Button'

export default {
  title: 'Elements/Button',
  component: Button,
  argTypes: {
    variant: {
      options: BUTTON_VARIANTS,
      control: { type: 'radio' },
    },
    size: {
      options: BUTTON_SIZES,
      control: { type: 'radio' },
    },
  },
}

const args = {
  variant: 'primary',
  size: 'md',
  disabled: false,
  rounded: false,
  loading: false,
  fullWidth: false,
  children: 'Button text',
  icon: true,
}

export const Template = (args: any) => <Button {...args} />
Template.args = args

export const Variants = (args: any) => (
  <div className="space-y-4">
    <div className="space-x-4">
      <Button {...args} variant="primary" size="xs">
        Button text
      </Button>
      <Button {...args} variant="primary" size="sm">
        Button text
      </Button>
      <Button {...args} variant="primary" size="md">
        Button text
      </Button>
      <Button {...args} variant="primary" size="lg">
        Button text
      </Button>
      <Button {...args} variant="primary" size="xl">
        Button text
      </Button>
    </div>
    <div className="space-x-4">
      <Button {...args} variant="secondary" size="xs">
        Button text
      </Button>
      <Button {...args} variant="secondary" size="sm">
        Button text
      </Button>
      <Button {...args} variant="secondary" size="md">
        Button text
      </Button>
      <Button {...args} variant="secondary" size="lg">
        Button text
      </Button>
      <Button {...args} variant="secondary" size="xl">
        Button text
      </Button>
    </div>
    <div className="space-x-4">
      <Button {...args} variant="outline" size="xs">
        Button text
      </Button>
      <Button {...args} variant="outline" size="sm">
        Button text
      </Button>
      <Button {...args} variant="outline" size="md">
        Button text
      </Button>
      <Button {...args} variant="outline" size="lg">
        Button text
      </Button>
      <Button {...args} variant="outline" size="xl">
        Button text
      </Button>
    </div>
    <div className="space-x-4">
      <Button {...args} variant="danger" size="xs">
        Button text
      </Button>
      <Button {...args} variant="danger" size="sm">
        Button text
      </Button>
      <Button {...args} variant="danger" size="md">
        Button text
      </Button>
      <Button {...args} variant="danger" size="lg">
        Button text
      </Button>
      <Button {...args} variant="danger" size="xl">
        Button text
      </Button>
    </div>
  </div>
)

export const WithLeadingIcon = args => (
  <Variants leadingIcon={args.icon && <BellIcon />} {...args} />
)
WithLeadingIcon.args = args

export const WithTrailingIcon = () => <Variants trailingIcon={<BellIcon />} />

export const RoundedButtons = () => <Variants rounded />

export const Disabled = () => <Variants disabled />

export const Loading = () => <Variants loading />

export const AsLink = () => (
  <Variants as="a" href="http://google.com">
    Button text
  </Variants>
)

export const FullWidth = args => (
  <div className="space-y-4">
    <Button {...args} variant="primary" fullWidth>
      Button text
    </Button>
    <Button {...args} variant="secondary" fullWidth>
      Button text
    </Button>
    <Button {...args} variant="outline" fullWidth>
      Button text
    </Button>
    <Button {...args} variant="danger" fullWidth>
      Button text
    </Button>
  </div>
)
