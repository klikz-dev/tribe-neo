import MailIcon from '@heroicons/react/solid/MailIcon'

import { Link } from '../Link'
import { Input } from './Input'

export default {
  title: 'Forms/Input',
  component: Input,
}

export const Template = (args: any) => <Input {...args} />

Template.args = {
  placeholder: 'you@example.com',
  invalid: false,
  disabled: false,
}

export const Disabled = (args: any) => (
  <Input placeholder="you@example.com" disabled />
)
export const WithValidationError = (args: any) => (
  <Input placeholder="you@example.com" invalid defaultValue="adamwathan" />
)

export const WithLeadingIcon = (args: any) => (
  <Input placeholder="you@example.com" leadingIcon={<MailIcon />} />
)

export const WithTrailingIcon = (args: any) => (
  <Input placeholder="you@example.com" trailingIcon={<MailIcon />} />
)

export const WithLeadingAddon = (args: any) => (
  <Input placeholder="www.example.com" leadingAddon="http://" />
)

export const WithTrailingAddon = (args: any) => (
  <Input placeholder="0.00" trailingAddon="USD" />
)

export const WithLeadingAndTrailingAddon = (args: any) => (
  <Input placeholder="0.00" leadingAddon="$" trailingAddon="USD" />
)

export const WithCustomTrailingAddon = (args: any) => (
  <Input placeholder="0.00" trailingAddon={<Link>Copy</Link>} />
)
