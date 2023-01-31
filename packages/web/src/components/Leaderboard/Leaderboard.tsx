import { useState } from 'react'

import { ReportTimeFrame } from '@tribeplatform/gql-client/types'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Tabs } from '@tribeplatform/react-ui-kit/Tabs'

import { DEFAULT_MEMBERS_COUNT } from './constants'
import { LeaderboardTab } from './LeaderboardTab'
import { LeaderboardSettings } from './settings/LeaderboardSettings'

export const Leaderboard = ({
  heading,
  membersCount = DEFAULT_MEMBERS_COUNT,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0)

  return (
    <div className="mb-5">
      <Card>
        <Card.Header title={heading || 'Leaderboard'} />
        <Card.Content>
          <Tabs.Group onChange={setActiveTab} defaultIndex={activeTab}>
            <Tabs.List size="sm" variant="pills" fullWidth>
              <Tabs.Tab name={ReportTimeFrame.ALL_TIME}>All time</Tabs.Tab>
              <Tabs.Tab name={ReportTimeFrame.LAST_THIRTY_DAYS}>Month</Tabs.Tab>
              <Tabs.Tab name={ReportTimeFrame.LAST_SEVEN_DAYS}>Week</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panels>
              <Tabs.Panel>
                <LeaderboardTab
                  active={activeTab === 0}
                  membersCount={membersCount}
                  timeframe={ReportTimeFrame.ALL_TIME}
                />
              </Tabs.Panel>
              <Tabs.Panel>
                <LeaderboardTab
                  active={activeTab === 1}
                  membersCount={membersCount}
                  timeframe={ReportTimeFrame.LAST_THIRTY_DAYS}
                />
              </Tabs.Panel>
              <Tabs.Panel>
                <LeaderboardTab
                  active={activeTab === 2}
                  membersCount={membersCount}
                  timeframe={ReportTimeFrame.LAST_SEVEN_DAYS}
                />
              </Tabs.Panel>
            </Tabs.Panels>
          </Tabs.Group>
        </Card.Content>
      </Card>
    </div>
  )
}

Leaderboard.Settings = LeaderboardSettings
