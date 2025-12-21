import type { MetadataRoute } from "next";

function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL || // useful on Vercel/CI if you prefer
    "";

  // Dev fallback only in dev.
  if (!raw) {
    if (process.env.NODE_ENV === "development") return "http://localhost:3000";
    // Production should never silently default to localhost.
    return "https://www.countcash.net";
    // Or: throw new Error("Missing NEXT_PUBLIC_SITE_URL in production");
  }

  return raw.replace(/\/$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // disallow: ["/api/", "/admin/"], // uncomment if relevant
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

