/* eslint-disable @typescript-eslint/no-empty-function, import/no-default-export */

const mock = () => {
  const PopperJS = jest.requireActual('@popperjs/core')
  return {
    placements: PopperJS.placements,
    destroy: () => {},
    scheduleUpdate: () => {},
    render(this: any) {
      return this.$options._renderChildren
    },
  }
}

export default mock
export { mock as createPopper }
