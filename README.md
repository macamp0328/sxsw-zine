# sxsw-zine

currently deploayed at: https://sxsw-zine.vercel.app/

## Project Goals
- explore using next.js and Vercel tooling
- explore AI tooling, like copilot and Vercel's v0
- create a creative and minimal photo gallery to share the bands I got to see during SXSW 2024, at least something better than instagram
- provide relevant links to bands when possible
- provide an easy way for bands to download all pictures I captured of them

## High Level Thoughts
- Very basic homepage with concise explanation of my goal/idea/experience
- Make it clear they just need to scroll down
- Some type of creative animation/transition based on scrolling
- URL updates for each band's picture as the user scrolls

## File Structure and Layouts

`./sxsw-zine/`
   - app/
     - [band]/
       - page.tsx
       - layout.tsx (zine-page)
     - components/
       - zine-page.tsx
       - picture-details.tsx
       - band-links.tsx
     - layout.tsx
     - page.tsx
  - public/photos

## CLI commands so I don't forget
database migrations: `npx prisma migrate dev --name init`
database refresh/seed (warning, clears it all out): `npx prisma db seed`


## Maybe features
- jukebox mode where music starts to play and transitions as the user scrolls through page
- pop up box to share other pictures of same band, and a download all button

## Resources Used:
https://github.com/ixartz/Next-js-Boilerplate

