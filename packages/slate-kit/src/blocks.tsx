import { ReactElement } from 'react'

export type BlockFunc = (props: any) => ReactElement | null
export type ActiveBlock = {
  id: string
  name: string
  Settings: ReactElement | null
  Preview?: (props: any) => ReactElement | null
}
export type AddBlock = (props: { onAdd: (e) => void }) => ReactElement

export type BlockWrapperInput = {
  name: string
  Component: BlockFunc
  componentProps: any
  componentChildren: any
  SettingsComponent?: BlockFunc
}
export type BlockWrapper = (props: BlockWrapperInput) => ReactElement

type CreateBlockProps = {
  Wrapper: BlockWrapper
  Component: BlockFunc
  SettingsComponent?: BlockFunc
  name: string
}

export const createBlock = ({
  Wrapper,
  Component,
  ...blockProps
}: CreateBlockProps): BlockFunc => {
  return ({ children, ...props }) => {
    return Wrapper ? (
      <Wrapper
        {...blockProps}
        Component={Component}
        componentChildren={children}
        componentProps={props}
      />
    ) : (
      <Component {...props}>{children}</Component>
    )
  }
}
