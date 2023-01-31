## Quick Start

clone .env.example on each package and name it .env

```bash
$ yarn
$ yarn build:deps
$ yarn dev
```

Then in another tab you can run `yarn dev:watch` to build other packages on change

Then open http://localhost:4000/ to see your app.

## Environment Variables

During development process, you can use `.env` file to change environment variables. However, before using them in the code they need to be defined in [config.ts](src/config.ts), in one of these three categories.

- **Runtime**
  Configurable in ***runtime***, accessible by ***client*** and ***server***.

- **Server-only**
  Configurable in ***runtime***, available only to ***server***.

  If you want [Razzle build-time variables](https://razzlejs.org/docs/environment-variables#build-time-variables) to be configurable during runtime, you must add them to the [`forceRuntimeEnvVars` option](razzle.config.js#:31).

- **Static**
  Inlined in ***build-time***, accessible by ***client*** and ***server***.

  Keep in mind that static variables should either be prefixed with `RAZZLE_` or be available in [this list](https://razzlejs.org/docs/environment-variables#build-time-variables), or they won't be inlined.

If you want to reuse `.env` file for a production build, you can use `dotenv` CLI to load the variables. Run following command in *root workspace*:
```bash
$ yarn web node -r dotenv/config build/server.js
```

...or use the provided shorthand:
```bash
$ yarn web debug:prod
```
