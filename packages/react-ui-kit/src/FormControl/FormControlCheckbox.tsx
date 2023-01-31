import { forwardRef } from 'react'

import { Checkbox } from '../Checkbox'
import { FormControlMeta } from './FormControlMeta'
import { FormControlCheckboxProps } from './types'

export const FormControlCheckbox = forwardRef<
  HTMLInputElement,
  FormControlCheckboxProps
>((props, ref) => {
  const { name, label, helperText, error, invalid, ...rest } = props

  return (
    <div>
      <Checkbox {...rest} name={name} invalid={invalid} ref={ref}>
        {label}
      </Checkbox>
      <FormControlMeta {...{ helperText, error, invalid }} />
    </div>
  )
})
