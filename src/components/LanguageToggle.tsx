"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localize } from "@/lib/seo";
import { useLanguage } from "./LanguageContext";

export default function LanguageToggle() {
  const { lang } = useLanguage();
  const pathname = usePathname() || "/";
  const next = lang === "en" ? "bg" : "en";
  // The same page in the other language
  const base = pathname.replace(/^\/(en|bg)(?=\/|$)/, "") || "/";

  return (
    <Link
      href={localize(base, next)}
      hrefLang={next}
      aria-label={next === "bg" ? "Превключи на български" : "Switch to English"}
      className="hud-label grid h-11 min-w-9 place-items-center transition-opacity hover:opacity-60"
    >
      {next.toUpperCase()}
    </Link>
  );
}
