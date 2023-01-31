import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'

import { ToDTOError } from './dto.error'

export type BaseDto = {
  fromPlain(plainObject: any): any
  fromPlainArray(plainObjects: any[]): any[]
}

export type NonFunctionPropertyNames<T> = {
  /* eslint-disable @typescript-eslint/ban-types */
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

export function BaseDto<T>() {
  return class Dto {
    static fromPlain(plainObject: NonFunctionProperties<T>): T {
      const object = plainToClass(this, plainObject, {
        enableImplicitConversion: true,
      })
      const errors = validateSync(object)
      if (errors.length > 0) {
        throw new ToDTOError(plainObject, errors)
      } else {
        return <T>object
      }
    }

    static fromPlainArray(plainObjects: NonFunctionProperties<T>[]): T[] {
      return plainObjects.map(plainObject => this.fromPlain(plainObject))
    }
  }
}
