import { Dispatch, SetStateAction } from 'react'

import { Select } from '@tribeplatform/react-ui-kit/Select'

export type EditModeSelectorProps = {
  editMode: 'Navigation' | 'Content'
  setEditMode: Dispatch<SetStateAction<'Navigation' | 'Content'>>
}

export const EditModeSelector = ({
  editMode,
  setEditMode,
}: EditModeSelectorProps) => (
  <div className="w-60">
    <Select value={editMode} onChange={setEditMode}>
      <Select.Button>{editMode}</Select.Button>
      <Select.Items>
        <Select.Item key="Navigation" value="Navigation">
          Navigation
        </Select.Item>
        <Select.Item key="Content" value="Content">
          Content
        </Select.Item>
      </Select.Items>
    </Select>
  </div>
)
