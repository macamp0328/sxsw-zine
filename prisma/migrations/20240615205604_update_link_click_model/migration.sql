-- CreateEnum
CREATE TYPE "public"."LinkClickType" AS ENUM ('linksLink', 'downloadPictures');

-- CreateTable
CREATE TABLE "public"."LinkClick" (
    "id" TEXT NOT NULL,
    "linkId" TEXT,
    "url" VARCHAR(255),
    "linkType" "public"."LinkClickType" NOT NULL,
    "bandId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referrerUrl" TEXT,
    "pageUrl" TEXT,

    CONSTRAINT "LinkClick_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."LinkClick" ADD CONSTRAINT "LinkClick_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "public"."Link"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LinkClick" ADD CONSTRAINT "LinkClick_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "public"."Band"("id") ON DELETE SET NULL ON UPDATE CASCADE;
