function getBasePath(): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (fromEnv) return fromEnv;

  if (typeof document !== "undefined") {
    const fromDom = document.documentElement.getAttribute("data-base-path");
    if (fromDom) return fromDom;
  }

  return "";
}

export function assetPath(src: string | undefined | null): string {
  if (!src || typeof src !== "string") return "";
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;

  const base = getBasePath();
  const normalized = src.startsWith("/") ? src : `/${src}`;
  return `${base}${normalized}`;
}
