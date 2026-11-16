import { ImageResponse } from "next/og";
import { LOGO_PATH } from "@/lib/logo";
import type { PageKey } from "@/lib/seo";

/** 1200×630 share images for Google, WhatsApp, Facebook, X and Slack */

const cards: Record<PageKey, { kicker: string; title: string; line: string; accent: string; bg: string; fg: string }> = {
  home: { kicker: "Smart HUD goggles", title: "Vision meets instinct.", line: "Heads-up display · HD camera · Crash detection", accent: "#E08A3C", bg: "#0E0F11", fg: "#F2F0EB" },
  moto: { kicker: "Sentio Moto · Motocross & Enduro", title: "Born for the dirt.", line: "Live speed · GPS laps · Trail navigation · HD video", accent: "#E08A3C", bg: "#0E0F11", fg: "#F2F0EB" },
  snow: { kicker: "Sentio Snow · Ski & Snowboard", title: "Made for the mountain.", line: "Heated anti-fog · Speed & altitude · Crash alerts", accent: "#1F6E9C", bg: "#F2F0EB", fg: "#0E0F11" },
  compare: { kicker: "Compare", title: "Same brain. Different terrain.", line: "Sentio Moto and Sentio Snow side by side", accent: "#E08A3C", bg: "#0E0F11", fg: "#F2F0EB" },
  app: { kicker: "Sentio App", title: "Your ride. Your data.", line: "Free on iOS and Android · No subscription", accent: "#9CCBE6", bg: "#0E0F11", fg: "#F2F0EB" },
  about: { kicker: "About Sentio", title: "Riders shouldn't have to look away.", line: "Smart HUD goggles for motocross and skiing", accent: "#E08A3C", bg: "#0E0F11", fg: "#F2F0EB" },
  support: { kicker: "Sentio Support", title: "We've got you.", line: "Shipping · Warranty · Charging · Setup", accent: "#E08A3C", bg: "#0E0F11", fg: "#F2F0EB" },
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return Object.keys(cards).map((page) => ({ page }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const card = cards[page as PageKey] ?? cards.home;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: card.bg,
          color: card.fg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="40" height="45" viewBox="0 0 316 359">
            <path fill={card.fg} fillRule="evenodd" d={LOGO_PATH} />
          </svg>
          <span style={{ fontSize: 36, letterSpacing: -1 }}>Sentio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 26, color: card.accent, textTransform: "uppercase", letterSpacing: 3 }}>{card.kicker}</span>
          <span style={{ fontSize: 92, lineHeight: 1.02, letterSpacing: -3, marginTop: 18, maxWidth: 1000 }}>{card.title}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 26, opacity: 0.75 }}>
          <span>{card.line}</span>
          <span>sentio.to</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
