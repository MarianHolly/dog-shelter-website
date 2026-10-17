/**
 * Cloudflare's resize-on-the-fly query params (?w=&q=&f=) only do anything
 * for images served from this site's own zone. Appending them to a
 * cross-origin URL (e.g. CMS content hotlinked from Unsplash) doesn't
 * resize anything — the remote host just ignores the unknown query string
 * and serves the original file for every requested width.
 */
export function isRemoteImage(src: string): boolean {
  return /^https?:\/\//i.test(src);
}
