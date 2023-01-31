import { FC } from 'react'

import { FormActions, FormActionsProps } from './Actions'
import { AvatarInput, AvatarInputProps } from './AvatarInput'
import { Checkbox, CheckboxProps } from './Checkbox'
import { Form as FormComponent } from './Form'
import { FormMemberPicker, MemberPickerProps } from './FormMemberPicker'
import { FormSpacePicker, SpacePickerProps } from './FormSpacePicker'
import { Input, InputProps } from './Input'
import { RadioGroup, RadioGroupProps } from './Radio'
import { Select, SelectProps } from './Select'
import { Textarea, TextareaProps } from './Textarea'
import { Toggle, ToggleProps } from './Toggle'
import { FormComponent as FormComponentType } from './typings'

export * from './typings'
export interface FormType extends FormComponentType {
  Avatar?: FC<AvatarInputProps>
  Checkbox?: FC<CheckboxProps>
  Input?: FC<InputProps>
  MemberPicker?: FC<MemberPickerProps>
  RadioGroup?: FC<RadioGroupProps>
  Select?: FC<SelectProps>
  SpacePicker?: FC<SpacePickerProps>
  Textarea?: FC<TextareaProps>
  Toggle?: FC<ToggleProps>
  Actions?: FC<FormActionsProps>
}

export const Form: FormType = FormComponent

Form.Avatar = AvatarInput
Form.Checkbox = Checkbox
Form.Input = Input
Form.MemberPicker = FormMemberPicker
Form.RadioGroup = RadioGroup
Form.Select = Select
Form.SpacePicker = FormSpacePicker
Form.Textarea = Textarea
Form.Toggle = Toggle
Form.Actions = FormActions
