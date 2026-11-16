import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sentio | Smart HUD Goggles",
    short_name: "Sentio",
    description: "Smart goggles with a heads-up display, HD camera and crash detection for motocross and skiing.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E0F11",
    theme_color: "#0E0F11",
    lang: "en",
    categories: ["sports", "shopping"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
