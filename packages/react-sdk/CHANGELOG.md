# TribePlatform's React SDK Changelog

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

- `minor` `useOrganizeSpacesInCollection` hook for saving reorganized collection spaces to backend

## [2.0.1](https://gitlab.com/tribeplatform/tribe-neo/tags/react-sdk-2.0.1) <sub>/ 2021-12-19</sub>

## [2.0.0](https://gitlab.com/tribeplatform/tribe-neo/tags/5.0.0) <sub>/ 2021-12-10</sub>

### Changed

- `major` Changed the package name from `@tribeplatform/react` to `@tribeplatform/react-sdk`.

## [1.4.0](https://gitlab.com/tribeplatform/tribe-neo/tags/2.1.0) <sub>/ 2021-12-03</sub>

### Added

- `minor` Added testAppWebhook

### Deprecated

- `minor` Deprecate `SHARED_TRIBE_BASE_URL` environment variable in favor of `TRIBE_GQL_ENDPOINT`

## [1.3.0](https://gitlab.com/tribeplatform/tribe-neo/tags/2.0.0) <sub>/ 2021-12-02</sub>

### Added

- `minor` Added appInstallations hook

## [1.2.0](https://gitlab.com/tribeplatform/tribe-neo/tags/1.3.0) <sub>/ 2021-11-18</sub>

### Added

- `minor` Added memberSchemaField hooks

### Removed

- `patch` Removed unused duplicated useCreatePost hook

## [1.1.0](https://gitlab.com/tribeplatform/tribe-neo/tags/1.1.0) <sub>/ 2021-11-10</sub>

### Added

- `minor` Added domain hooks.
- `minor` Added sso hooks.
- `minor` Added page hooks.
- `patch` Added optimistic response for moderation items.
- `minor` Added globalApp hooks
- `minor` useAuthMember added
- `minor` Added globalNetworks hook
- `minor` Added appCollaborator hooks
- `minor` Added appPublication hooks
