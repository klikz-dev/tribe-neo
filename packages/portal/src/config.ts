/// <reference types="node" />

const hasMeta = !!import.meta?.env // Needed to prevent exceptions in server env (e.g NodeJS)

const inlineValues = {
  TRIBE_GQL_ENDPOINT: hasMeta ? import.meta.env.VITE_TRIBE_GQL_ENDPOINT : '',
  PORTAL_AUTHORIZED_REDIRECT_URL: hasMeta
    ? import.meta.env.VITE_PORTAL_AUTHORIZED_REDIRECT_URL
    : '',
}

const values = {}
const getValueFromProcess = (key: string, defaultValue: string): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue
  }
  return defaultValue
}

// eslint-disable-next-line no-restricted-syntax
for (const [key, value] of Object.entries(inlineValues)) {
  values[key] = getValueFromProcess(key, value)
}

export const RuntimeConfigs = { ...values }

export const StaticConfigs = {
  APP_VERSION: import.meta.env.VITE_APP_VERSION,
}

export const getRuntimeConfigVariable = (
  variableName: string,
): string | undefined => {
  return RuntimeConfigs[variableName] || undefined
}
