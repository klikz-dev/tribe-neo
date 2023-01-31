import { Button } from '../Button'
import { Navbar } from './Navbar'

export default {
  title: 'Navigation/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
}

const user = {
  name: 'Chelsea Hagon',
  email: 'chelseahagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Teams', href: '#', current: false },
  { name: 'Directory', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const logo = (
  <Navbar.Logo
    src="https://tribe.so/webflow-v2/images/TribeLogo.svg"
    srcMobile="https://tribe.so/webflow-v2/images/Frame-1538.svg"
    name="Tribe"
    as="a"
    href="#"
  />
)
export const Simple = (args: any) => {
  return (
    <Navbar.Simple
      logo={logo}
      action={<Button>New Post</Button>}
      user={user}
      userNavigation={userNavigation}
      navigation={navigation}
      notifications={<Navbar.Notifications href="#" />}
    />
  )
}

export const WithSearch = (args: any) => {
  return (
    <Navbar.WithSearch
      logo={logo}
      search={<Navbar.Search />}
      action={<Button>New Post</Button>}
      user={user}
      userNavigation={userNavigation}
      navigation={navigation}
      notifications={<Navbar.Notifications href="#" />}
    />
  )
}
