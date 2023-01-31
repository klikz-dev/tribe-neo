import { ComponentProps, FC } from 'react'

import { RadioGroupProps } from '../RadioGroup'
import { SelectProps } from '../Select'
import { ToggleProps } from '../Toggle'

export type FormControlProps = {
  required?: boolean
  invalid?: boolean
  name: string
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
}

export type FormControlLabelProps = ComponentProps<'label'> & {
  hidden?: boolean
  helperText?: string
}

export type FormControlCheckboxProps = ComponentProps<'input'> &
  FormControlProps

export type FormControlInputProps = ComponentProps<'input'> & FormControlProps

export type FormControlMetaProps = {
  invalid?: boolean
  helperText?: string
  error?: string
}

export type FormControlRadioGroupProps = FormControlProps &
  RadioGroupProps<string>

export type FormControlSelectProps = FormControlProps & SelectProps<unknown>

export type FormControlTextareaProps = ComponentProps<'textarea'> &
  FormControlProps & {
    cornerHint?: string
  }

export type FormControlToggleProps = FormControlProps & ToggleProps

export type FormControlHelperTextProps = {
  invalid?: boolean
  className?: string
}

export interface FormControlType extends FC {
  Label?: FC<FormControlLabelProps>
  HelperText?: FC<FormControlHelperTextProps>
  Meta?: FC<FormControlMetaProps>

  Checkbox?: FC<FormControlCheckboxProps>
  Input?: FC<FormControlInputProps>
  InputCopy?: FC<FormControlInputProps>
  Textarea?: FC<FormControlTextareaProps>
  Toggle?: FC<FormControlToggleProps>
  Select?: FC<FormControlSelectProps>
  RadioGroup?: FC<FormControlRadioGroupProps>
}
