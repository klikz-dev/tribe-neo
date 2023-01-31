import MailIcon from '@heroicons/react/solid/MailIcon'

import { Button } from '../Button'
import { IndicatorBadge } from './IndicatorBadge'

export default {
  title: 'Elements/IndicatorBadge',
  component: IndicatorBadge,
}

export const Template = (args: any) => <IndicatorBadge {...args} />
Template.args = {
  dot: false,
  count: 5,
  showZero: true,
  variant: 'danger',
}

export const Variants = (args: any) => (
  <div className="space-y-4">
    <div>
      <IndicatorBadge {...args} dot />
    </div>
    <div>
      <IndicatorBadge {...args} count={5} />
    </div>
    <div>
      <IndicatorBadge {...args} count={100} />
    </div>
  </div>
)

export const ButtonWithIndicatorIcon = () => (
  <div className="space-y-4">
    <div>
      <Button trailingIcon={<IndicatorBadge dot />}>Button</Button>
    </div>
    <div>
      <Button trailingIcon={<IndicatorBadge count={5} />}>Button</Button>
    </div>
  </div>
)

export const ButtonWithIndicator = () => (
  <Variants>
    <Button>Button</Button>
  </Variants>
)

export const IconWithIndicator = () => (
  <Variants>
    <MailIcon className="h-7 w-7" />
  </Variants>
)
