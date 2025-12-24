import { MetadataRoute } from 'next';
import { SEO } from '@/app/lib/constants/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: `${SEO.siteUrl}/sitemap.xml`,
  };
}
