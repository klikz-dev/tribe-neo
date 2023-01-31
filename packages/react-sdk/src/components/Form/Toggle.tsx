import { Controller } from 'react-hook-form'

import {
  FormControl,
  FormControlToggleProps,
} from '@tribeplatform/react-ui-kit/FormControl'

import { FormInjectedProps, FormValidationProps } from './typings'

export type ToggleProps = Omit<
  FormControlToggleProps,
  'value' | 'onChange' | 'checked'
> &
  FormValidationProps & {
    checked?: boolean
    onChange?: (value: boolean) => void
  }

export function Toggle({
  control,
  name,
  validation,
  onChange: selectOnChange,
  ...rest
}: FormInjectedProps & ToggleProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      rules={validation}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl.Toggle
          name={name}
          invalid={!!error?.message}
          error={error?.message}
          checked={value}
          onChange={value => {
            onChange(value)
            if (typeof selectOnChange === 'function') selectOnChange(value)
          }}
          {...rest}
        />
      )}
    />
  )
}
