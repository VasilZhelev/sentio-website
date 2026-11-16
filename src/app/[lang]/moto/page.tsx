import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ProductPage from "@/components/product/ProductPage";
import { moto } from "@/data/products";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { pageMetadata, toLang } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return pageMetadata("moto", toLang((await params).lang));
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLang((await params).lang);

  return (
    <>
      <JsonLd data={[breadcrumbSchema("moto", lang), productSchema(moto, lang)]} />
      <ProductPage product={moto} />
    </>
  );
}
