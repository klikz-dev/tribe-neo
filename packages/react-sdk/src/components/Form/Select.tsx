import { ReactNode } from 'react'

import { Controller } from 'react-hook-form'

import {
  FormControl,
  FormControlSelectProps,
} from '@tribeplatform/react-ui-kit/FormControl'
import { Select as SelectComponent } from '@tribeplatform/react-ui-kit/Select'

import { FormInjectedProps, FormValidationProps } from './typings'

export type SelectProps = Omit<
  FormControlSelectProps,
  'value' | 'onChange' | 'children'
> &
  FormValidationProps & {
    value?: any
    onChange?: (newValue: any) => void
    children?: ReactNode
    renderButton?: (value: any) => ReactNode
  }

export function Select({
  control,
  renderButton,
  children,
  register: _,
  name,
  validation,
  error: ___,
  onChange: selectOnChange,
  value: __,
  ...rest
}: FormInjectedProps & SelectProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={validation}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl.Select
          name={name}
          invalid={!!error?.message}
          error={error?.message}
          value={value}
          onChange={value => {
            onChange(value)
            if (typeof selectOnChange === 'function') selectOnChange(value)
          }}
          {...rest}
        >
          <SelectComponent.Button>
            {typeof renderButton === 'function' ? renderButton(value) : value}
          </SelectComponent.Button>
          {children}
        </FormControl.Select>
      )}
    />
  )
}
