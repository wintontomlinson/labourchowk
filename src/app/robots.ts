import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/worker/dashboard", "/book", "/login", "/signup"],
    },
    sitemap: "https://labourchowk.example/sitemap.xml",
  };
}
