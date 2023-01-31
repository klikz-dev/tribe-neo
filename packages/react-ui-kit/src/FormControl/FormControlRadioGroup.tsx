import { FC } from 'react'

import { RadioGroup } from '../RadioGroup'
import { FormControlMeta } from './FormControlMeta'
import { Label } from './Label'
import { FormControlRadioGroupProps } from './types'

export const FormControlRadioGroup: FC<FormControlRadioGroupProps> = props => {
  const {
    children,
    name,
    label,
    helperText,
    error,
    invalid,
    onChange,
    ...rest
  } = props
  return (
    <div>
      {label ? <Label htmlFor={name}>{label}</Label> : null}
      <div className="mt-1">
        <RadioGroup {...rest} onChange={onChange} name={name}>
          {children}
        </RadioGroup>
        <FormControlMeta {...{ helperText, error, invalid }} />
      </div>
    </div>
  )
}
