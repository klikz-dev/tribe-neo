import { ReactNode } from 'react'

import { Controller } from 'react-hook-form'

import {
  FormControl,
  FormControlRadioGroupProps,
} from '@tribeplatform/react-ui-kit/FormControl'

import { FormInjectedProps, FormValidationProps } from './typings'

export type RadioGroupProps = Omit<
  FormControlRadioGroupProps,
  'value' | 'onChange'
> &
  FormValidationProps & {
    renderButton: (value: any) => ReactNode
    value?: any
    onChange?: (newValue: any) => void
  }

export function RadioGroup({
  control,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderButton,
  children,
  register: _,
  name,
  validation,
  ...rest
}: FormInjectedProps & RadioGroupProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={validation}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl.RadioGroup
          name={name}
          invalid={!!error?.message}
          error={error?.message}
          value={value}
          onChange={value => {
            onChange(value)
          }}
          {...rest}
        >
          {children}
        </FormControl.RadioGroup>
      )}
    />
  )
}
