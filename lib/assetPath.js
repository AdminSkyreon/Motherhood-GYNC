export function assetPath(src) {
  if (!src || typeof src !== "string") return src;
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;

  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const normalized = src.startsWith("/") ? src : `/${src}`;
  return `${base}${normalized}`;
}
