import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ProductPage from "@/components/product/ProductPage";
import { snow } from "@/data/products";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { pageMetadata, toLang } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return pageMetadata("snow", toLang((await params).lang));
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLang((await params).lang);

  return (
    <>
      <JsonLd data={[breadcrumbSchema("snow", lang), productSchema(snow, lang)]} />
      <ProductPage product={snow} />
    </>
  );
}
