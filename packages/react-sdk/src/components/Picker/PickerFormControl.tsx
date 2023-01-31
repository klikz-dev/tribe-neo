import { FC } from 'react'

import {
  FormControl,
  FormControlProps,
} from '@tribeplatform/react-ui-kit/FormControl'

import { MemberPicker, MemberPickerProps } from './MemberPicker'
import { SpacePicker, SpacePickerProps } from './SpacePicker'

export const PickerFormControl = ({ children }) => (
  <div className="space-y-1">{children}</div>
)

export type PickerFormControlSpaceProps = FormControlProps & SpacePickerProps

export const PickerFormControlSpace: FC<
  PickerFormControlSpaceProps
> = props => {
  const {
    children,
    name,
    label,
    helperText,
    error,
    invalid,
    onChange,
    value,
    ...rest
  } = props
  return (
    <div>
      {label ? (
        <FormControl.Label htmlFor={name}>{label}</FormControl.Label>
      ) : null}
      <div className="mt-1">
        <SpacePicker {...rest} value={value as any} onChange={onChange as any}>
          {children}
        </SpacePicker>
        <FormControl.Meta
          {...{
            helperText,
            error,
            invalid,
          }}
        />
      </div>
    </div>
  )
}

export type PickerFormControlMemberProps = FormControlProps & MemberPickerProps

export const PickerFormControlMember: FC<
  PickerFormControlMemberProps
> = props => {
  const {
    children,
    name,
    label,
    helperText,
    error,
    invalid,
    onChange,
    value,
    ...rest
  } = props
  return (
    <div>
      {label ? (
        <FormControl.Label htmlFor={name}>{label}</FormControl.Label>
      ) : null}
      <div className="mt-1">
        <MemberPicker {...rest} value={value as any} onChange={onChange as any}>
          {children}
        </MemberPicker>
        <FormControl.Meta
          {...{
            helperText,
            error,
            invalid,
          }}
        />
      </div>
    </div>
  )
}

PickerFormControl.SpacePicker = PickerFormControlSpace
PickerFormControl.MemberPicker = PickerFormControlMember
