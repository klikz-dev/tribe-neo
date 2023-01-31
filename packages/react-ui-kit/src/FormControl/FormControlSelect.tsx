import { FC } from 'react'

import { Select } from '../Select'
import { FormControlMeta } from './FormControlMeta'
import { Label } from './Label'
import { FormControlSelectProps } from './types'

export const FormControlSelect: FC<FormControlSelectProps> = props => {
  const { name, label, helperText, error, invalid, onChange, ...rest } = props
  return (
    <div>
      {label ? <Label htmlFor={name}>{label}</Label> : null}
      <div className="mt-1">
        <Select {...rest} onChange={onChange} name={name} invalid={invalid} />
        <FormControlMeta {...{ helperText, error, invalid }} />
      </div>
    </div>
  )
}
