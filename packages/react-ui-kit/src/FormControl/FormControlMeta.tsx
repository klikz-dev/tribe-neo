import { FC } from 'react'

import { HelperText } from './HelperText'
import { FormControlMetaProps } from './types'

export const FormControlMeta: FC<FormControlMetaProps> = ({
  invalid,
  helperText,
  error,
}) => (
  <>
    {!invalid && helperText && (
      <div className="mt-2">
        <HelperText invalid={invalid}>{helperText}</HelperText>
      </div>
    )}
    {invalid && error && (
      <div className="mt-2">
        <HelperText invalid={invalid}>{error}</HelperText>
      </div>
    )}
  </>
)
