import type { MetadataRoute } from "next";
import { TOOLS } from "./lib/tools";

function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    if (process.env.NODE_ENV === "development") return "http://localhost:3000";
    // Prefer hard default or throw. Hard default is safer than shipping localhost.
    return "https://www.countcash.net";
    // Or:
    // throw new Error("Missing NEXT_PUBLIC_SITE_URL in production");
  }

  return raw.replace(/\/$/, "");
}

function toPath(href: string) {
  if (!href) return "/";
  return href.startsWith("/") ? href : `/${href}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  // Date-only string avoids timezone day rollovers in output
  const today = new Date();
  const lastModified = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/copyright`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: `${baseUrl}${toPath(t.href)}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages];
}

