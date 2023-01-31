import { ErrorResponse } from '../@types'

export const errObj = (e: any) => {
  // removing errors and inserting the rest
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { code, message, field, subcode, timestamp, help, errors, ...rest } =
    e || {}
  return {
    code,
    message,
    field,
    help,
    subcode,
    timestamp,
    ...rest,
  } as ErrorResponse
}

export const flattenErrors = (
  e: Array<unknown>,
  errors?: Array<ErrorResponse>,
): Array<ErrorResponse> => {
  const isRoot = !errors
  const output = errors || []
  if (Array.isArray(e)) {
    const arr = e
      .map(_e => {
        if ((_e as any)?.errors) {
          flattenErrors((_e as any).errors, output)
        } else if (!isRoot || (_e as any)?.message) {
          return errObj(_e)
        }
        return undefined
      })
      .filter(Boolean)
    output.push(...arr)
  } else if ((e as any)?.code || (e as any)?.message) {
    output.push(errObj(e))
  }

  if (isRoot) {
    if (output.length === 0) {
      output.push(errObj(e))
    }
  }

  return output
}
