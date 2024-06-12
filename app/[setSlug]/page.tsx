import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Zine } from '../components/zine';
import { fetchZinePictures } from '../lib/actions';
import { generatePictureMetadata } from '../lib/metadata-utils';

export async function generateStaticParams() {
  const zinePictures = await fetchZinePictures();
  return zinePictures.map((picture) => ({
    setSlug: picture.setSlug,
  }));
}

type ZinePageProps = {
  params: {
    setSlug: string;
  };
};

export async function generateMetadata({
  params,
}: ZinePageProps): Promise<Metadata> {
  const { setSlug } = params;
  const zinePictures = await fetchZinePictures();
  const initialPicture =
    zinePictures.find((pictureItem) => pictureItem.setSlug === setSlug) || null;

  return generatePictureMetadata(initialPicture);
}

export default async function SetPage({ params }: ZinePageProps) {
  const { setSlug } = params;
  const zinePictures = await fetchZinePictures();
  const initialPicture = zinePictures.find(
    (pictureItem) => pictureItem.setSlug === setSlug,
  );

  if (!initialPicture) {
    // Redirect to the homepage if the initial picture is not found
    redirect('/');
  }

  return <Zine zinePictures={zinePictures} initialPicture={initialPicture} />;
}
