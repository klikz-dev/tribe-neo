import { RawSlateComponentDto } from '../dtos/raw-slate-component.dto'
import { RawSlateDto } from '../dtos/raw-slate.dto'
import { SlateComponentDto } from '../dtos/slate-component.dto'
import { SlateDto } from '../dtos/slate.dto'

export const rawSlateComponentToDto = (
  rawSlateComponent: RawSlateComponentDto,
): SlateComponentDto => {
  return {
    ...rawSlateComponent,
    props:
      rawSlateComponent.props && Object.keys(rawSlateComponent.props).length > 0
        ? JSON.stringify(rawSlateComponent.props)
        : undefined,
    children:
      rawSlateComponent.children && rawSlateComponent.children.length > 0
        ? JSON.stringify(rawSlateComponent.children)
        : undefined,
    output:
      rawSlateComponent.output &&
      Object.keys(rawSlateComponent.output).length > 0
        ? JSON.stringify(rawSlateComponent.output)
        : undefined,
  }
}

export const slateComponentToRaw = (
  slateComponent: SlateComponentDto,
): RawSlateComponentDto => {
  return {
    ...slateComponent,
    props: slateComponent.props ? JSON.parse(slateComponent.props) : undefined,
    children: slateComponent.children
      ? JSON.parse(slateComponent.children)
      : undefined,
    output: slateComponent.output
      ? JSON.parse(slateComponent.output)
      : undefined,
  }
}

export const rawSlateToDto = (rawSlate: RawSlateDto): SlateDto => {
  return {
    ...rawSlate,
    components: rawSlate.components.map(c => rawSlateComponentToDto(c)),
  }
}

export const slateToRaw = (slate: SlateDto): RawSlateDto => {
  return {
    ...slate,
    components: slate.components.map(c => slateComponentToRaw(c)),
  }
}
