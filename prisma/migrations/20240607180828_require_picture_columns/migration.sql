/*
  Warnings:

  - Made the column `height` on table `Picture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `width` on table `Picture` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isZine` on table `Picture` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Picture" ALTER COLUMN "height" SET NOT NULL,
ALTER COLUMN "width" SET NOT NULL,
ALTER COLUMN "isZine" SET NOT NULL;
