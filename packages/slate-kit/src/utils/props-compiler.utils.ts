import { SlateContextProps } from '../types/context.types'

const getPathValue = (obj: any, paths: string[]): any => {
  if (typeof obj === 'undefined' || paths.length === 0) {
    return obj
  }
  return getPathValue(obj[paths[0]], paths.slice(1))
}

const compileValue = (value: any, params: Record<string, any>): any => {
  if (value === null) return value

  switch (typeof value) {
    case 'object':
      if (Array.isArray(value)) {
        return value.map(v => compileValue(v, params))
      }
      return Object.keys(value).reduce(
        (preValue, key) => ({
          ...preValue,
          [key]: compileValue(value[key], params),
        }),
        {},
      )

    case 'string':
      if (value.startsWith('$')) {
        return getPathValue(params, value.slice(1).split('.'))
      }
      return value
    default:
      return value
  }
}

export const compileProps = (
  props: Record<string, any> | string,
  context: SlateContextProps,
): Record<string, any> | string => {
  if (typeof props === 'string') {
    return props
  }

  const compiledProps = {}
  Object.keys(props).forEach(key => {
    compiledProps[key] = compileValue(props[key], context)
  })
  return compiledProps
}
