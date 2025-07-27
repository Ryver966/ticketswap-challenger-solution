export function normalizeImageUrl(url: string): string {
  if (url.includes("placehold.co") && !url.match(/\.(png|jpg|jpeg|webp)$/)) {
    const [base, query] = url.split("?");
    return `${base}.png${query ? `?${query}` : ""}`;
  }

  return url;
}
