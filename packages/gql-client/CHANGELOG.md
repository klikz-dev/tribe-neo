# TribePlatform's GraphQL Client Changelog

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

- `minor` `organizeSpaces` method to the Collection client
- `minor` `organizeSpacesInCollection` graphql mutation

## [1.0.3](https://gitlab.com/tribeplatform/tribe-neo/tags/gql-client-1.0.3) <sub>/ 2021-12-19</sub>

## [4.1.0](https://gitlab.com/tribeplatform/tribe-neo/tags/5.1.0) <sub>/ 2021-12-13</sub>

### Removed

- `minor` Removed `SHARED_TRIBE_BASE_URL` deprecated environment variable.

## [4.0.0](https://gitlab.com/tribeplatform/tribe-neo/tags/5.0.0) <sub>/ 2021-12-10</sub>

### Added

- `minor` Added `t.generateToken()`

### Removed

- `major` Removed secret token

## [3.0.0](https://gitlab.com/tribeplatform/tribe-neo/tags/4.0.0) <sub>/ 2021-12-09</sub>

### Changed

- `major` Renamed `@tribeplatform/tribe-client` to `@tribeplatform/gql-client`.

## [2.2.0](https://gitlab.com/tribeplatform/tribe-neo/tags/3.0.0) <sub>/ 2021-12-07</sub>

### Deprecated

- `minor` Deprecate `SHARED_TRIBE_BASE_URL` environment variable in favor of `TRIBE_GQL_ENDPOINT`

## [2.1.0](https://gitlab.com/tribeplatform/tribe-neo/tags/2.1.0) <sub>/ 2021-12-03</sub>

### Added

- `minor` Added testAppWebhook

## [2.0.0](https://gitlab.com/tribeplatform/tribe-neo/tags/2.0.0) <sub>/ 2021-12-02</sub>

### Added

- `minor` Added appInstallations query
- `minor` Added updateAppNetworkSettings mutation

### Changed

- `major` Changed `interfaces` to `types`

## [1.2.0](https://gitlab.com/tribeplatform/tribe-neo/tags/1.3.0) <sub>/ 2021-11-18</sub>

### Added

- `minor` Added memberSchemaField mutations

## [1.1.0](https://gitlab.com/tribeplatform/tribe-neo/tags/1.1.0) <sub>/ 2021-11-10</sub>

### Added

- `minor` Added domain queries and mutations.
- `minor` Added sso queries and mutations.
- `minor` Added page queries and mutations.
- `minor` Added dev client
- `minor` Added global networks query
- `minor` Added app collaborators queries and mutations.
- `minor` Use globalImage in dev client
- `minor` Added app publications queries and mutations.
