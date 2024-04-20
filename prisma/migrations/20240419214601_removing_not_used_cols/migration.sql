/*
  Warnings:

  - You are about to drop the column `isIndoor` on the `Picture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Band" ADD COLUMN     "instagramHandle" TEXT;

-- AlterTable
ALTER TABLE "public"."Picture" DROP COLUMN "isIndoor";
