import {
  FormControl,
  FormControlInputProps,
} from '@tribeplatform/react-ui-kit/FormControl'

import { FormInjectedProps, FormValidationProps } from './typings'

export type InputProps = FormControlInputProps & FormValidationProps

export function Input({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  register = (_, __) => {},
  name,
  validation,
  error,
  control: _,
  ...rest
}: FormInjectedProps & InputProps) {
  return (
    <FormControl.Input
      name={name}
      invalid={!!error?.message}
      error={error?.message}
      {...register(name, validation)}
      {...rest}
    />
  )
}
