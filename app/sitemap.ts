// import { prisma } from "@/db/client";
// import { MetadataRoute } from "next";

// interface Sitemap {
//     url: string;
//     lastModified: Date;
//     changeFrequency: string;
//     priority: number;
// }

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//     const sitemap: Sitemap[] = [];

//     const pages = [
//         {
//             url: "http://netly-agency.com",
//             lastModified: new Date(),
//             changeFrequency: "daily",
//             priority: 1,
//         },
//         {
//             url: "http://netly-agency.com/articles",
//             lastModified: new Date(),
//             changeFrequency: "daily",
//             priority: 1,
//         },
//         {
//             url: "http://netly-agency.com/contacts",
//             lastModified: new Date(),
//             changeFrequency: "daily",
//             priority: 1,
//         },

//         {
//             url: "http://netly-agency.com/portfolio",
//             lastModified: new Date(),
//             changeFrequency: "daily",
//             priority: 1,
//         },
//         {
//             url: "http://netly-agency.com/services",
//             lastModified: new Date(),
//             changeFrequency: "daily",
//             priority: 1,
//         },
//     ];

//     // My pages
//     sitemap.push(...pages.map((p) => ({
//         url: p.url,
//         lastModified: p.lastModified,
//         changeFrequency: p.changeFrequency,
//         priority: p.priority,
//     })));

//     // articles
//     const articles = await prisma.article.findMany({ select: { slug: true, createdAt: true } });
//     sitemap.push(...articles.map((a) => ({
//         url: `http://netly-agency.com/articles/${a.slug}`,
//         lastModified: a.createdAt,
//         changeFrequency: "weekly",
//         priority: 0.8,
//     })));

//     return sitemap as MetadataRoute.Sitemap;
// }
