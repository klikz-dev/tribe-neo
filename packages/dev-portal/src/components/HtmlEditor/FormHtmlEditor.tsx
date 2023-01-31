import { Controller } from 'react-hook-form'

import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'

import { HtmlEditor } from './HtmlEditor'

export const FormHtmlEditor = ({
  control,
  register: _,
  name,
  value: __,
  placeholder,
  ...rest
}: any) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <FormControl.Textarea
            name={name}
            invalid={!!error?.message}
            error={error?.message}
            value={value}
            onChange={onChange}
            className="hidden"
            {...rest}
          />
          <HtmlEditor
            initialValue={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
      )}
    />
  )
}
