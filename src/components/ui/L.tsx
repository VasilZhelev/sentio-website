"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/components/LanguageContext";

/** A Link that stays in the current language. Lets server-rendered pages link without the context. */
export default function L({ href, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const { localize } = useLanguage();
  return <Link href={localize(href)} {...props} />;
}
