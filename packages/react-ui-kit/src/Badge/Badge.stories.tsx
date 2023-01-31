import { action } from '@storybook/addon-actions'

import { Icon } from '../Icon'
import { DotIcon, XIcon } from '../icons'
import { Badge } from './Badge'
import { BADGE_SIZES, BADGE_VARIANTS } from './BadgeContext'

export default {
  title: 'Elements/Badge',
  component: Badge,
  argTypes: {
    variant: {
      options: BADGE_VARIANTS,
      control: { type: 'radio' },
    },
    size: {
      options: BADGE_SIZES,
      control: { type: 'radio' },
    },
  },
}

export const Template = (args: any) => <Badge {...args} />
Template.args = {
  variant: 'primary',
  size: 'md',
  rounded: false,
  children: 'Badge text',
}

export const Variants = (args: any) => (
  <div className="space-y-4">
    <div className="space-x-4">
      <Badge {...args} variant="primary" size="md">
        Badge text
      </Badge>
      <Badge {...args} variant="primary" size="lg">
        Badge text
      </Badge>
    </div>
    <div className="space-x-4">
      <Badge {...args} variant="secondary" size="md">
        Badge text
      </Badge>
      <Badge {...args} variant="secondary" size="lg">
        Badge text
      </Badge>
    </div>
  </div>
)

export const RoundedBadges = () => <Variants rounded />

export const WithDot = () => <Variants leadingIcon={<DotIcon />} />

export const RoundedWithDot = () => (
  <Variants rounded leadingIcon={<DotIcon />} />
)

export const WithRemoveButton = () => (
  <Variants
    rounded
    trailingIcon={
      <Badge.Button onClick={action('remove clicked')}>
        <span className="sr-only">Remove option</span>
        <Icon className="h-2 w-2">
          <XIcon />
        </Icon>
      </Badge.Button>
    }
  />
)

export const AsLink = () => (
  <Variants as="a" href="http://google.com">
    Badge text
  </Variants>
)
