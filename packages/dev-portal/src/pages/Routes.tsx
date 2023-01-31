import { Redirect, Route, Router, Switch } from 'wouter'

import { NotFound } from '../components/Error/NotFound'
import { Navbar } from '../components/Navbar'
import { MobileSidebarProvider } from '../MobileSidebarProvider'
import { AppsRoute } from './AppsRoute'
import { AuthorizedRoute } from './components/AuthorizedRoute'
import { LayoutLoader } from './LayoutLoader.component'

export const Routes = () => {
  return (
    <MobileSidebarProvider>
      <div className="bg-main-50 min-h-screen">
        <Route path="/">
          <Redirect to="/portal/apps" />
        </Route>
        <Router base="/portal">
          <Switch>
            <Route path="/">
              <Redirect to="/apps" />
            </Route>
            <Route path="/apps/:rest*">
              <AuthorizedRoute>
                <LayoutLoader Content={<AppsRoute />} />
              </AuthorizedRoute>
            </Route>
            <Route>
              <Navbar />
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </MobileSidebarProvider>
  )
}
