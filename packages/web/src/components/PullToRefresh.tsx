import { useState } from 'react'

import ArrowDownIcon from '@heroicons/react/outline/ArrowDownIcon'
import ArrowUpIcon from '@heroicons/react/outline/ArrowUpIcon'
import CheckIcon from '@heroicons/react/outline/CheckIcon'
import RmcPullToRefresh from 'rmc-pull-to-refresh'

import { useQueryClient } from '@tribeplatform/react-sdk/lib'
import { SpinnerIcon } from '@tribeplatform/react-ui-kit/icons'

export const PullToRefresh = ({ disabled = false, children }) => {
  const [refreshing, setRefreshing] = useState(false)
  const queryClient = useQueryClient()

  if (typeof window === 'undefined') return null

  if (disabled) return <div className="pt-5 sm:pt-7">{children}</div>

  return (
    <RmcPullToRefresh
      prefixCls="pull-to-refresh"
      distanceToRefresh={50}
      refreshing={refreshing}
      getScrollContainer={() => document?.body}
      onRefresh={async () => {
        setRefreshing(true)
        await queryClient.refetchQueries({ active: true })
        setRefreshing(false)
      }}
      indicator={{
        deactivate: (
          <div className="flex justify-center">
            <ArrowDownIcon className="w-6 h-6" />
          </div>
        ),
        activate: (
          <div className="flex justify-center">
            <ArrowUpIcon className="w-6 h-6" />
          </div>
        ),
        release: (
          <div className="flex justify-center">
            <SpinnerIcon className="animate-spin" />
          </div>
        ),
        finish: (
          <div className="flex justify-center">
            <CheckIcon className="w-6 h-6" />
          </div>
        ),
      }}
    >
      <div className="pt-5 sm:pt-7">{children}</div>
    </RmcPullToRefresh>
  )
}
