/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Band` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Band` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Band" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Band_slug_key" ON "public"."Band"("slug");
