import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono, Roboto_Flex } from "next/font/google";
import "../globals.css";
import CartProvider from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import LanguageProvider from "@/components/LanguageContext";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/ui/RevealObserver";
import JsonLd from "@/components/JsonLd";
import { LANGS, SITE_NAME, SITE_URL, VERIFICATION, pageMetadata, pages, toLang } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
  // Its generated fallback would swallow Cyrillic before Roboto Flex is tried
  adjustFontFallback: false,
});

// Archivo has no Cyrillic. This steps in for Bulgarian with the same width axis,
// and browsers only download it when Cyrillic text is on the page.
const flex = Roboto_Flex({
  subsets: ["cyrillic"],
  variable: "--font-flex",
  axes: ["wdth"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const martian = Martian_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-martian",
  display: "swap",
});

/** Runs before first paint so a saved theme never flashes */
const earlyPrefs = `try{document.documentElement.setAttribute("data-theme",localStorage.getItem("sentio-theme")==="light"?"light":"dark")}catch(e){}`;

export const viewport: Viewport = {
  themeColor: "#0E0F11",
  viewportFit: "cover",
};

type Params = Promise<{ lang: string }>;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return {
    ...pageMetadata("home", lang),
    metadataBase: new URL(SITE_URL),
    title: { default: pages.home.title[lang], template: `%s | ${SITE_NAME}` },
    applicationName: SITE_NAME,
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "sports",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    formatDetection: { telephone: false, email: false, address: false },
    // Search Console and Bing Webmaster Tools codes, set in src/lib/seo.ts
    verification: {
      ...(VERIFICATION.google && { google: VERIFICATION.google }),
      ...(VERIFICATION.bing && { other: { "msvalidate.01": VERIFICATION.bing } }),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const lang = toLang((await params).lang);

  return (
    <html lang={lang} className={`${archivo.variable} ${flex.variable} ${martian.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: earlyPrefs }} />
        <JsonLd data={[organizationSchema(lang), websiteSchema(lang)]} />
      </head>
      <body className="font-sans bg-graphite text-paper">
        <ThemeProvider>
          <LanguageProvider lang={lang}>
            <CartProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
              <RevealObserver />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
