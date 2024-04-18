import PhotoPage from '../[bandSlug]/page';
import { getZinePictures } from '../lib/actions';

export default async function PhotoGallery() {
  const zinePhotos = await getZinePictures();
  // console.log('zinePhotos', zinePhotos);

  return (
    <>
      {zinePhotos.map((photo) => (
        <div key={photo.id}>
          <PhotoPage params={{ bandSlug: photo.band ? photo.band.slug : '' }} />
        </div>
      ))}
    </>
  );
}
