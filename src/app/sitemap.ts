import type { MetadataRoute } from "next";
import { LANGS, SITE_URL, localize, pages } from "@/lib/seo";

const priority: Record<string, number> = { home: 1, moto: 0.9, snow: 0.9, compare: 0.8, app: 0.7, about: 0.6, support: 0.5 };

const images: Record<string, string[]> = {
  home: ["/images/goggles/goggle-2000.webp", "/images/goggles/wide-rock-2200.webp"],
  moto: ["/images/goggles/goggle-2000.webp", "/images/stock/dirt-dusk-2200.webp"],
  snow: ["/images/goggles/goggle-2000.webp", "/images/stock/snow-skier-1400.webp"],
  about: ["/images/goggles/lens-open-side-1600.webp"],
};

const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/** Every page in English and Bulgarian, each listing its other-language version */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return Object.entries(pages).flatMap(([key, page]) =>
    LANGS.map((lang) => ({
      url: url(localize(page.path, lang)),
      lastModified,
      changeFrequency: key === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: lang === "en" ? priority[key] : Math.max(0.1, priority[key] - 0.1),
      alternates: {
        languages: {
          en: url(localize(page.path, "en")),
          bg: url(localize(page.path, "bg")),
          "x-default": url(localize(page.path, "en")),
        },
      },
      images: (images[key] ?? []).map((src) => `${SITE_URL}${src}`),
    })),
  );
}
