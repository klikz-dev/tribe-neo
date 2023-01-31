/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-process-env */

const path = require('path')

const LoadableWebpackPlugin = require('@loadable/webpack-plugin')
const Dotenv = require('dotenv-webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const webpack = require('webpack')

const args = process.argv.slice(2)
const analyzer = args.indexOf('--analyzer') > -1
const isProduction = process.env.NODE_ENV === 'production'
const forceInlineConfigs = process.env.FORCE_INLINE_CONFIGS === 'true'

/**
 * Webpack.EnvironmentPlugin throws error if a variables is
 * undefined. In order to support optional variables, their
 * values should be set to null.
 */

module.exports = {
  options: {
    verbose: false,
    debug: {
      options: false, // print webpackOptions that will be used in webpack config
      config: false, // print webpack config
      nodeExternals: false, // print node externals debug info
    },
    enableReactRefresh: !isProduction,
    staticCssInDev: true,
    forceRuntimeEnvVars: ['HOST', 'PORT'],
  },
  plugins: [
    analyzer && {
      name: 'bundle-analyzer',
      options: {
        target: 'web', // or 'node'
        env: 'production', // or 'development'
        bundleAnalyzerConfig: {},
      },
    },
  ].filter(Boolean),

  modifyWebpackOptions({
    env: {
      target, // the target 'node' or 'web'
      dev, // is this a development build? true or false
    },
    options: {
      webpackOptions, // the default options that will be used to configure webpack/ webpack loaders and plugins
    },
  }) {
    if (isProduction && target === 'node') {
      webpackOptions.notNodeExternalResMatch = (request, context) => {
        return /@tribeplatform\/.*/.test(request)
      }
      webpackOptions.babelRule.include =
        webpackOptions.babelRule.include.concat([/@tribeplatform\/.*/])
    }
    return webpackOptions
  },

  modifyWebpackConfig({ env: { target }, webpackConfig }) {
    if (target === 'web') {
      const filename = path.resolve(__dirname, 'build')

      // saving stats file to build folder
      // without this, stats files will go into
      // build/public folder
      webpackConfig.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        }),
      )

      if (webpackConfig.devServer) {
        webpackConfig.devServer = {
          ...webpackConfig.devServer,
          client: {
            ...webpackConfig.devServer.client,
            progress: false,
          },
        }
      }

      // webpack 5 does not support node polyfills out of the box anymore
      webpackConfig.plugins.push(
        new NodePolyfillPlugin({
          excludeAliases: ['process'],
        }),
      )
    }

    /**
     * .env files are only used for development.
     * Production builds will use actual environment variables
     */
    if (!isProduction || forceInlineConfigs) {
      webpackConfig.plugins.push(
        new Dotenv({
          ignoreStub: true,
          systemvars: forceInlineConfigs,
          defaults: forceInlineConfigs,
        }),
      )
    }

    // Automatically import react where needed
    webpackConfig.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    )

    webpackConfig.devtool = isProduction ? false : 'eval-cheap-source-map'
    webpackConfig.stats = 'minimal'

    webpackConfig.resolve = {
      ...(webpackConfig.resolve || {}),
      modules: [
        path.resolve(__dirname, '..'),
        ...(webpackConfig.resolve?.modules || []),
      ],
    }
    return webpackConfig
  },
}
