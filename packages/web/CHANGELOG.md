# Web Changelog

All **notable** changes to this packages will be documented in this file.

Changes go under one of the following categories:

- `Added` for new features.
- `Fixed` for any bug fixes.
- `Changed` for changes in existing functionality.
- `Deprecated` for once-stable features removed in upcoming releases.
- `Removed` for deprecated features removed in this release.
- `Security` to invite users to upgrade in case of vulnerabilities.

Version impact (`major`, `minor`, `patch`) should also be noted with each entry to allow automatic parsing and version resolution.
For example:

We always keep an **Unreleased** section at the top. If a merge request has a notable change,
it should be placed under the corresponding category in this section.

## Unreleased

## [3.4.2](https://gitlab.com/tribeplatform/tribe-neo/tags/web-3.4.2) <sub>/ 2021-12-24</sub>

## [3.4.1](https://gitlab.com/tribeplatform/tribe-neo/tags/web-3.4.1) <sub>/ 2021-12-24</sub>

## [3.4.0](https://gitlab.com/tribeplatform/tribe-neo/tags/web-3.4.0) <sub>/ 2021-12-23</sub>

### Added
- `minor` Added release channel middleware (Beta release support)

## [3.3.0](https://gitlab.com/tribeplatform/tribe-neo/tags/5.2.0) <sub>/ 2021-12-15</sub>

### Added
- `minor` Snowplow now tracks release channel as part of service context.

## [3.2.0](https://gitlab.com/tribeplatform/tribe-neo/tags/5.1.0) <sub>/ 2021-12-13</sub>

### Removed
- `minor` Removed following deprecated environment variables:
  - `SHARED_TRIBE_BASE_URL`
  - `SHARED_TRIBE_DOMAIN`
  - `SHARED_COMMUNITY_DOMAIN_NAME`

## [3.1.1](https://gitlab.com/tribeplatform/tribe-neo/tags/4.0.1) <sub>/ 2021-12-10</sub>

### Fixed
- `patch` Remove whitespaces from color values when converting old theme data

## [3.1.0](https://gitlab.com/tribeplatform/tribe-neo/tags/4.0.0) <sub>/ 2021-12-09</sub>

### Added
- `minor` Added `app-version` context to events tracked by snowplow

### Changed
- `minor` Tribe Web is now tracked with `tribe-neo` App ID in Snowplow

## [3.0.0](https://gitlab.com/tribeplatform/tribe-neo/tags/3.0.0) <sub>/ 2021-12-07</sub>

### Added
- `minor` Added **debug:prod** command to load **.env** file when starting a production build
- `minor` Review apps will now automatically deploy on subsequent updates, if deployed previously.

### Changed
- `major` Environment variables are now separated into 3 categories: **Runtime**, **ServerOnly**, and **Static**
- `minor` Change `SHARED_INTERCOM_APP_ID` environment variable to `INTERCOM_APP_ID`
- `minor` Change `SHARED_SSOS_CALLBACK_URL` environment variable to `SSOS_CALLBACK_URL`
- `minor` Remove `SHARED_` prefix from Snowplow environment variables

### Deprecated
- `minor` Deprecate `SHARED_TRIBE_BASE_URL` environment variable in favor of `TRIBE_GQL_ENDPOINT`
- `minor` Deprecate `SHARED_TRIBE_DOMAIN` environment variable in favor of `TRIBE_APP_DOMAIN`
- `minor` Deprecate `SHARED_COMMUNITY_DOMAIN_NAME` environment variable in favor of `FORCED_NETWORK_DOMAIN`

## [2.0.0](https://gitlab.com/tribeplatform/tribe-neo/tags/2.0.0) <sub>/ 2021-12-02</sub>

### Added

- `minor` Add layout to space
- `minor` Add apps list to administration
- `minor` Added Security section and moved change password to security section
- `minor` Added active devices/sessions under security tab
- `minor` Cleaned up side bar and used the same component for all different blocks.
- `minor` Added Edit Profile button to auth member profile page
- `minor` Added a new style (simple) to collection menu block
- `minor` Added a confirmation on composer (post or reply) close

### Fixed

- `patch` Fix no-content issue for logged out users, caused by optional environment variables being serialized as `null` string
- `patch` Added email validation to change email form
- `minor` Improved forgot password, log in, and sign up pages and buttons

### Changed

- `major` Upgraded to **Node v16**
- `minor` The `SHARED_COMMUNITY_DOMAIN_NAME` is respected during builds regardless of environment
- `minor` Output full resource URL to console when community is not found
- `minor` Improved grid system and sidebar width
- `minor` Improved empty state for leaderboard

## [1.3.0](https://gitlab.com/tribeplatform/tribe-neo/tags/1.3.0) <sub>/ 2021-11-18</sub>

### Fixed

- `patch` Dragging item's placement inside of a modal

### Added

- `minor` Collection organization menu item to a collection's dropdown menu
- `major` Collection organization modal with a list of draggable spaces
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
- `patch` Fixed embedding URLs when creating a post, editing a post or replying
- `patch` Fixed options (+) menu's placement
- `patch` Fixed jumpings when toggling a post's reply box

### Added

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

### Changed

- `minor` The `SHARED_COMMUNITY_DOMAIN_NAME` is respected during builds regardless of environment.

## [1.1.0](https://gitlab.com/tribeplatform/tribe-neo/tags/1.1.0) <sub>/ 2021-11-10</sub>

## [1.1.0](https://gitlab.com/tribeplatform/tribe-neo/-/tags/v1.1.0) <sub>/ 2021-11-10</sub>

### Added

- `minor` Added Cancel button to the reply section.
- `minor` Added "Attachments" menu item to composer's menu list.
- `minor` Added support for https://local.dev.tribe.so on development mode
- `minor` Added Form.Avatar input for updating profile picture or etc.

### Fixed

- `patch` Composer | Fixed single long word break in reply box.
- `patch` Fixed mobile sidebar X icon color

### Changed

- `patch` Post editor's performance improvements
- `patch` memoized useAuthToken and useNetwork to prevent extra re-rendering
- `minor` loading the quill css within the main css file
- `minor` load the admin pages under a separate chunk
