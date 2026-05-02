# Claude Guide

Read `AGENTS.md` first. This file exists so Claude-style coding agents have the same operating rules.

## Primary Goal

Help maintain a locally testable, production-safe SXSW photo zine. Treat photo presentation quality as a core requirement, not polish.

## Photo Rule

For main gallery images, optimize for the largest complete photo that fits on screen:

- no cropping
- no forced cover behavior
- no low-quality compression
- stable containers to prevent layout shift
- high-quality source or CDN asset paths

Thumbnails may use `object-cover` because they are previews, but main images and overlays should use `object-contain`.

## Agent Workflow

1. Inspect the repo before changing behavior.
2. Keep changes scoped and compatible with existing Next.js/Prisma patterns.
3. Update `.env.example` and README when env or setup changes.
4. Run typecheck/lint/build when practical.
5. Clearly report any check that could not run and why.

## Local Testing Contract

A future agent should be able to:

```bash
cp .env.example .env.local
npm ci
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
npm run test:e2e
```

With `STORAGE_TYPE=local`, the gallery should render using checked-in sample photos. With `STORAGE_TYPE=s3`, the same flow should use S3/CloudFront after AWS env vars are populated.
