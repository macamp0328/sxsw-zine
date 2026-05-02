# sxsw-zine

Currently deployed at: https://campmiles.com

## Current Tooling

- Next.js
- Tailwind CSS
- Prisma ORM
- Supabase hosted Postgres
- AWS S3 and Cloudfront for images
- Hosted by Vercel

## Documentation

- [Image Optimization Guide](./docs/IMAGE_OPTIMIZATION.md) - Best practices for image handling and optimization
- [Testing and Monitoring Guide](./docs/TESTING_AND_MONITORING.md) - Post-deployment testing and monitoring instructions
- [Agent Guide](./AGENTS.md) - Ground rules for AI-agent-first development
- [Claude Guide](./CLAUDE.md) - Claude-specific agent notes

## Local Development

Local testing is a project requirement. Start with the checked-in sample photo
mode, then switch to S3 mode when you need production-like image behavior.

```bash
cp .env.example .env.local
npm ci
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

The default `.env.example` uses `STORAGE_TYPE=local`, which maps seeded picture
filenames to sample images in `public/photos`. This lets the gallery, metadata
routes, tracking route, and download route run without AWS credentials.

For production-like testing, set `STORAGE_TYPE=s3` and populate:

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET_NAME`
- `AWS_CLOUDFRONT_DOMAIN`
- `NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN`

Always populate:

- `DATABASE_URL`
- `DIRECT_URL`
- `STORAGE_TYPE`
- `IP_HASH_SALT`

Optional/dormant analytics variables:

- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

Useful checks:

```bash
npm run check-types
npm run lint
npm run build
npm run test:e2e
```

## Photo Quality Rule

The photographs are the point of the project. Main gallery photos should render
at the largest size that entirely fits the screen, with high visual quality and
no cropping. Use `object-contain` for main photos and overlays; reserve
`object-cover` for thumbnails or decorative images.

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
