import { Controller } from 'react-hook-form'

import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'

import { CodeEditor } from './CodeEditor'

export const FormCodeEditor = ({
  control,
  register: _,
  name,
  value: __,
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
          <CodeEditor initialValue={value} onChange={onChange} />
        </div>
      )}
    />
  )
}
