import { Link, matchPath, Route, Switch, useLocation } from 'react-router-dom'

import { Tabs as DumbTabs } from '@tribeplatform/react-ui-kit/Tabs'
import { BlockContainer } from '@tribeplatform/slate-kit/components'
import { SlateContext, useSlate } from '@tribeplatform/slate-kit/hooks'

type TabsProps = {
  tabs: { name: string; path?: string }[]
  fullWidth?: boolean
  rounded?: 'none' | 'desktop' | 'all'
  attached?: 'top' | 'bottom' | 'none'
}

export const Tabs = ({
  tabs: flatTabs,
  rounded = 'desktop',
  fullWidth = false,
  attached = 'none',
}: TabsProps) => {
  const slateProps = useSlate()
  const { pathname: currentPath } = useLocation()
  const { path } = slateProps.context

  let { url } = matchPath(currentPath, path) || {}
  if (url?.endsWith('/')) url = url.slice(0, url.length - 1)
  if (!flatTabs?.length) return null

  const tabs = flatTabs.map(tab => {
    const { isExact = false } =
      matchPath(currentPath, `${path}${tab.path}`) || {}
    return {
      ...tab,
      path: `${path}${tab.path}`,
      url: `${url}${
        tab.path.endsWith('/')
          ? tab.path.slice(0, tab.path.length - 1)
          : tab.path
      }`,
      current: isExact,
    }
  })
  const tabRoutes = tabs
    .map((tab, idx) => (
      <Route key={tab.name} exact path={tab.path}>
        <SlateContext.Provider
          value={{
            ...slateProps,
            context: { ...slateProps.context, path: tab.path },
          }}
        >
          <DumbTabs.Panel as="div">
            <BlockContainer childId={idx} />
          </DumbTabs.Panel>
        </SlateContext.Provider>
      </Route>
    ))
    .reverse()

  return (
    <DumbTabs.Group as="div">
      <DumbTabs.List
        as="div"
        rounded={rounded}
        fullWidth={fullWidth}
        attached={attached}
        className="overflow-hidden"
      >
        {tabs.map(tab => (
          <DumbTabs.Tab
            as={Link}
            key={tab.name}
            name={tab.name}
            to={tab.url}
            selected={tab.current}
          >
            {tab.name}
          </DumbTabs.Tab>
        ))}
      </DumbTabs.List>
      <DumbTabs.Panels as="div">
        <Switch>{tabRoutes}</Switch>
      </DumbTabs.Panels>
    </DumbTabs.Group>
  )
}
