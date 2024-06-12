// app/page.tsx

import { Zine } from './components/zine';
import { fetchZinePictures } from './lib/actions';

export async function generateMetadata() {
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
          url: '/photos/header-miles.jpg', // Ensure this path is correct relative to the public folder
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
          url: '/photos/header-miles.jpg', // Ensure this path is correct relative to the public folder
          alt: "Miles's SXSW",
        },
      ],
    },
  };
}

export default async function Home() {
  const zinePictures = await fetchZinePictures();

  return <Zine zinePictures={zinePictures} />;
}
