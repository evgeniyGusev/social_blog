export function resolvePathToImg(path: string) {
  return `${import.meta.env.VITE_API_URL}/uploads/img/${path}`;
}
