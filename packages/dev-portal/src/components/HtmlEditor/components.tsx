import { Ref, PropsWithChildren, forwardRef } from 'react'

import clsx from 'clsx'
import ReactDOM from 'react-dom'

interface BaseProps {
  className: string
  [key: string]: unknown
}
type OrNull<T> = T | null

export const Button = forwardRef(
  (
    {
      className,
      active,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean
        reversed: boolean
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>,
  ) => (
    <span
      {...props}
      ref={ref}
      className={clsx(
        className,
        'cursor-pointer px-2 py-2 rounded-md text-sm font-black',
        active ? 'text-basicMain-900 bg-main-200' : 'text-basicMain-200',
      )}
    />
  ),
)

export const Instruction = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>,
  ) => <div {...props} ref={ref} className={clsx(className)} />,
)

export const Menu = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>,
  ) => (
    <div
      {...props}
      ref={ref}
      className={clsx('display-inline space-x-2', className)}
    />
  ),
)

export const Portal = ({ children }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null
}

export const Toolbar = forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>,
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={clsx('relative pt-1 pb-3 mb-5 border-b-2', className)}
    />
  ),
)
