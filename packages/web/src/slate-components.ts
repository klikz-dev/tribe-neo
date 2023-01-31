import loadable from '@loadable/component'

import { Alert } from '@tribeplatform/react-ui-kit/Alert'
import { Card } from '@tribeplatform/react-ui-kit/Card'
import { Divider } from '@tribeplatform/react-ui-kit/Divider'
import { Container } from '@tribeplatform/react-ui-kit/Layout'
import { Link } from '@tribeplatform/react-ui-kit/Link'

import { Announcement } from './components/Announcement'
import { SignUp } from './components/Auth/SignUp'
import { Button } from './components/Button'
import { CollectionHeader } from './components/Collection/CollectionHeader'
import { CollectionPage } from './components/Collection/CollectionPage'
import { CollectionList } from './components/CollectionList'
import { CollectionMenu } from './components/CollectionMenu'
import { Columns } from './components/Columns'
import { NotFound } from './components/Error/NotFound'
import { Feed } from './components/Feed'
import { HighlightedTags } from './components/HighlightedTags'
import { Iframe } from './components/Iframe'
import { Input } from './components/Input'
import { Leaderboard } from './components/Leaderboard'
import { MainMenu } from './components/MainMenu'
import { MemberAbout } from './components/Member/MemberAbout'
import { MemberHeader } from './components/Member/MemberHeader'
import { MemberPage } from './components/Member/MemberPage'
import { MemberList } from './components/MemberList'
import { WhySpaceMemberList } from './components/MemberList/WhySpaceMemberList'
import { Navbar } from './components/Navbar'
import { NotificationList } from './components/Notification/NotificationList'
import { PullToRefresh } from './components/PullToRefresh'
import { RichText } from './components/RichText'
import { Search } from './components/Search/Search'
import { Shaman } from './components/Shaman'
import { SpaceAbout } from './components/Space/SpaceAbout'
import { SpacePage } from './components/Space/SpacePage'
import { SpaceList } from './components/SpaceList'
import { Tabs } from './components/Tabs'

const SpaceHeader = loadable(() => import('./components/Space/SpaceHeader'), {
  resolveComponent: m => m.SpaceHeader,
})

const Settings = loadable(() => import('./components/Settings'), {
  resolveComponent: m => m.Settings,
})

const BlockPicker = loadable(() => import('./page-builder/component-editor'), {
  resolveComponent: m => m.BlockPicker,
})

const BlockPreview = loadable(() => import('./page-builder/component-editor'), {
  resolveComponent: m => m.BlockPreview,
})

const Login = loadable(() => import('./components/Auth'), {
  resolveComponent: m => m.Login,
})
Login.displayName = 'Login'

const Verify = loadable(() => import('./components/Auth'), {
  resolveComponent: m => m.Verify,
})

const ForgotPassword = loadable(() => import('./components/Auth'), {
  resolveComponent: m => m.ForgotPassword,
})

const ResetPassword = loadable(() => import('./components/Auth'), {
  resolveComponent: m => m.ResetPassword,
})

const PostList = loadable(() => import('./components/PostList'), {
  resolveComponent: module => module.PostList,
})

const PostComposer = loadable(() => import('./components/Space/PostComposer'), {
  resolveComponent: module => module.PostComposer,
})

const PostPage = loadable(() => import('./components/Post/PostPage'), {
  resolveComponent: module => module.PostPage,
})

export const SLATE_COMPONENTS = {
  Alert,
  Announcement,
  Button,
  Card,
  'Card.Header': Card.Header,
  'Card.Content': Card.Content,
  CollectionHeader,
  CollectionList,
  CollectionMenu,
  CollectionPage,
  Columns,
  Container,
  Divider,
  Feed,
  ForgotPassword,
  RichText,
  ResetPassword,
  Leaderboard,
  Link,
  Login,
  Iframe,
  Input,
  PostPage,
  PostComposer,
  PostList,
  MainMenu,
  HighlightedTags,
  MemberList,
  MemberAbout,
  MemberHeader,
  MemberPage,
  Navbar,
  NotificationList,
  NotFound,
  PullToRefresh,
  SignUp,
  Search,
  Settings,
  Shaman,
  SpaceAbout,
  SpaceHeader,
  SpaceList,
  SpacePage,
  Tabs,
  Verify,
  BlockPicker,
  BlockPreview,
  WhySpaceMemberList,
}
