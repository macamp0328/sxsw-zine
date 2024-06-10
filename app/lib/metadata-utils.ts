import type { Metadata } from 'next';

import type { PictureWithRelationsAndUrl } from './actions';

export function generatePictureMetadata(
  photo: PictureWithRelationsAndUrl,
): Metadata {
  const title = photo.band
    ? `${photo.band.name} at ${photo.venue?.name} | Miles's SXSW`
    : `Miles's SXSW`;
  const description = photo.band?.bio || 'An amazing snapshot from SXSW 2024.';
  const imageUrl = photo.url || '/default-image.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function updateMetadata(metadata: Metadata) {
  // Handle title update
  if (typeof metadata.title === 'string') {
    document.title = metadata.title;
  } else if (metadata.title && 'default' in metadata.title) {
    document.title = metadata.title.default;
  }

  // Handle description update
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', metadata.description || '');

  // Handle Open Graph image update
  if (metadata.openGraph?.images) {
    const ogImage = Array.isArray(metadata.openGraph.images)
      ? metadata.openGraph.images[0]
      : metadata.openGraph.images;
    const ogImageMetaTag = document.querySelector('meta[property="og:image"]');
    if (ogImageMetaTag) {
      ogImageMetaTag.setAttribute('content', ogImage.toString());
    } else {
      const newOgImage = document.createElement('meta');
      newOgImage.setAttribute('property', 'og:image');
      newOgImage.setAttribute('content', ogImage.toString());
      document.head.appendChild(newOgImage);
    }
  }

  // Handle Twitter image update
  if (metadata.twitter?.images) {
    const twitterImage = Array.isArray(metadata.twitter.images)
      ? metadata.twitter.images[0]
      : metadata.twitter.images;
    const twitterImageMetaTag = document.querySelector(
      'meta[name="twitter:image"]',
    );
    if (twitterImageMetaTag) {
      twitterImageMetaTag.setAttribute('content', twitterImage.toString());
    } else {
      const newTwitterImage = document.createElement('meta');
      newTwitterImage.setAttribute('name', 'twitter:image');
      newTwitterImage.setAttribute('content', twitterImage.toString());
      document.head.appendChild(newTwitterImage);
    }
  }
}
