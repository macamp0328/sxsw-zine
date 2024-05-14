/*
  Warnings:

  - You are about to drop the column `milesThoughts` on the `Band` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Band" DROP COLUMN "milesThoughts",
ADD COLUMN     "bio2" TEXT;
