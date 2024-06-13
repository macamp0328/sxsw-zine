import type { MetadataRoute } from 'next';

import { fetchZinePictures } from './lib/actions';

const BASE_URL = 'https://campmiles.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const zinePictures = await fetchZinePictures();

  const links = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
  ];

  zinePictures.forEach((zinePicture) => {
    links.push({
      url: `${BASE_URL}/${zinePicture.setSlug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    });
  });

  return links;
}
