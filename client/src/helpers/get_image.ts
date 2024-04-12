import { resolvePathToImg } from '@/helpers/resolve_path_to_media.ts';

export const getImage = (image: string): string => (image.startsWith('data:image') ? image : resolvePathToImg(image));
