import { Dispatch, SetStateAction } from 'react'

import { Page } from '@tribeplatform/gql-client/types'
import { Select } from '@tribeplatform/react-ui-kit/Select'

export type PageSelectorProps = {
  pages: Page[]
  pageSlug: string
  setPageSlug: Dispatch<SetStateAction<string>>
}

export const PageSelector = ({
  pages,
  pageSlug,
  setPageSlug,
}: PageSelectorProps) => {
  const currentPage = pages?.find(page => page.slug === pageSlug)
  return (
    <div className="w-60">
      <Select value={pageSlug} onChange={setPageSlug}>
        <Select.Button>{currentPage?.seoDetail?.title}</Select.Button>
        <Select.Items>
          {pages?.map(page => (
            <Select.Item
              key={page.slug}
              value={page.slug}
              selected={pageSlug === page.slug}
            >
              {page?.seoDetail?.title}
            </Select.Item>
          ))}
        </Select.Items>
      </Select>
    </div>
  )
}
