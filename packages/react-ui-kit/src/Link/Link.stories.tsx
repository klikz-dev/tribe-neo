import { Text } from '../Text'
import { Link, LINK_VARIANTS } from './Link'

export default {
  title: 'Elements/Link',
  component: Link,
  argTypes: {
    variant: {
      options: LINK_VARIANTS,
      control: { type: 'radio' },
    },
  },
}

export const Template = (args: any) => <Link {...args} />
Template.args = {
  href: '#',
  children: 'Lorem ipsum',
  variant: 'accent',
  external: false,
}

export const Variants = (args: any) => (
  <div className="space-y-4">
    <div>
      <Link {...args} href="#" variant="inherit">
        inherit
      </Link>
    </div>
    <div>
      <Link {...args} href="#" variant="neutral">
        neutral
      </Link>
    </div>
    <div>
      <Link {...args} href="#" variant="accent">
        accent
      </Link>
    </div>
  </div>
)

export const External = (args: any) => (
  <Variants href="https://tailwindcss.com/" external />
)

export const InlineWithText = (args: any) => (
  <Text className="text-black">
    Did you know that <Link>links can live inline with text</Link>
  </Text>
)
