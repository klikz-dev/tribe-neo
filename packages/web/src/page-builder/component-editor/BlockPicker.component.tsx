import { ReactElement } from 'react'

import { useSlateKit } from '@tribeplatform/slate-kit/hooks'

import { Leaderboard } from '../../components/Leaderboard'

export const BlockPicker = (): ReactElement => {
  const { updateActiveBlock } = useSlateKit()
  const blocks = [{ name: 'Leaderboard', preview: Leaderboard }]
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Add Block</h3>
      <ul
        className="divide-y divide-neutral-200 border border-neutral-200 rounded-md overflow-hidden"
        onMouseLeave={() => {
          updateActiveBlock({ Preview: undefined })
        }}
      >
        {blocks.map(block => (
          <li
            key={block.name}
            className="relative bg-surface-50 hover:bg-surface-100 focus-within:ring-2 focus-within:ring-inset focus-within:ring-actionPrimary-600"
            onMouseEnter={() => {
              updateActiveBlock({ Preview: block.preview })
            }}
          >
            <div className="flex justify-between space-x-3">
              <div className="min-w-0 flex-1">
                <a href="#" className="block focus:outline-none py-5 px-4 ">
                  <p className="text-sm font-medium text-basicSurface-900 truncate">
                    {block.name}
                  </p>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
