import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  createElement,
  useImperativeHandle,
  forwardRef,
} from 'react'

import { FormProvider, get, useForm } from 'react-hook-form'

import { Alert } from '@tribeplatform/react-ui-kit/Alert'

import { FormRef, FormProps } from './typings'

export const Form = forwardRef<FormRef, FormProps>(
  ({ defaultValues = {}, children, onSubmit, ...rest }, ref) => {
    const methods = useForm<Record<string, unknown>, Record<string, unknown>>({
      defaultValues,
    })
    const [generalErrors, setGeneralErrors] = useState([])
    const {
      setError,
      register,
      control,
      handleSubmit,
      formState: { errors },
    } = methods

    function recursiveMap(children, fn) {
      return Children.map(children, child => {
        if (!isValidElement(child)) {
          return child
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (child.props.children) {
          child = cloneElement(child, {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            children: recursiveMap(child.props.children, fn),
          })
        }

        return fn(child)
      })
    }

    async function submitForm(data) {
      try {
        setGeneralErrors([])
        await onSubmit(data, methods)
      } catch (err) {
        const errors = err?.response?.errors
        const errMsgs = []
        errors?.forEach(e => {
          if (e?.field) {
            setError(e?.field as any, {
              type: 'validate',
              message: e?.message,
            })
          } else if (e?.message) {
            errMsgs.push(e)
          }
        })

        if (errMsgs.length) {
          setGeneralErrors(errMsgs)
        }
      }
    }

    useImperativeHandle(ref, () => ({
      methods,
    }))

    if (typeof children === 'function') {
      children = children({ ...methods, submitForm })
    }

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitForm)} {...rest}>
          {generalErrors?.length ? (
            <Alert status="error" className="mb-3">
              {generalErrors.map(err => {
                if (!err?.message) return null
                return <div key={err?.message}>{err?.message}</div>
              })}
            </Alert>
          ) : null}

          {recursiveMap(children, child => {
            const { name } = child.props
            if (!name) return child
            const error = get(errors, name, null)

            return createElement(child.type, {
              ...{
                ...child.props,
                register,
                control,
                key: child.props.name,
                error,
              },
            })
          })}
        </form>
      </FormProvider>
    )
  },
)
