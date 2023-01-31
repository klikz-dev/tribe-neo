export const generateSpacePostsUrl = (spaceSlug: string) => `/${spaceSlug}`

export const generateSpacePostsUrlFilteredByTag = (
  spaceSlug: string,
  tagId: string,
) => `${generateSpacePostsUrl(spaceSlug)}?tag_id=${tagId}`
