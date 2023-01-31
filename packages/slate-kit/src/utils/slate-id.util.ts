export enum SlateIdType {
  NAVIGATION = 'NAVIGATION',
  PAGE = 'PAGE',
  SPACE = 'SPACE',
  POST = 'POST',
  MEMBER = 'MEMBER',
  APP = 'APP',
}

export type SlateId = {
  type: SlateIdType
  id: string
}

export class SlateIdUtil {
  private static separator = '::'

  public static decode(slateId: string): SlateId {
    if (
      slateId &&
      slateId.length > 0 &&
      slateId.includes(SlateIdUtil.separator)
    ) {
      const [type, id] = slateId.split(SlateIdUtil.separator)
      return {
        type: SlateIdType[type],
        id,
      }
    }
    return null
  }

  public static encode(slateId: SlateId): string {
    if (slateId.id && slateId.id.length > 0 && slateId.type) {
      return `${slateId.type}${SlateIdUtil.separator}${slateId.id}`
    }
    return null
  }
}
