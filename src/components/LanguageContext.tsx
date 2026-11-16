"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { bg } from "@/data/bg";
import { localize as localizePath, type Lang } from "@/lib/seo";

export type { Lang };

type LanguageContextType = {
  lang: Lang;
  /** Returns the Bulgarian for an English string, or the English if there is none */
  t: (english: string) => string;
  /** Turns "/moto" into "/bg/moto" on Bulgarian pages */
  localize: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: (english) => english,
  localize: (path) => path,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

/** The language comes from the URL, so search engines see both versions */
export default function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = useCallback((english: string) => (lang === "bg" ? (bg[english] ?? english) : english), [lang]);
  const localize = useCallback((path: string) => localizePath(path, lang), [lang]);

  return <LanguageContext.Provider value={{ lang, t, localize }}>{children}</LanguageContext.Provider>;
}
