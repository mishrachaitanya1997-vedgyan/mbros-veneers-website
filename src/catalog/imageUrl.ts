// Derives the small-thumbnail sibling URL for an image uploaded through the
// MONE API, mirroring its `buildVariantKey` naming convention (insert
// `-thumb` before the extension). Every image uploaded via /inventory/images
// or /website/media has a `-thumb.webp` sibling stored alongside the
// full-quality one. Pure string transform — no network call.
//
// Only use this for genuinely small (thumbnail-scale) image slots. The main
// product card grids and hero images should keep the full-quality URL the
// API already returns (capped at 2000px / WebP quality 88 server-side).
export function thumbnailUrlFor(url: string): string {
  const lastDot = url.lastIndexOf('.');
  const lastSlash = url.lastIndexOf('/');
  if (lastDot === -1 || lastDot < lastSlash) return url;
  return `${url.slice(0, lastDot)}-thumb${url.slice(lastDot)}`;
}
