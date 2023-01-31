import { Textarea } from './Textarea'

export default {
  title: 'Forms/Textarea',
  component: Textarea,
}

export const Template = (args: any) => <Textarea {...args} />

Template.args = {
  placeholder: 'you@example.com',
  invalid: false,
  disabled: false,
}

export const Disabled = (args: any) => (
  <Textarea placeholder="you@example.com" disabled />
)

export const WithValidationError = (args: any) => (
  <Textarea placeholder="you@example.com" invalid defaultValue="adamwathan" />
)
