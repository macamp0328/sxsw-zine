# sxsw-zine

## Project Goals
- explore using next.js and Vercel tooling
- explore AI tooling, like copilot and Vercel's v0
- create a creative and minimal photo gallery to share the bands I got to see during SXSW 2024, at least something better than instagram
- provide relevant links to bands when possible
- provide an easy way for bands to download all pictures I captured of them


Schema

Bands:
 - id (uuid)
 - name (string)
 - origin (string) ?
 - bio (longer string) ?
 - miless_thoughts (longer string) ?
 - instagram_handle (string) ?
 - bandcamp_handle (string | url) ?
 - general_link (url) ?
 - youtube_link (url) ?
 - genre (string) ?

Venues:
 - id (uuid)
 - name (string)
 - address 
 - city
 - state
 - zip
 - general_link (url) ?
 - instagram_handle (string) ?

Pictures:
 - id (uuid)
 - filename (string)
 - height (num)
 - width (num)
   filepath (path) ?
 - Bands_id (id) ?
 - Venue_id (id) ?
 - taken_at (timestamp) ?
 - isIndoor (boolean) ?

## Maybe features
- jukebox mode where music starts to play and transitions as the user scrolls through page
- pop up box to share other pictures of same band, and a download all button

## Resources Used:
https://github.com/ixartz/Next-js-Boilerplate

