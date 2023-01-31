import {
  FormControl,
  FormControlCheckboxProps,
} from '@tribeplatform/react-ui-kit/FormControl'

import { FormInjectedProps, FormValidationProps } from './typings'

export type CheckboxProps = FormControlCheckboxProps & FormValidationProps

export function Checkbox({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  register = (_, __) => {},
  name,
  validation,
  error,
  control: _,
  ...rest
}: FormInjectedProps & CheckboxProps) {
  return (
    <FormControl.Checkbox
      name={name}
      invalid={!!error?.message}
      error={error?.message}
      {...register(name, validation)}
      {...rest}
    />
  )
}
