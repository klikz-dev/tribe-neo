import { Input } from '../Input'
import { FormControl } from './FormControl'

export default {
  title: 'Forms/FormControl/Input',
  component: FormControl.Input,
}

export const Template = (args: any) => <FormControl.Input {...args} />

Template.args = {
  name: 'email',
  label: 'Email',
  placeholder: 'you@example.com',
  helperText: "We'll only use this for spam.",
  invalid: false,
}

export const WithValidationError = (args: any) => (
  <FormControl.Input
    {...Template.args}
    invalid
    defaultValue="asdfsdf"
    error="Your password must be less than 4 characters."
  />
)

export const WithHiddenLabel = (args: any) => (
  <FormControl>
    <FormControl.Label htmlFor="email" hidden>
      Email
    </FormControl.Label>
    <Input id="email" placeholder="you@example.com" />
  </FormControl>
)

export const WithCornerHint = (args: any) => (
  <FormControl>
    <FormControl.Label htmlFor="email" helperText="Optional">
      Email
    </FormControl.Label>
    <Input id="email" placeholder="you@example.com" />
  </FormControl>
)
