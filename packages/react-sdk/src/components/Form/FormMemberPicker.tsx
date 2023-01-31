import { Controller } from 'react-hook-form'

import {
  PickerFormControl,
  PickerFormControlMemberProps,
} from '../Picker/PickerFormControl'
import { FormInjectedProps, FormValidationProps } from './typings'

export type MemberPickerProps = PickerFormControlMemberProps &
  FormValidationProps

export function FormMemberPicker({
  control,
  register: _,
  name,
  validation,
  ...rest
}: FormInjectedProps & MemberPickerProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={validation}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <PickerFormControl.MemberPicker
          name={name}
          invalid={!!error?.message}
          error={error?.message}
          value={value}
          onChange={value => {
            onChange(value)
          }}
          {...rest}
        />
      )}
    />
  )
}
