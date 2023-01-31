# TribePlatform's Dev Portal Changelog
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

## [0.2.1](https://gitlab.com/tribeplatform/tribe-neo/tags/3.0.1) <sub>/ 2021-12-07</sub>

### Fixed

- `patch` Fixed Portal `dev-portal:prod:publish` CI job

## [0.2.0](https://gitlab.com/tribeplatform/tribe-neo/tags/3.0.0) <sub>/ 2021-12-07</sub>

### Changed

- `minor` Change `SHARED_CDN_HOST` environment variable to `PUBLIC_PATH`
- `minor` Rename `SHARED_TRIBE_BASE_URL` config to `TRIBE_GQL_ENDPOINT`
- `minor` Rename `SHARED_UNAUTHORIZED_REDIRECT_URL` config to `DEV_PORTAL_UNAUTHORIZED_REDIRECT_URL`
- `minor` Use `VITE_` as envPrefix config value for Vite

## [0.1.0](https://gitlab.com/tribeplatform/tribe-neo/tags/1.3.0) <sub>/ 2021-11-18</sub>

### Added

- `minor` Added app Webhooks and Credentials pages
