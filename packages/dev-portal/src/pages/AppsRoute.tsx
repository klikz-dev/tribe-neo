import { Redirect, Route, Switch } from 'wouter'

import { Collaborators } from '../containers/App/containers/Collaborators'
import { Credentials } from '../containers/App/containers/Credentials/Credentials'
import { CustomCode } from '../containers/App/containers/CustomCode'
import { Information } from '../containers/App/containers/Information'
import { TestAndPublish } from '../containers/App/containers/TestAndPublish'
import { Webhooks } from '../containers/App/containers/Webhooks'
import { AppsContainer } from '../containers/Apps/AppsContainer'
import { CreateAppContainer } from '../containers/Apps/CreateAppContainer'

export const AppsRoute = () => {
  return (
    <Switch>
      <Route path="/apps">
        <AppsContainer />
      </Route>
      <Route path="/apps/create">
        <AppsContainer />
        <CreateAppContainer />
      </Route>
      <Route path="/apps/:appSlug">
        {params => <Redirect to={`/apps/${params.appSlug}/information`} />}
      </Route>
      <Route path="/apps/:appSlug/information">
        <Information />
      </Route>
      <Route path="/apps/:appSlug/credentials">
        <Credentials />
      </Route>
      <Route path="/apps/:appSlug/custom-code">
        <CustomCode />
      </Route>
      <Route path="/apps/:appSlug/collaborators">
        <Collaborators />
      </Route>
      <Route path="/apps/:appSlug/webhooks">
        <Webhooks />
      </Route>
      <Route path="/apps/:appSlug/test-and-publish">
        <TestAndPublish />
      </Route>
    </Switch>
  )
}
