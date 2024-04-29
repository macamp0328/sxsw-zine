import PhotoPage from '../[bandSlug]/page';
import { getZinePictures } from '../lib/actions';

export default async function PhotoGallery() {
  const zinePhotos = await getZinePictures();

  // console.log(zinePhotos);

  return (
    <>
      {zinePhotos.map((photo) => (
        <div key={photo.id} id={photo.band?.slug}>
          <PhotoPage
            params={{
              pictureDetails: photo,
            }}
          />
        </div>
      ))}
    </>
  );
}
