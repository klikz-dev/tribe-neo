import { Controller } from 'react-hook-form'

import {
  PickerFormControl,
  PickerFormControlSpaceProps,
} from '../Picker/PickerFormControl'
import { FormInjectedProps, FormValidationProps } from './typings'

export type SpacePickerProps = PickerFormControlSpaceProps & FormValidationProps

export function FormSpacePicker({
  control,
  register: _,
  name,
  validation,
  ...rest
}: FormInjectedProps & SpacePickerProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={validation}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <PickerFormControl.SpacePicker
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
