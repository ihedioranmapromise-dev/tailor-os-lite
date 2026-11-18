/** Brand kit stored in localStorage for the demo tenant. */

export type LayoutPreset = "classic" | "bold" | "minimal";
export type FontPair = "clean" | "editorial" | "modern";

export type BrandKit = {
  primary: string;
  accentSoft: string;
  background: string;
  font: FontPair;
  layout: LayoutPreset;
  logoDataUrl?: string;
  coverDataUrl?: string;
  ownerPhotoDataUrl?: string;
  shopName?: string;
  tagline?: string;
  whatsapp?: string;
};

const KEY = "tol_brand_v1";

export const DEFAULT_BRAND: BrandKit = {
  primary: "#1a5c4a",
  accentSoft: "#e8f2ef",
  background: "#f4f1ec",
  font: "clean",
  layout: "classic",
};

export function getBrand(): BrandKit {
  if (typeof window === "undefined") return DEFAULT_BRAND;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_BRAND;
    return { ...DEFAULT_BRAND, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_BRAND;
  }
}

export function saveBrand(b: BrandKit) {
  localStorage.setItem(KEY, JSON.stringify(b));
  applyBrandToDocument(b);
}

export function applyBrandToDocument(b: BrandKit) {
  if (typeof document === "undefined") return;
  const r = document.documentElement;
  r.style.setProperty("--brand-primary", b.primary);
  r.style.setProperty("--brand-soft", b.accentSoft);
  r.style.setProperty("--brand-bg", b.background);
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const FONT_LABELS: Record<FontPair, string> = {
  clean: "Clean (system)",
  editorial: "Editorial",
  modern: "Modern tight",
};

export const LAYOUT_LABELS: Record<LayoutPreset, string> = {
  classic: "Classic — calm header",
  bold: "Bold — dark hero",
  minimal: "Minimal — light & airy",
};
