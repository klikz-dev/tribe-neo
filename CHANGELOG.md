# Components Changelog

__This changelog is auto-generated from packages changelogs. Don't update this manually!__

All **notable** changes to of each packages should be documented in their respective changelog files:

- [Web](packages/web/CHANGELOG.md)
- [React SDK](packages/react-sdk/CHANGELOG.md)
- [React UI-Kit](packages/react-ui-kit/CHANGELOG.md)
- [Slate Kit](packages/slate-kit/CHANGELOG.md)
- [GraphQL Client](packages/gql-client/CHANGELOG.md)
- [Dev Portal](packages/dev-portal/CHANGELOG.md)

## Unreleased

## [5.2.3](https://gitlab.com/tribeplatform/tribe-neo/tags/5.2.3) <sub>/ 2021-12-16</sub>

## [5.2.2](https://gitlab.com/tribeplatform/tribe-neo/tags/5.2.2) <sub>/ 2021-12-16</sub>

## [5.2.1](https://gitlab.com/tribeplatform/tribe-neo/tags/5.2.1) <sub>/ 2021-12-15</sub>

## [5.2.0](https://gitlab.com/tribeplatform/tribe-neo/tags/5.2.0) <sub>/ 2021-12-15</sub>

### Web
##### Added
- `minor` Snowplow now tracks release channel as part of service context.

## [5.1.7](https://gitlab.com/tribeplatform/tribe-neo/tags/5.1.7) <sub>/ 2021-12-15</sub>

## [5.1.6](https://gitlab.com/tribeplatform/tribe-neo/tags/5.1.6) <sub>/ 2021-12-15</sub>

## [5.1.5](https://gitlab.com/tribeplatform/tribe-neo/tags/5.1.5) <sub>/ 2021-12-14</sub>

## [5.1.4](https://gitlab.com/tribeplatform/tribe-neo/tags/5.1.4) <sub>/ 2021-12-14</sub>

## [5.1.3](https://gitlab.com/tribeplatform/tribe-neo/tags/5.1.3) <sub>/ 2021-12-14</sub>

## [5.1.2](https://gitlab.com/tribeplatform/tribe-neo/tags/5.1.2) <sub>/ 2021-12-14</sub>

## [5.1.1](https://gitlab.com/tribeplatform/tribe-neo/tags/5.1.1) <sub>/ 2021-12-14</sub>

## [5.1.0](https://gitlab.com/tribeplatform/tribe-neo/tags/5.1.0) <sub>/ 2021-12-13</sub>

### Web
##### Removed
- `minor` Removed following deprecated environment variables:
  - `SHARED_TRIBE_BASE_URL`
  - `SHARED_TRIBE_DOMAIN`
  - `SHARED_COMMUNITY_DOMAIN_NAME`

---

### GraphQL Client
##### Removed
- `minor` Removed `SHARED_TRIBE_BASE_URL` deprecated environment variable.

## [5.0.3](https://gitlab.com/tribeplatform/tribe-neo/tags/5.0.3) <sub>/ 2021-12-13</sub>

## [5.0.2](https://gitlab.com/tribeplatform/tribe-neo/tags/5.0.2) <sub>/ 2021-12-13</sub>

## [5.0.1](https://gitlab.com/tribeplatform/tribe-neo/tags/5.0.1) <sub>/ 2021-12-13</sub>

## [5.0.0](https://gitlab.com/tribeplatform/tribe-neo/tags/5.0.0) <sub>/ 2021-12-10</sub>

### React SDK SDK
##### Changed
- `major` Changed the package name from `/react` to `/react-sdk`.

---

### React SDK UI Kit
##### Changed
- `major` Changed the package name from `/components` to `/react-ui-kit`.

---

### GraphQL Client
##### Added
- `minor` Added `t.generateToken()`
##### Removed
- `major` Removed secret token

## [4.0.1](https://gitlab.com/tribeplatform/tribe-neo/tags/4.0.1) <sub>/ 2021-12-10</sub>

### Web
##### Fixed
- `patch` Remove whitespaces from color values when converting old theme data

