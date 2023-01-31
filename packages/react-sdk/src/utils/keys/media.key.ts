const CREATE_EMOJIS_KEY = 'createEmojis'
const CREATE_IMAGES_KEY = 'createImages'
const CREATE_FILES_KEY = 'createFiles'
const UPLOAD_IMAGES_KEY = 'uploadImages'
const EMBED_KEY = 'embed'

export const getCreateEmojisKey = () => CREATE_EMOJIS_KEY
export const getCreateImagesKey = () => CREATE_IMAGES_KEY
export const getUploadImagesKey = () => UPLOAD_IMAGES_KEY
export const getEmbedKey = args => [EMBED_KEY, args]

export const getCreateFilesKey = () => CREATE_FILES_KEY
