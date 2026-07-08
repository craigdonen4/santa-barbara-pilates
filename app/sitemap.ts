import type { MetadataRoute } from "next";

const BASE = "https://santabarbarapilates.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${BASE}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/method`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/sara`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/yoga`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/visit`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