## [4.0.0](https://gitlab.com/tribeplatform/tribe-neo/tags/4.0.0) <sub>/ 2021-12-09</sub>

### Web
##### Added
- `minor` Added `app-version` context to events tracked by snowplow
##### Changed
- `minor` Tribe Web is now tracked with `tribe-neo` App ID in Snowplow

---

### GraphQL Client
##### Added
- `minor` Added `t.generateToken()`
##### Removed
- `major` Removed secret token
##### Changed
- `major` Renamed `/tribe-client` to `/gql-client`.

## [3.0.1](https://gitlab.com/tribeplatform/tribe-neo/tags/3.0.1) <sub>/ 2021-12-07</sub>

### Dev Portal
##### Fixed
- `patch` Fixed Portal `dev-portal:prod:publish` CI job

## [3.0.0](https://gitlab.com/tribeplatform/tribe-neo/tags/3.0.0) <sub>/ 2021-12-07</sub>

### Web
##### Added
- `minor` Added **debug:prod** command to load **.env** file when starting a production build
- `minor` Review apps will now automatically deploy on subsequent updates, if deployed previously.
##### Changed
- `major` Environment variables are now separated into 3 categories: **Runtime**, **ServerOnly**, and **Static**
- `minor` Change `SHARED_INTERCOM_APP_ID` environment variable to `INTERCOM_APP_ID`
- `minor` Change `SHARED_SSOS_CALLBACK_URL` environment variable to `SSOS_CALLBACK_URL`
- `minor` Remove `SHARED_` prefix from Snowplow environment variables
##### Deprecated
- `minor` Deprecate `SHARED_TRIBE_BASE_URL` environment variable in favor of `TRIBE_GQL_ENDPOINT`
- `minor` Deprecate `SHARED_TRIBE_DOMAIN` environment variable in favor of `TRIBE_APP_DOMAIN`
- `minor` Deprecate `SHARED_COMMUNITY_DOMAIN_NAME` environment variable in favor of `FORCED_NETWORK_DOMAIN`

---

### GraphQL Client
##### Deprecated
- `minor` Deprecate `SHARED_TRIBE_BASE_URL` environment variable in favor of `TRIBE_GQL_ENDPOINT`

---

### Dev Portal
##### Changed
- `minor` Change `SHARED_CDN_HOST` environment variable to `PUBLIC_PATH`
- `minor` Rename `SHARED_TRIBE_BASE_URL` config to `TRIBE_GQL_ENDPOINT`
- `minor` Rename `SHARED_UNAUTHORIZED_REDIRECT_URL` config to `DEV_PORTAL_UNAUTHORIZED_REDIRECT_URL`
- `minor` Use `VITE_` as envPrefix config value for Vite

---

### Portal
##### Changed
- `minor` Change `SHARED_CDN_HOST` environment variable to `PUBLIC_PATH`
- `minor` Rename `SHARED_TRIBE_BASE_URL` config to `TRIBE_GQL_ENDPOINT`
- `minor` Rename `SHARED_AUTHORIZED_REDIRECT_URL` config to `PORTAL_AUTHORIZED_REDIRECT_URL`
- `minor` Use `VITE_` as envPrefix config value for Vite

## [2.1.1](https://gitlab.com/tribeplatform/tribe-neo/tags/2.1.1) <sub>/ 2021-12-06</sub>

## [2.1.0](https://gitlab.com/tribeplatform/tribe-neo/tags/2.1.0) <sub>/ 2021-12-03</sub>

### React SDK
##### Added
- `minor` Added testAppWebhook

---

### GraphQL Client
##### Added
- `minor` Added testAppWebhook

## [2.0.0](https://gitlab.com/tribeplatform/tribe-neo/tags/2.0.0) <sub>/ 2021-12-02</sub>

