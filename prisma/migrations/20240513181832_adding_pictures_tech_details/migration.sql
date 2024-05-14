-- AlterEnum
ALTER TYPE "public"."Platform" ADD VALUE 'SXSW';

-- AlterTable
ALTER TABLE "public"."Picture" ADD COLUMN     "ISO" TEXT,
ADD COLUMN     "exposureTime" TEXT,
ADD COLUMN     "fStop" TEXT;
