import type { Metadata } from 'next';

import type { PictureWithRelationsAndUrl } from './actions';

export function generatePictureMetadata(
  pictureDetails: PictureWithRelationsAndUrl | null,
): Metadata {
  if (!pictureDetails) {
    return {
      title: "Miles's SXSW",
      description:
        'A SXSW journey through my lens. Welcome to my slice of SXSW 2024—a digital zine documenting my quest to catch 50 live sets.',
      openGraph: {
        type: 'website',
        title: "Miles's SXSW",
        description:
          'A SXSW journey through my lens. Welcome to my slice of SXSW 2024—a digital zine documenting my quest to catch 50 live sets.',
        images: [
          {
            url: '/photos/header-miles.jpg',
            alt: "Miles's SXSW",
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: "Miles's SXSW",
        description:
          'A SXSW journey through my lens. Welcome to my slice of SXSW 2024—a digital zine documenting my quest to catch 50 live sets.',
        images: [
          {
            url: '/photos/header-miles.jpg',
            alt: "Miles's SXSW",
          },
        ],
      },
    };
  }

  const bandName = pictureDetails.band?.name || 'Unknown Band';
  const pictureUrl = pictureDetails.url || '';
  const venueName = pictureDetails.venue?.name || 'Unknown Venue';
  const description =
    pictureDetails.band?.bio ||
    `Check out this amazing photo of ${bandName} at ${venueName}.`;

  return {
    title: `${bandName} at ${venueName} | Miles's SXSW`,
    description,
    openGraph: {
      type: 'article',
      title: `${bandName} at ${venueName} | Miles's SXSW`,
      description,
      images: [
        {
          url: pictureUrl,
          alt: `${bandName} at ${venueName} | Miles's SXSW`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${bandName} at ${venueName} | Miles's SXSW`,
      description,
      images: [
        {
          url: pictureUrl,
          alt: `${bandName} at ${venueName} | Miles's SXSW`,
        },
      ],
    },
  };
}

export function updateMetadata(pictureDetails: PictureWithRelationsAndUrl) {
  const metadata = generatePictureMetadata(pictureDetails);

  if (metadata.title) {
    document.title = metadata.title as string;
  }

  const metaTags: Record<string, string | undefined> = {
    description: metadata.description || '',
    'og:title': metadata.openGraph?.title as string,
    'og:description': metadata.openGraph?.description || '',
    'og:image': Array.isArray(metadata.openGraph?.images)
      ? (metadata.openGraph?.images[0] as any).url
      : (metadata.openGraph?.images as any).url,
    'twitter:title': metadata.twitter?.title as string,
    'twitter:description': metadata.twitter?.description || '',
    'twitter:image': Array.isArray(metadata.twitter?.images)
      ? (metadata.twitter?.images[0] as any).url
      : (metadata.twitter?.images as any).url,
  };

  Object.keys(metaTags).forEach((key) => {
    const metaTag =
      document.querySelector(`meta[name="${key}"]`) ||
      document.querySelector(`meta[property="${key}"]`);
    if (metaTag && metaTags[key]) {
      metaTag.setAttribute('content', metaTags[key] || '');
    }
  });
}