### Web
##### Added
- `minor` Add layout to space
- `minor` Add apps list to administration
- `minor` Added Security section and moved change password to security section
- `minor` Added active devices/sessions under security tab
- `minor` Cleaned up side bar and used the same component for all different blocks.
- `minor` Added Edit Profile button to auth member profile page
- `minor` Added a new style (simple) to collection menu block
##### Fixed
- `patch` Fix no-content issue for logged out users, caused by optional environment variables being serialized as `null` string
- `patch` Added email validation to change email form
- `minor` Improved forgot password, log in, and sign up pages and buttons
##### Changed
- `minor` The `SHARED_COMMUNITY_DOMAIN_NAME` is respected during builds regardless of environment
- `minor` Output full resource URL to console when community is not found
- `minor` Improved grid system and sidebar width
- `minor` Improved empty state for leaderboard
- `major` Upgraded to **Node v16**

---

### React SDK
##### Added
- `minor` Added appInstallations hook

---

### Slate Kit
##### Added
- `patch` Replaced widget types with block types
- `minor` Replaced widget names in contexts with block names

---

### GraphQL Client
##### Added
- `minor` Added appInstallations query
- `minor` Added updateAppNetworkSettings mutation
##### Changed
- `major` Changed `interfaces` to `types`

## [1.3.3](https://gitlab.com/tribeplatform/tribe-neo/tags/1.3.3) <sub>/ 2021-11-18</sub>

### Web
##### Fixed
- `patch` Fixed image placement in post image preview modal when there's only 1 image
- `patch` "Something went wrong" error message when creating a new post
- `patch` Fix server error handler to log trace and errors of unhandled exceptions
- `patch` Fix rejecting / accepting pending posts
- `patch` Show title of the root post in moderation for replies
- `patch` Images in posts are full screen on mobile
- `patch` Show preview iframe in customizer on page refresh
- `patch` Fixed sign up and login divider UI when there are no SSO settings available
- `patch` Used Card component for all authentication pages to improve UI
- `patch` Fixed onChange for Form.Toggle and Form.Select
- `patch` Fixed save issues withing page builder
##### Added
- `patch` Added pending indicator for posts and replies when moderation is required
- `patch` Initial version of member fields UI
- `minor` Post title is required when creating a new post
- `minor` Added reset password page
- `minor` Posts now support code syntax
- `patch` When opening the post modal, the title input will be focus by default
- `minor` Added settings to announcement block including view style and alignment
- `minor` Added settings to sign up block
- `minor` Added HTML block
- `minor` Added preset blocks to different pages including explore and home
- `minor` Temporarily added Hidden toggle to optional components and implemented unhide functionality
- `patch` Added items shortcut to Select component

---

### React SDK
##### Added
- `minor` Added memberSchemaField hooks
##### Removed
- `patch` Removed unused duplicated useCreatePost hook

---

### React UI-Kit
##### Changed
- `patch` fix Badge component when using `<Badge>` with `<Icon>`

---

### GraphQL Client
##### Added
- `minor` Added memberSchemaField mutations

---

### Dev Portal
##### Added
- `minor` Added app Webhooks and Credentials pages

## [1.1.1](https://gitlab.com/tribeplatform/tribe-neo/tags/1.1.1) <sub>/ 2021-11-10</sub>

### CI
##### Fixed
- `patch` Local packages from `@tribeplatform` are no longer version locked

## [1.1.0](https://gitlab.com/tribeplatform/tribe-neo/tags/1.1.0) <sub>/ 2021-11-10</sub>

### Web
##### Added
- `minor` Added Cancel button to the reply section.
- `minor` Added "Attachments" menu item to composer's menu list.
- `minor` Added support for https://local.dev.tribe.so on development mode
##### Fixed
- `patch` Composer | Fixed single long word break in reply box.
#### Changed
- `minor` Composer | Image picker, Attachment picker, and Emoji picker buttons are hidden on mobile.
- `minor` Reply to a reply won't have avatar next to its composer.

---

### React SDK
##### Added
- `minor` Added domain hooks.
- `minor` Added sso hooks.
- `minor` Added page hooks.
- `patch` Added optimistic response for moderation items.

---

### GraphQL Client
##### Added
- `minor` Added domain queries and mutations.
- `minor` Added sso queries and mutations.
- `minor` Added page queries and mutations.
