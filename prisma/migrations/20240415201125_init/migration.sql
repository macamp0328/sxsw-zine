-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateTable
CREATE TABLE "public"."Picture" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL,
    "isIndoor" BOOLEAN NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);
