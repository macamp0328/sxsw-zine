import type { Metadata } from 'next';

import type { PictureWithRelationsAndUrl } from '@/app/lib/actions';

export function generatePictureMetadata(
  pictureDetails: PictureWithRelationsAndUrl | null,
): Metadata {
  if (!pictureDetails) {
    return {
      title: "Miles's SXSW: A DIY Zine",
      description:
        'Experience SXSW 2024 through the lens of Miles. This digital zine is a gritty, unfiltered tribute to the energy of live music.',
      openGraph: {
        type: 'website',
        title: "Miles's SXSW: A DIY Zine",
        description:
          'Dive into the raw, unpolished beauty of SXSW 2024. Captured with a small camera, this digital zine is a tribute to the live music and the artists who create it.',
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/statics/opengraph-meta.jpg`,
            alt: "Cover image for Miles's SXSW 2024 Zine",
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: "Miles's SXSW: A Music Zine",
        description:
          'Join Miles on a journey through SXSW 2024. This digital zine, captured with a Ricoh GR II, is a raw, unfiltered celebration of live music and the artists who bring it to life.',
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/statics/opengraph-meta.jpg`,
            alt: "Cover image for Miles's SXSW 2024 Zine",
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
    `${bandName}! This is from their performance at ${venueName} during SXSW 2024!`;

  return {
    title: `${bandName} | Miles's SXSW 2024`,
    description,
    openGraph: {
      type: 'article',
      title: `${bandName} on stage at ${venueName} during SXSW 2024 | Miles's SXSW`,
      description,
      images: [
        {
          url: pictureUrl,
          alt: `${bandName} on stage at ${venueName} during SXSW 2024 | Miles's SXSW`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${bandName} on stage at ${venueName} during SXSW 2024 | Miles's SXSW`,
      description,
      images: [
        {
          url: pictureUrl,
          alt: `${bandName} on stage at ${venueName} during SXSW 2024 | Miles's SXSW`,
        },
      ],
    },
  };
}

export function updateMetadata(pictureDetails?: PictureWithRelationsAndUrl) {
  const metadata = generatePictureMetadata(pictureDetails || null);

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
