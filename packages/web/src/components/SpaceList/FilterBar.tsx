import SearchIcon from '@heroicons/react/outline/SearchIcon'

import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Input } from '@tribeplatform/react-ui-kit/Input'

export const FilterBar = ({ setFilters }) => {
  return (
    <Card>
      <Card.Content>
        <Input
          leadingIcon={<SearchIcon />}
          onChange={e => setFilters({ query: e.target.value || undefined })}
          name="search"
          placeholder="Search spaces..."
        />
      </Card.Content>
    </Card>
  )
}
