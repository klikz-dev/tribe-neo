import { FC } from 'react'

import AddLineIcon from 'remixicon-react/AddLineIcon'

import { Divider } from '@tribeplatform/react-ui-kit/Divider'
import { Dropdown } from '@tribeplatform/react-ui-kit/Dropdown'

import { ComposerIconButton } from '../../Composer/components/ComposerControls/ComposerIconButton'
import { DefaultSlashMenuItems, MenuItem } from '../extensions/slash-menu/items'

interface SlashMenuButtonProps {
  onItemClick: (props: MenuItem) => void
}

export const SlashMenuButton: FC<SlashMenuButtonProps> = ({ onItemClick }) => {
  return (
    <div>
      <Dropdown>
        <Dropdown.ButtonMinimal>
          <ComposerIconButton icon={AddLineIcon} aria-label="Options" />
        </Dropdown.ButtonMinimal>
        <Dropdown.Items
          className="overflow-auto"
          style={{ maxHeight: '250px' }}
        >
          {DefaultSlashMenuItems.map((item, index) => {
            if (item.type === 'divider') {
              // eslint-disable-next-line react/no-array-index-key
              return <Divider key={`divider-${index}`} />
            }
            return (
              <Dropdown.Item
                onClick={() => onItemClick(item)}
                key={item.label}
                leadingIcon={
                  <div className="w-4 h-4 flex items-center">{item.icon}</div>
                }
              >
                {item.label}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Items>
      </Dropdown>
    </div>
  )
}
