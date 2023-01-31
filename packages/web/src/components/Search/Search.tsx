import { useSearch } from '@tribeplatform/react-sdk/hooks'

import { useDebounce } from '../../utils/useDebounce'
import { SearchList } from './SearchList'

type SearchProps = {
  query: string
}

export const Search = ({ query }: SearchProps) => {
  const debouncedQuery = useDebounce(query, 300)
  const { data } = useSearch({
    variables: {
      input: {
        query: debouncedQuery,
      },
    },
  })

  return <SearchList query={debouncedQuery} result={data} />
}
