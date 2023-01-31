import { FormControl } from '@tribeplatform/react-ui-kit/FormControl'
import { useSlateComponent } from '@tribeplatform/slate-kit/hooks'

import { DEFAULT_MEMBERS_COUNT, MAX_MEMBERS_COUNT } from '../constants'

export const LeaderboardSettings = () => {
  const { component, upsertProp } = useSlateComponent()
  const { props = {} } = component
  const {
    heading = 'Most active members',
    membersCount = DEFAULT_MEMBERS_COUNT,
  } = props

  return (
    <div className="grid grid-cols-1 gap-4">
      <FormControl.Input
        name="heading"
        label="Heading"
        value={heading}
        onChange={e => upsertProp('heading', e.target.value)}
      />
      <FormControl.Input
        name="membersCount"
        type="number"
        min="1"
        max={MAX_MEMBERS_COUNT}
        label="Number of Members"
        value={membersCount}
        placeholder={`${DEFAULT_MEMBERS_COUNT}`}
        onChange={e => {
          const number = parseInt(e.target.value, 10) || null
          upsertProp(
            'membersCount',
            number > MAX_MEMBERS_COUNT ? MAX_MEMBERS_COUNT : number,
          )
        }}
      />
    </div>
  )
}
