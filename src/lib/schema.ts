import { bg } from "@/data/bg";
import type { Product } from "@/data/products";
import { SITE_NAME, SITE_URL, localize, pages, type Lang, type PageKey } from "./seo";

/** Structured data (schema.org JSON-LD) so search engines understand the brand, products and FAQs */

const tr = (text: string, lang: Lang) => (lang === "bg" ? (bg[text] ?? text) : text);
const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
const ORG_ID = `${SITE_URL}/#organization`;

export function organizationSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    description: pages.home.description[lang],
    // Add social profile URLs here as they go live (Instagram, YouTube, TikTok...)
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: abs(localize("/support", lang)),
      availableLanguage: ["English", "Bulgarian"],
    },
  };
}

export function websiteSchema(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: abs(localize("/", lang)),
    inLanguage: lang,
    publisher: { "@id": ORG_ID },
  };
}

/**
 * The products, without price offers or ratings: nothing is on sale yet and the
 * reviews on the site are placeholders. When real sales start, add an `offers` block
 * ({ "@type": "Offer", price, priceCurrency: "USD", availability, url }).
 */
export function productSchema(product: Product, lang: Lang) {
  const url = abs(localize(`/${product.slug}`, lang));
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    sku: `sentio-${product.slug}`,
    url,
    description: pages[product.slug].description[lang],
    category: product.slug === "moto" ? "Motocross goggles" : "Ski goggles",
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": ORG_ID },
    image: [
      `${SITE_URL}/images/goggles/goggle-2000.webp`,
      `${SITE_URL}/images/goggles/wide-rock-2200.webp`,
      `${SITE_URL}/images/goggles/lens-open-side-1600.webp`,
    ],
    additionalProperty: product.specs.map((s) => ({
      "@type": "PropertyValue",
      name: tr(s.label, lang),
      value: tr(s.value, lang),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[], lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: tr(f.q, lang),
      acceptedAnswer: { "@type": "Answer", text: tr(f.a, lang) },
    })),
  };
}

export function breadcrumbSchema(key: PageKey, lang: Lang) {
  const page = pages[key];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: abs(localize("/", lang)) },
      { "@type": "ListItem", position: 2, name: page.name[lang], item: abs(localize(page.path, lang)) },
    ],
  };
}
