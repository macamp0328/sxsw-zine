import { Zine } from '@/app/components/pages/zine';
import { fetchZinePictures } from '@/app/lib/actions';
import { getStaticPhotoUrl } from '@/app/lib/metadata-utils';

export async function generateMetadata() {
  const openGraphImageUrl = getStaticPhotoUrl(
    'opengraph-meta.jpg',
    '/photos/opengraph-meta.jpg',
  );

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
          url: openGraphImageUrl,
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
          url: openGraphImageUrl,
          alt: "Cover image for Miles's SXSW 2024 Zine",
        },
      ],
    },
  };
}

export default async function Home() {
  const zinePictures = await fetchZinePictures();

  return <Zine zinePictures={zinePictures} />;
}
