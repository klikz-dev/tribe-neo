import { ReactElement } from 'react'

import { BlockWrapperInput } from '@tribeplatform/slate-kit/blocks'
import { SlateEditable } from '@tribeplatform/slate-kit/enums'
import {
  useSlate,
  useSlateComponent,
  useSlateKit,
} from '@tribeplatform/slate-kit/hooks'

import { ComponentSettings } from './ComponentSettings.component'
import { LeafComponentWrapper } from './LeafComponentWrapper.component'

export const ComponentWrapper = ({
  name,
  Component,
  componentProps,
  componentChildren,
  SettingsComponent,
}: BlockWrapperInput): ReactElement | null => {
  const { kit } = useSlateKit()
  const slateProps = useSlate()
  const { mode, editable } = slateProps
  const slateComponentProps = useSlateComponent()
  const { component, componentId, parentComponentId, componentLevel } =
    slateComponentProps

  const displayName =
    (Component.displayName !== 'Loadable' && Component.displayName) || name
  const children = (
    <Component {...componentProps}>{componentChildren}</Component>
  )
  if (mode === 'live' || editable === SlateEditable.NONE)
    return children || null

  const ComponentAdder = kit.loadComponentAdder()
  const permitToAdd =
    ComponentAdder &&
    (editable === SlateEditable.ALL || editable === SlateEditable.ADD_COMPONENT)
  const permitToEdit =
    SettingsComponent &&
    (editable === SlateEditable.ALL ||
      editable === SlateEditable.EDIT_COMPONENT)
  const Settings = permitToEdit ? (
    <ComponentSettings
      componentId={componentId}
      componentLevel={componentLevel}
      parentComponentId={parentComponentId}
      Settings={<SettingsComponent />}
      slateProps={slateProps}
    />
  ) : null

  if (component.acceptsChildren) {
    return children
  }
  return (
    <LeafComponentWrapper
      Settings={Settings}
      displayName={displayName}
      permitToAdd={permitToAdd}
      permitToEdit={permitToEdit}
    >
      {children}
    </LeafComponentWrapper>
  )
}
