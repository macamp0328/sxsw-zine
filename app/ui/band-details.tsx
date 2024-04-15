import type { Picture } from '@prisma/client';
import React from 'react';

interface BandDetails {
  name: string;
  genre: string;
  members: string[];
}

interface BandDetailsComponentProps {
  picture: Picture;
}

const BandDetailsComponent: React.FC<BandDetailsComponentProps> = ({
  picture,
}) => {
  // const [bandDetails, setBandDetails] = useState<BandDetails | null>(null);

  // useEffect(() => {
  //   // Fetch band details from an API or database
  //   // Replace the URL with your actual API endpoint
  //   fetch('https://api.example.com/band-details')
  //     .then(response => response.json())
  //     .then(data => setBandDetails(data))
  //     .catch(error => console.error(error));
  // }, []);

  // if (!bandDetails) {
  //   return <div>Loading band details...</div>;
  // }

  return (
    <div className="mt-2 border-t border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <h1 className="text-xl font-bold">{picture.id}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Photo by {picture.takenAt.toDateString()}
      </p>
    </div>
  );
};

export default BandDetailsComponent;
