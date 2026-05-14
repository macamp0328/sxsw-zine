# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Read `AGENTS.md` first. This file exists so Claude-style coding agents have the same operating rules.

## Primary Goal

Help maintain a locally testable, production-safe SXSW photo zine. Treat photo presentation quality as a core requirement, not polish.

## Commands

```bash
# Development
npm run dev          # Next.js dev server with Turbo mode

# Checks (run before committing)
npm run check-types  # TypeScript noEmit
npm run lint         # ESLint
npm run smoke        # check-types + lint + build in sequence

# Build
npm run build        # prisma generate + next build

# Database
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# Tests
npm run test:e2e     # Playwright E2E (auto-starts dev server if not running)
```

## Local Setup

```bash
cp .env.example .env.local
npm ci
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
npm run test:e2e
```

With `STORAGE_TYPE=local`, the gallery renders using checked-in sample photos under `public/photos/`. With `STORAGE_TYPE=s3`, populate AWS env vars and the gallery uses S3/CloudFront. With legacy `STORAGE_TYPE=blob`, populate `BLOB_READ_WRITE_TOKEN`.

## Architecture

**Stack:** Next.js 15 App Router · Prisma/Postgres (Supabase) · Tailwind CSS · Vercel hosting · AWS S3 + CloudFront (production images)

**App Router layout:**
- `app/page.tsx` — home page (Server Component, fetches `zinePictures`)
- `app/[setSlug]/page.tsx` — per-band gallery page
- `app/components/` — shared components; `pages/` for page-level, `ui/` for reusable
- `app/lib/` — server-only utilities (Prisma singleton, S3 client, storage abstraction, rate limiting)
- `app/api/track-link-click/` — POST route for analytics; validates, hashes IP, rate-limits
- `app/api/download-images/` — ZIP stream endpoint

**Storage abstraction** (`app/lib/`):
- `env.ts` — validates `STORAGE_TYPE` and required env vars; call `getStorageType()` before touching S3/Blob
- `s3.ts` — lazy-loaded S3Client singleton; `listFiles()` returns CloudFront URLs
- `blobs.ts` — Vercel Blob helpers (legacy)
- `local-files.ts` — filesystem helpers for `STORAGE_TYPE=local`
- `prisma.ts` — lazy-loaded PrismaClient singleton via `getPrisma()`

**Data model (Prisma):** `Band` → `Picture` / `Link` / `LinkClick`; `Venue` → `Picture` / `Link`. `Picture.isZine=true` marks homepage featured photos.

**Key patterns:**
- Default to Server Components; add `'use client'` only when you need browser APIs, state, or effects.
- Lazy-load Prisma and AWS SDKs behind helper functions (never top-level imports in route files).
- Validate public API request bodies before touching Prisma or external services.
- Analytics calls are non-blocking; links must work even if tracking fails.
- `next.config.mjs` sets `images.unoptimized: true`—CloudFront handles optimization.

## Photo Rule

For main gallery images, optimize for the largest complete photo that fits on screen:

- no cropping
- no forced cover behavior
- no low-quality compression
- stable containers to prevent layout shift
- high-quality source or CDN asset paths

Thumbnails may use `object-cover` because they are previews, but main images and overlays must use `object-contain`.

## Agent Workflow

1. Inspect the repo before changing behavior.
2. Keep changes scoped and compatible with existing Next.js/Prisma patterns.
3. Update `.env.example` and README when env or setup changes.
4. Run `npm run smoke` (check-types + lint + build) when practical.
5. Clearly report any check that could not run and why.
