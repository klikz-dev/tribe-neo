import DesktopComputerIcon from '@heroicons/react/outline/DesktopComputerIcon'
import DeviceMobileIcon from '@heroicons/react/outline/DeviceMobileIcon'
import dayjs from 'dayjs'

import {
  useAuthMemberSessions,
  useLogout,
} from '@tribeplatform/react-sdk/hooks'
import { Badge } from '@tribeplatform/react-ui-kit/Badge'
import { Button } from '@tribeplatform/react-ui-kit/Button'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { List } from '@tribeplatform/react-ui-kit/Layout'
import { Link } from '@tribeplatform/react-ui-kit/Link'
import { toast } from '@tribeplatform/react-ui-kit/Toast'

export const Devices = () => {
  const { data: memberSessions } = useAuthMemberSessions()
  const { mutateAsync: logout, isLoading } = useLogout()
  return (
    <Card>
      <Card.Header
        title="Sessions"
        description="This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize."
      />
      <Card.Content>
        <List divider>
          {memberSessions?.sessions
            ?.sort((a, b) => {
              return a.lastActivityAt > b.lastActivityAt ? -1 : 1
            })
            ?.map(session => (
              <List.Item key={session.id}>
                <div className="flex hover-trigger space-x-4">
                  {['iOS', 'Android'].indexOf(session.os) !== -1 ? (
                    <DeviceMobileIcon className="flex-shrink-0 w-10 h-10 text-basicSurface-200" />
                  ) : (
                    <DesktopComputerIcon className="flex-shrink-0 w-10 h-10 text-basicSurface-200" />
                  )}
                  <div className="flex-grow flex flex-col space-y-2">
                    <h4>
                      {session.country}{' '}
                      <Link
                        target="_blank"
                        external
                        href={`https://dnschecker.org/ip-whois-lookup.php?query=${session.ip}`}
                      >
                        {session.ip}
                      </Link>
                    </h4>
                    <p>
                      {session.os} {session.osVersion}{' '}
                      {session.active && (
                        <Badge
                          rounded
                          size="md"
                          className="ml-1"
                          variant="secondary"
                        >
                          Active session
                        </Badge>
                      )}
                    </p>
                    <p>
                      Initiated{' '}
                      <time
                        className="cursor-help"
                        dateTime={session.createdAt}
                        title={session.createdAt}
                      >
                        {dayjs(session?.createdAt).fromNow()}
                      </time>
                      , last activity{' '}
                      <time
                        className="cursor-help"
                        dateTime={session.lastActivityAt}
                        title={session.lastActivityAt}
                      >
                        {dayjs(session?.lastActivityAt).fromNow()}
                      </time>
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover-target"
                      loading={isLoading}
                      onClick={() => {
                        logout({
                          input: { sessionId: session.id },
                        })
                          .then(() => {
                            toast({
                              title: 'Logout successful',
                              status: 'success',
                            })
                          })
                          .catch(() => {
                            toast({
                              title: 'Logout failed',
                              status: 'error',
                            })
                          })
                      }}
                    >
                      Log out
                    </Button>
                  </div>
                </div>
              </List.Item>
            ))}
        </List>
      </Card.Content>
    </Card>
  )
}
