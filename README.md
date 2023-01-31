# Tribe Neo

## Prerequisites

1. **Node v16**

    Make sure you have `Node v16.13` installed.
    ```bash
    $ node -v
    v16.13.0
    ```

   > The preferred method of handling local Node version is [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm).
   >
   > Install `nvm`, and then run:
   > ```bash
   > $ nvm use v16.13.0
   > ```
   >
   > Set it as your default Node version, run:
   > ```bash
   > $ nvm alias default v16.13.0
   > ```
   >
   > If you wish to handle Node version, per project, see [this](https://github.com/nvm-sh/nvm#deeper-shell-integration).

2. **Yarn 3.1**

   `Node v16` comes with [Corepack](https://nodejs.org/docs/latest-v16.x/api/corepack.html) which allows us to lock package managers to a specifc version per project. No need to install or upgrade manually. However, we need to clean up the project before continuing with the setup.

   Remove .yarnrc file if any:
   ```bash
   $ rm .yarnc
   ```

   $ Remove globally installed `yarn`, in whichever way or form that has been installed previously.
   ```bash
   $ npm uninstall -g yarn
   $ brew uninstall yarn
   # etc.
   ```
   *Make sure to **reload your terminal** after uninstalling yarn.*

   Finally, enable Corepack:
   ```bash
   $ corepack enable
   ```

   Once `corepack` is enabled, every `yarn` command executed in the project directory, will be run against the version specified in [package.json](package.json#L6).

## Project Structure

The project is structured as a monorepo. Each package is mapped to a corresponding package name under `@tribeplatform`.
```bash
╰─ packages
   ├─ web ➞ @tribeplatform/web
   ├─ dev-portal ➞ @tribeplatform/dev-portal
   ├─ portal ➞ @tribeplatform/portal
   ├─ react-sdk ➞ @tribeplatform/react-sdk
   ├─ react-ui-kit ➞ @tribeplatform/react-ui-kit
   ├─ gql-client ➞ @tribeplatform/gql-client
   ╰─ slate-kit ➞ @tribeplatform/slate-kit
```

Each package is a separate workspace defined via [root package.json](package.json#L13). If you want to run a script defined in a package, you should use `yarn workspace` command. For example
```bash
$ yarn workspace @tribeplatform/web dev
```

For ease of use, workspace commands have been aliased as root scripts:
```bash
$ yarn web dev
# Same as:
$ yarn workspace @tribeplatform/web dev
```

## Getting Started for Development

1. Install dependencies:
   ```bash
   $ yarn install
   ```
   Keep in mind that you don't need to run `yarn install` for each workspace. Root workspace will take care of all of it.

2. Make sure all low-level dependencies are built:
   ```bash
   $ yarn build:deps
   ```

3. based on the package you want to develop on you can run `start`, `build`, `build:watch`, etc. on their respective workspaces. For example:
   ```bash
   $ yarn react-ui-kit build:watch
   # Same as:
   $ yarn workspace @tribeplatform/react-ui-kit build:watch
   ```

Following segments describes setup process and useful commands for some of the packages.

### @tribeplatform/web
If you are working on [@tribeplatform/web](packages/web), create the `.env` file first:
```bash
$ cp packages/web/.env.defaults packages/web/.env
```
...and uncomment/replace the values as instructed in the file itself. Then run:
```bash
$ yarn dev
# Shorthand for:
#   yarn workspace @tribeplatform/web start —verbose --inspect
```

If you are developing a dependency at the same time (`@tribeplatform/components` for example), you can run a watcher on those as well in a separate terminal instance:
```bash
$ yarn react-ui-kit build:watch
```

You can also run watcher on all of `@tribeplatform/web` dependecies with `dev:watch` root script:
```bash
$ yarn dev:watch
```

### @tribeplatform/react-ui-kit

The [@tribeplatform/react-ui-kit](packages/react-ui-kit) package is setup with [Storybook](https://storybook.js.org/). Simply run:
```bash
$ yarn storybook
# Shorthand for:
#   yarn workspace @tribeplatform/ storybook
```
...see the changes in real time and as develop the components.

## Contribution Guidelines

### Change and Release Management

Each workspace contains a `CHANGELOG.md` file. Each time the default branch is updated or a new release is created these changelog files along with the respective `package.json` manifests are updated. Make sure your merge requests include the notable changes in the respective changelogs before merging them.

### Dependency Management

Considering the monorepo structure, if you want to add a dependency to a single package, you should name the package before the `add` command. For example:
```bash
$ yarn web add react-router
# Same as:
#  yarn workspace @tribeplatform/web add react-router
```

If it's a development dependency, or a dependency that is to be used by more than one package, it's better to add it to the root workspace:
```bash
$ yarn add --dev webpack
```

If the command you want to execute a root level binary on a package, but the command is not defined as script in its `package.json`, you can use [`yarn exec`](https://yarnpkg.com/cli/exec) to transfer the root workspace context:

```bash
$ yarn client exec size-limit
# Same as:
#  yarn workspace @tribeplatform/client exec size-limit
```

### Creating A New Package:

Run:
```bash
$ yarn dlx lerna create @tribeplatform/new-package
```
