import { Route, Switch } from 'react-router-dom'

import { useNetwork } from '@tribeplatform/react-sdk/hooks'

import { AdminMenu } from './AdminMenu'
import { Apps } from './Apps'
import { AppPage } from './Apps/AppPage'
import { Authentication } from './Authentication'
import { Domain } from './Domain'
import { MemberFields } from './MemberFields'
import { Members } from './Members'
import { ModerationSettings } from './ModerationSettings'
import { PendingPosts } from './PendingPosts'
import { Posts } from './Posts'
import { Settings } from './Settings'
import { Spaces } from './Spaces'

export const Admin = () => {
  const { data: network } = useNetwork()

  return (
    <AdminMenu>
      <Switch>
        <Route path="/admin/network/memberfields" exact>
          <MemberFields />
        </Route>
        <div className="p-5">
          <Route path="/admin/network/settings" exact>
            <Settings network={network} />
          </Route>
          <Route path="/admin/network/members" exact>
            <Members />
          </Route>
          <Route path="/admin/network/posts" exact>
            <Posts />
          </Route>
          <Route path="/admin/network/spaces" exact>
            <Spaces />
          </Route>
          <Route path="/admin/network/authentication" exact>
            <Authentication network={network} />
          </Route>
          <Route path="/admin/network/domain" exact>
            <Domain network={network} />
          </Route>
          <Route path="/admin/network/apps" exact>
            <Apps />
          </Route>
          <Route path="/admin/network/apps/:appSlug">
            <AppPage />
          </Route>
          <Route path="/admin/network/moderation/settings" exact>
            <ModerationSettings />
          </Route>
          <Route path="/admin/network/pending-posts" exact>
            <PendingPosts />
          </Route>
        </div>
      </Switch>
    </AdminMenu>
  )
}
