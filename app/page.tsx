// app/page.tsx

import { Zine } from './components/pages/zine';
import { fetchZinePictures } from './lib/actions';

export async function generateMetadata() {
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

export default async function Home() {
  const zinePictures = await fetchZinePictures();

  return <Zine zinePictures={zinePictures} />;
}
