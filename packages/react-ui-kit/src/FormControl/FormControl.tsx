import { FormControlCheckbox } from './FormControlCheckbox'
import { FormControlInput } from './FormControlInput'
import { FormControlInputCopy } from './FormControlInputCopy'
import { FormControlMeta } from './FormControlMeta'
import { FormControlRadioGroup } from './FormControlRadioGroup'
import { FormControlSelect } from './FormControlSelect'
import { FormControlTextarea } from './FormControlTextarea'
import { FormControlToggle } from './FormControlToggle'
import { HelperText } from './HelperText'
import { Label } from './Label'
import { FormControlType } from './types'

/**
 * FormControl provides context such as invalid, disabled, and required to form elements.
 */
export const FormControl: FormControlType = ({ children }) => (
  <div className="space-y-1">{children}</div>
)

FormControl.Label = Label
FormControl.HelperText = HelperText
FormControl.Meta = FormControlMeta

FormControl.Input = FormControlInput
FormControl.InputCopy = FormControlInputCopy
FormControl.Checkbox = FormControlCheckbox
FormControl.Textarea = FormControlTextarea
FormControl.Toggle = FormControlToggle
FormControl.Select = FormControlSelect
FormControl.RadioGroup = FormControlRadioGroup
