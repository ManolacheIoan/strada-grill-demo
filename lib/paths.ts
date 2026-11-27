export const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (p: string) => `${base}${p}`;
export const imageSrcSet = (name: string) => [640, 960, 1280].map((w) => `${asset(`/images/${name}-${w}.webp`)} ${w}w`).join(", ");
