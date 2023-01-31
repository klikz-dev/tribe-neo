import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator'

import { BaseDto } from './base.dto'
import { SlateComponentDto } from './slate-component.dto'

export class UpdateSlateDto extends BaseDto<UpdateSlateDto>() {
  @IsString()
  id: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  rootComponents?: string[]

  @IsArray()
  @Type(() => SlateComponentDto)
  @ValidateNested({ each: true })
  @IsOptional()
  updatedComponents?: SlateComponentDto[]

  @IsArray()
  @Type(() => SlateComponentDto)
  @ValidateNested({ each: true })
  @IsOptional()
  addedComponents?: SlateComponentDto[]

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  removedComponentIds?: string[]
}
