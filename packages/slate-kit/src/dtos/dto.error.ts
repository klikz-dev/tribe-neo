import { ValidationError } from 'class-validator'

export class ToDTOError extends Error {
  plainObject: any

  errors: ValidationError[]

  constructor(plainObject: any, errors: ValidationError[]) {
    super('DTO Error')
    this.plainObject = plainObject
    this.errors = errors
  }
}
