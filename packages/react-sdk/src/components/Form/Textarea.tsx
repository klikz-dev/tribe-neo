import { Controller } from 'react-hook-form'

import {
  FormControl,
  FormControlTextareaProps,
} from '@tribeplatform/react-ui-kit/FormControl'

import { FormInjectedProps, FormValidationProps } from './typings'

export type TextareaProps = FormControlTextareaProps & FormValidationProps

export function Textarea({
  control,
  register: _,
  name,
  validation,
  error: ___,
  value: __,
  defaultValue,
  ...rest
}: FormInjectedProps & TextareaProps) {
  const maxLength: number | undefined =
    typeof validation?.maxLength === 'object' &&
    typeof validation?.maxLength?.value === 'number'
      ? validation?.maxLength?.value
      : undefined

  return (
    <Controller
      control={control}
      name={name}
      rules={validation}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl.Textarea
          name={name}
          invalid={!!error?.message}
          error={error?.message}
          onChange={onChange}
          value={value}
          cornerHint={
            maxLength > 0 && !!value
              ? `${value.length}/${maxLength}`
              : undefined
          }
          {...rest}
        />
      )}
    />
  )
}
