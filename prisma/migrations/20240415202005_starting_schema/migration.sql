-- AlterTable
ALTER TABLE "public"."Picture" ADD COLUMN     "bandId" TEXT,
ADD COLUMN     "venueId" TEXT,
ALTER COLUMN "isIndoor" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."Band" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "origin" TEXT,
    "bio" TEXT,
    "milesThoughts" TEXT,
    "instagramHandle" TEXT,
    "bandcampHandle" TEXT,
    "generalLink" TEXT,
    "youtubeLink" TEXT,
    "genre" TEXT,

    CONSTRAINT "Band_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Venue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "generalLink" TEXT,
    "instagramHandle" TEXT,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Picture" ADD CONSTRAINT "Picture_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "public"."Band"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Picture" ADD CONSTRAINT "Picture_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "public"."Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
