import type { Metadata } from "next";

export const SITE_URL = "https://sentio.to";
export const SITE_NAME = "Sentio";

/**
 * Site verification codes. Paste only the content="..." value from the meta tag
 * Google Search Console or Bing Webmaster Tools gives you.
 */
export const VERIFICATION = { google: "", bing: "" };

export type Lang = "en" | "bg";
export const LANGS: Lang[] = ["en", "bg"];

export function toLang(value: string | undefined): Lang {
  return value === "bg" ? "bg" : "en";
}

/** "/moto" in Bulgarian is "/bg/moto"; English stays at the root */
export function localize(path: string, lang: Lang): string {
  if (lang === "en") return path;
  if (path === "/") return "/bg";
  if (path.startsWith("/#")) return `/bg${path.slice(1)}`;
  return `/bg${path}`;
}

export type PageKey = "home" | "moto" | "snow" | "compare" | "app" | "about" | "support";

type PageCopy = { path: string; title: Record<Lang, string>; description: Record<Lang, string>; name: Record<Lang, string> };

/** Search titles and descriptions, written around what people type into Google */
export const pages: Record<PageKey, PageCopy> = {
  home: {
    path: "/",
    name: { en: "Home", bg: "Начало" },
    title: {
      en: "Sentio | Smart HUD Goggles for Motocross and Skiing",
      bg: "Sentio | Смарт HUD очила за мотокрос и ски",
    },
    description: {
      en: "Smart goggles with a transparent OLED heads-up display, built-in HD camera and automatic crash detection. Sentio Moto for motocross, Sentio Snow for ski and snowboard.",
      bg: "Смарт очила с прозрачен OLED дисплей, вградена HD камера и автоматично засичане на катастрофа. Sentio Moto за мотокрос и Sentio Snow за ски и сноуборд.",
    },
  },
  moto: {
    path: "/moto",
    name: { en: "Sentio Moto", bg: "Sentio Moto" },
    title: {
      en: "Sentio Moto | Motocross Goggles with HUD and Camera",
      bg: "Sentio Moto | Мотокрос очила с HUD дисплей и камера",
    },
    description: {
      en: "Smart motocross and enduro goggles with live speed, GPS lap timer, trail navigation and HD video. IP54 dust protection, ballistic lens, 185 g, 8 h battery.",
      bg: "Смарт очила за мотокрос и ендуро със скорост на живо, GPS таймер за обиколки, навигация и HD видео. IP54 защита от прах, балистична леща, 185 г, 8 ч батерия.",
    },
  },
  snow: {
    path: "/snow",
    name: { en: "Sentio Snow", bg: "Sentio Snow" },
    title: {
      en: "Sentio Snow | Smart Ski and Snowboard Goggles with HUD",
      bg: "Sentio Snow | Смарт ски и сноуборд очила с HUD",
    },
    description: {
      en: "Smart ski goggles with a heads-up display for speed, altitude and navigation, heated anti-fog lens, HD camera and automatic crash alerts. Built for the cold.",
      bg: "Смарт ски очила с дисплей за скорост, надморска височина и навигация, отопляема леща против замъгляване, HD камера и автоматичен сигнал при падане.",
    },
  },
  compare: {
    path: "/compare",
    name: { en: "Compare", bg: "Сравнение" },
    title: {
      en: "Compare Sentio Moto vs Snow | Smart Goggles Side by Side",
      bg: "Сравнение Sentio Moto и Snow | Смарт очила едно до друго",
    },
    description: {
      en: "Sentio Moto and Sentio Snow side by side: price, weight, battery life, lens, display and protection. Find the right smart HUD goggle for your sport.",
      bg: "Sentio Moto и Sentio Snow едно до друго: цена, тегло, батерия, леща, дисплей и защита. Изберете правилните смарт очила за вашия спорт.",
    },
  },
  app: {
    path: "/app",
    name: { en: "Sentio App", bg: "Приложение Sentio" },
    title: {
      en: "Sentio App | Ride Tracking, HUD Editor and Video Overlays",
      bg: "Приложение Sentio | Проследяване, HUD редактор и видео",
    },
    description: {
      en: "Free iOS and Android app for Sentio goggles: sync rides, design your HUD layout, set crash contacts and export video with telemetry overlays. No subscription.",
      bg: "Безплатно приложение за iOS и Android за очилата Sentio: синхронизирайте карания, настройте HUD екрана и експортирайте видео с телеметрия. Без абонамент.",
    },
  },
  about: {
    path: "/about",
    name: { en: "About", bg: "За нас" },
    title: {
      en: "About Sentio | Why We Built a Heads-Up Display Goggle",
      bg: "За Sentio | Защо създадохме очила с HUD дисплей",
    },
    description: {
      en: "Sentio puts the numbers riders need in the corner of their eye, so they never look down. Our story, our principles and what we refuse to compromise on.",
      bg: "Sentio показва нужната информация в ъгъла на погледа, за да не сваляте очи от пътя. Нашата история, принципи и това, в което не правим компромис.",
    },
  },
  support: {
    path: "/support",
    name: { en: "Support", bg: "Поддръжка" },
    title: {
      en: "Sentio Support | Shipping, Warranty, Charging and Setup",
      bg: "Поддръжка Sentio | Доставка, гаранция, зареждане",
    },
    description: {
      en: "Help with your Sentio smart goggles: shipping, returns, warranty, charging, pairing the app and first setup. Contact the Sentio team directly.",
      bg: "Помощ за смарт очилата Sentio: доставка, връщане, гаранция, зареждане, свързване с приложението и първа настройка. Свържете се с екипа на Sentio.",
    },
  },
};

const ogLocale: Record<Lang, string> = { en: "en_US", bg: "bg_BG" };

export function ogImage(key: PageKey) {
  return `${SITE_URL}/og/${key}`;
}

/** Title, description, canonical, hreflang, Open Graph and Twitter for one page */
export function pageMetadata(key: PageKey, lang: Lang): Metadata {
  const page = pages[key];
  const en = localize(page.path, "en");
  const bgPath = localize(page.path, "bg");
  const image = { url: ogImage(key), width: 1200, height: 630, alt: page.title[lang] };

  return {
    // Every title already carries the brand, so skip the layout's template
    title: { absolute: page.title[lang] },
    description: page.description[lang],
    alternates: {
      canonical: localize(page.path, lang),
      languages: { en, bg: bgPath, "x-default": en },
    },
    openGraph: {
      type: "website",
      url: localize(page.path, lang),
      siteName: SITE_NAME,
      title: page.title[lang],
      description: page.description[lang],
      locale: ogLocale[lang],
      alternateLocale: [ogLocale[lang === "en" ? "bg" : "en"]],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title[lang],
      description: page.description[lang],
      images: [image.url],
    },
  };
}
