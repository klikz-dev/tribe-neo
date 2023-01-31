import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator'

import { SlateEditable } from '../enums/slate-editable.enum'
import { BaseDto } from './base.dto'

export class BaseSlateDto extends BaseDto<BaseSlateDto>() {
  @IsString()
  id: string

  @IsArray()
  @IsString({ each: true })
  rootComponents: string[]

  @IsBoolean()
  @IsOptional()
  acceptsAfter?: boolean

  @IsBoolean()
  @IsOptional()
  acceptsBefore?: boolean

  @IsEnum(SlateEditable)
  @IsOptional()
  editable?: SlateEditable
}
