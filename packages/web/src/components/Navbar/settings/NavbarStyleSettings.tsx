import { List } from '@tribeplatform/react-ui-kit/Layout'
import { RadioGroup } from '@tribeplatform/react-ui-kit/RadioGroup'
import { useSlate, useSlateComponent } from '@tribeplatform/slate-kit/hooks'

import { availableNavbarStyles } from '../constants'
import { getCleanNavbarProps } from '../utils'

export const NavbarStyleSettings = () => {
  const { context } = useSlate()
  const { component, upsertProp } = useSlateComponent()
  const { view } = getCleanNavbarProps({
    network: context.network,
    props: component?.props,
  })

  const updateStyle = newStyle => {
    upsertProp('view', newStyle)
  }

  return (
    <List spacing="sm">
      <List.Item>
        <h3 className="leading-6 text-basicSurface-500">Styles</h3>
      </List.Item>
      <List.Item>
        <RadioGroup value={view} onChange={updateStyle}>
          <RadioGroup.Items>
            {availableNavbarStyles.map(view => (
              <RadioGroup.Item
                key={view.value}
                value={view.value}
                title={view.title}
              >
                {view.title}
              </RadioGroup.Item>
            ))}
          </RadioGroup.Items>
        </RadioGroup>
      </List.Item>
    </List>
  )
}
