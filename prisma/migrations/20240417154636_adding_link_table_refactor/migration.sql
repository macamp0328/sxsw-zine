/*
  Warnings:

  - You are about to drop the column `bandcampHandle` on the `Band` table. All the data in the column will be lost.
  - You are about to drop the column `generalLink` on the `Band` table. All the data in the column will be lost.
  - You are about to drop the column `instagramHandle` on the `Band` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeLink` on the `Band` table. All the data in the column will be lost.
  - You are about to drop the column `generalLink` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `instagramHandle` on the `Venue` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Platform" AS ENUM ('Instagram', 'YouTube', 'Bandcamp', 'Spotify', 'Facebook', 'Twitter', 'Internet');

-- CreateEnum
CREATE TYPE "public"."LinkType" AS ENUM ('Profile', 'Video', 'Playlist', 'Album', 'Tour', 'Other');

-- AlterTable
ALTER TABLE "public"."Band" DROP COLUMN "bandcampHandle",
DROP COLUMN "generalLink",
DROP COLUMN "instagramHandle",
DROP COLUMN "youtubeLink";

-- AlterTable
ALTER TABLE "public"."Picture" ALTER COLUMN "isIndoor" SET DEFAULT false,
ALTER COLUMN "isZine" SET DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Venue" DROP COLUMN "generalLink",
DROP COLUMN "instagramHandle";

-- CreateTable
CREATE TABLE "public"."Link" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "platform" "public"."Platform" NOT NULL,
    "linkType" "public"."LinkType" NOT NULL,
    "bandId" TEXT,
    "venueId" TEXT,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Link" ADD CONSTRAINT "Link_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "public"."Band"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Link" ADD CONSTRAINT "Link_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "public"."Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
