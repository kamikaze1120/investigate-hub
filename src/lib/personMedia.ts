import type { IndexedPerson } from "@/data/allIndividuals";
import type { Person } from "@/data/types";

const portraitCache = new Map<string, string>();

const portraitPalettes = [
  { bg: [222, 44, 12], accent: [358, 72, 56], detail: [190, 70, 60] },
  { bg: [188, 46, 12], accent: [34, 84, 58], detail: [325, 74, 63] },
  { bg: [132, 28, 13], accent: [17, 79, 56], detail: [205, 68, 64] },
  { bg: [248, 31, 12], accent: [52, 86, 62], detail: [162, 70, 50] },
  { bg: [207, 26, 10], accent: [274, 69, 64], detail: [6, 82, 58] },
] as const;

const hashValue = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
};

const toHsl = ([h, s, l]: readonly number[]) => `hsl(${h} ${s}% ${l}%)`;

const buildGeneratedPortrait = (id: string, name: string) => {
  const cacheKey = `${id}:${name}`;
  const cached = portraitCache.get(cacheKey);
  if (cached) return cached;

  const hash = hashValue(cacheKey);
  const palette = portraitPalettes[hash % portraitPalettes.length];
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const arcOffset = hash % 120;
  const ringOffset = (hash >> 3) % 80;
  const stripeOffset = (hash >> 5) % 200;
  const badge = String((hash % 899) + 100);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640" role="img" aria-label="${name}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${toHsl(palette.bg)}" />
          <stop offset="100%" stop-color="${toHsl([palette.bg[0], palette.bg[1], Math.max(4, palette.bg[2] - 4)])}" />
        </linearGradient>
        <linearGradient id="accent" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stop-color="${toHsl(palette.accent)}" />
          <stop offset="100%" stop-color="${toHsl(palette.detail)}" />
        </linearGradient>
      </defs>
      <rect width="480" height="640" fill="url(#bg)" rx="18" />
      <circle cx="130" cy="140" r="118" fill="none" stroke="url(#accent)" stroke-width="20" opacity="0.85" stroke-dasharray="340 420" stroke-dashoffset="-${arcOffset}" />
      <circle cx="370" cy="504" r="146" fill="none" stroke="${toHsl(palette.detail)}" stroke-width="16" opacity="0.38" stroke-dasharray="280 560" stroke-dashoffset="-${ringOffset}" />
      <path d="M-40 ${340 + stripeOffset / 5} L520 ${140 + stripeOffset / 6}" stroke="${toHsl(palette.accent)}" stroke-width="26" opacity="0.24" />
      <path d="M-30 ${420 + stripeOffset / 8} L500 ${250 + stripeOffset / 7}" stroke="${toHsl(palette.detail)}" stroke-width="12" opacity="0.18" />
      <rect x="48" y="42" width="122" height="34" rx="6" fill="rgba(255,255,255,0.08)" />
      <text x="62" y="65" fill="rgba(255,255,255,0.72)" font-family="monospace" font-size="18">IDX-${badge}</text>
      <text x="44" y="370" fill="rgba(255,255,255,0.97)" font-family="Arial, Helvetica, sans-serif" font-size="196" font-weight="700">${initials}</text>
      <text x="48" y="564" fill="rgba(255,255,255,0.92)" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="600">${name}</text>
      <text x="48" y="598" fill="rgba(255,255,255,0.6)" font-family="monospace" font-size="18">ARCHIVE PROFILE PORTRAIT</text>
    </svg>`;

  const url = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  portraitCache.set(cacheKey, url);
  return url;
};

export const getPersonPhotoUrl = (person?: Pick<IndexedPerson, "id" | "name" | "photo_url"> | Pick<Person, "id" | "name" | "photo_url"> | null) => {
  if (!person) return "/placeholder.svg";
  return person.photo_url || buildGeneratedPortrait(person.id, person.name);
};