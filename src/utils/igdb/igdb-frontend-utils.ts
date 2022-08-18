export enum IGDBImageType {
  S_COVER = 'cover_small',
  L_COVER = 'cover_big',
  M_SCREENSHOT = 'screenshot_med',
  L_SCREENSHOT = 'screenshot_big',
  XL_SCREENSHOT = 'screenshot_huge',
  LOGO = 'logo_med',
  THUMB = 'thumb',
  MICRO = 'micro',
}

export const IGDB_IMAGE_RESOLUTIONS = {
  cover_small: [90, 128],
  cover_big: [264, 374],
  screenshot_med: [569, 320],
  screenshot_big: [889, 500],
  screenshot_huge: [1280, 720],
  logo_med: [284, 160],
  thumb: [90, 90],
  micro: [35, 35],
};

export function getIGDBImageFromID(imageID: string, type: IGDBImageType) {
  return `https://images.igdb.com/igdb/image/upload/t_${type}/${imageID}.jpg`;
}
