// Contains all the actions that can be called from components that interact with database, api, or other services.
// import { pictures } from '@/app/lib/temp-data.json';
const data = require('./temp-data.json');

// get pictures
export function getPictures() {
  console.log(data);
  return data.pictures;
}

// get bands

// get venues

// get pictures of a band
