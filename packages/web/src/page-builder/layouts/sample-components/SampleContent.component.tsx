import { ReactElement } from 'react'

import { Link } from '@tribeplatform/react-ui-kit/Link'
import { SectionHeader } from '@tribeplatform/react-ui-kit/SectionHeader'

import { SamplePost } from './SamplePost.component'

export const SampleContent = (): ReactElement => {
  return (
    <div className="flex flex-col space-y-5 m-5 p-5 border-4 border-dashed border-neutral-300 box-border">
      <SectionHeader
        title="Sample Elements"
        description="This page shows how elements within your community will be shown to your members. Change colors and fonts on the righthand panel, and see how they take effect"
      />

      <SamplePost />

      <div>
        This is a sample <Link>link</Link>.
      </div>
    </div>
  )
}
