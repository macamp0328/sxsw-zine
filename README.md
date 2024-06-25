# sxsw-zine

currently deploayed at: https://campmiles.com

## Current Tooling

- Next.js
- Tailwind CSS
- Prisma ORM
- Supabase hosted Postgres
- AWS S3 and Cloudfront for images
- Hosted by Vercel

## Project Goals

- explore using next.js, tailwind css, and Vercel tooling
- explore AI tooling, like copilot and Vercel's v0
- create a creative and minimal photo gallery to share the bands I got to see during SXSW 2024, at least something better than instagram
- provide relevant links to bands when possible
- provide an easy way for bands to download all pictures I captured of them

## High Level Thoughts

- Very basic homepage with concise explanation of my goal/idea/experience
- Make it clear they just need to scroll down
- Some type of creative animation/transition based on scrolling
- URL updates for each band's picture as the user scrolls

## CLI commands so I don't forget

database migrations: `npx prisma migrate dev --name init`
database refresh/seed (warning, clears it all out): `npx prisma db seed`
`npx prisma generate`
`Get-ChildItem -Recurse -File | Where-Object { $_.FullName -notmatch "\\\.next\\" -and $_.FullName -notmatch "\\node_modules\\" } | Select-Object FullName | Out-File -FilePath directory_structure_files_only.txt`

## Maybe features

- jukebox mode where music starts to play and transitions as the user scrolls through page
- pop up box to share other pictures of same band, and a download all button

## Resources Used:

https://github.com/ixartz/Next-js-Boilerplate
