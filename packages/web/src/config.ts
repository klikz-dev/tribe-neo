/* eslint-disable no-process-env */
/**
 * See https://razzlejs.org/docs/environment-variables
 */

const isTrue = (t: string | boolean) => t === true || t === 'true'

/**
 * These variables are populated at runtime and are accessible for both server and client
 */
export const RuntimeConfigs = (process => {
  return {
    TRIBE_GQL_ENDPOINT: process.env.TRIBE_GQL_ENDPOINT,
    TRIBE_APP_DOMAIN: process.env.TRIBE_APP_DOMAIN,
    FORCED_NETWORK_DOMAIN: process.env.FORCED_NETWORK_DOMAIN,
    SSOS_CALLBACK_URL: process.env.SSOS_CALLBACK_URL,
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    INTERCOM_APP_ID: process.env.INTERCOM_APP_ID,
    SNOWPLOW_COLLECTOR_ADDRESS: process.env.SNOWPLOW_COLLECTOR_ADDRESS,
    SNOWPLOW_ENABLE_PAGE_PING: isTrue(process.env.SNOWPLOW_ENABLE_PAGE_PING),
    SNOWPLOW_ENABLE_PAGE_VIEW: isTrue(process.env.SNOWPLOW_ENABLE_PAGE_VIEW),
    NODE_ENV: process.env.NODE_ENV,
    FULLSTORY_ORGANIZATION_ID: process.env.FULLSTORY_ORGANIZATION_ID,
    FULLSTORY_DEBUG_MODE: isTrue(process.env.FULLSTORY_DEBUG_MODE),
    RELEASE_CHANNEL: process.env.RELEASE_CHANNEL,
  }
})(typeof window !== 'undefined' ? window.process : process)

/**
 * These variables are populated at runtime and are only available to server
 */
export const ServerOnlyConfigs = {
  INTERCOM_VERIFICATION_SECRET: process.env.INTERCOM_VERIFICATION_SECRET,
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 5000,
  SSL_PORT: process.env.SSL_PORT || 443,
  DEBUG_CONFIGS: isTrue(process.env.DEBUG_CONFIGS),
}

/**
 * This variables will be inlined during build.
 * Keep in mind that variables should start with `RAZZLE_` to be inlined.
 * Variables listed in https://razzlejs.org/docs/environment-variables#build-time-variables
 * will also be inlined.
 */
export const StaticConfigs = {
  IS_PROD: process.env.NODE_ENV === 'production',
  NODE_ENV: process.env.NODE_ENV || 'production',
  APP_VERSION: process.env.RAZZLE_APP_VERSION || 'dev',
  RAZZLE_PUBLIC_DIR: process.env.RAZZLE_PUBLIC_DIR,
}

if (typeof window === 'undefined' && isTrue(process.env.DEBUG_CONFIGS)) {
  // eslint-disable-next-line no-console
  console.log('Debugging Environment Variables:', {
    RuntimeConfigs,
    ServerOnlyConfigs,
    StaticConfigs,
  })
}
