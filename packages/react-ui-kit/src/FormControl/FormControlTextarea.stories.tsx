import { Textarea } from '../Textarea'
import { FormControl } from './FormControl'

export default {
  title: 'Forms/FormControl/Textarea',
  component: FormControl.Textarea,
}

export const Template = (args: any) => <FormControl.Textarea {...args} />

Template.args = {
  name: 'description',
  label: 'Description',
  placeholder: 'Write a description...',
  helperText: '',
  invalid: false,
}

export const WithValidationError = (args: any) => (
  <FormControl.Textarea
    {...Template.args}
    invalid
    defaultValue=""
    error="Description is required"
  />
)
