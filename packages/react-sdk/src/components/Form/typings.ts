import { ComponentProps } from 'react'

import { FieldError, RegisterOptions, UseFormReturn } from 'react-hook-form'

export type FormInjectedProps = {
  control?: UseFormReturn['control']
  register: any // UseFormRegister<TFieldValues>
  error?: FieldError
}
export type FormValidationProps = {
  validation?: RegisterOptions
}

export type FormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
  defaultValues?: Record<string, unknown>
  onSubmit: (
    data: any,
    methods?: UseFormReturn<any, Record<string, unknown>>,
  ) => void | Promise<unknown>
}

export type FormRef = {
  methods: UseFormReturn<Record<string, unknown>, Record<string, unknown>>
}

export type FormComponent = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<FormProps> & React.RefAttributes<FormRef>
>
