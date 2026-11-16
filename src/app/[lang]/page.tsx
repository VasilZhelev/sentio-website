import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TerrainHero from "@/components/hero/TerrainHero";
import {
  Editions,
  FullBleed,
  Intro,
  Questions,
  Reviews,
  Safety,
  Systems,
  Technology,
  faqs,
} from "@/components/home/HomeSections";
import { moto, snow } from "@/data/products";
import { faqSchema, productSchema } from "@/lib/schema";
import { pageMetadata, toLang } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return pageMetadata("home", toLang((await params).lang));
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLang((await params).lang);

  return (
    <>
      <JsonLd data={[faqSchema(faqs, lang), productSchema(moto, lang), productSchema(snow, lang)]} />
      <TerrainHero />
      <Intro />
      <FullBleed />
      <Technology />
      <Systems />
      <Safety />
      <Editions />
      <Reviews />
      <Questions />
    </>
  );
}
