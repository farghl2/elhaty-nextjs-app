/*
  Warnings:

  - You are about to drop the column `offer` on the `Plate` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Plate` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."ServiceType" AS ENUM ('TAKEAWAY', 'DINEIN');

-- AlterTable
ALTER TABLE "public"."Plate" DROP COLUMN "offer",
DROP COLUMN "price";

-- CreateTable
CREATE TABLE "public"."PlateSize" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,
    "plateId" INTEGER NOT NULL,

    CONSTRAINT "PlateSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PlateSizePrice" (
    "id" SERIAL NOT NULL,
    "type" "public"."ServiceType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "offer" DOUBLE PRECISION,
    "plateSizeId" INTEGER NOT NULL,

    CONSTRAINT "PlateSizePrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PlateSize" ADD CONSTRAINT "PlateSize_plateId_fkey" FOREIGN KEY ("plateId") REFERENCES "public"."Plate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlateSizePrice" ADD CONSTRAINT "PlateSizePrice_plateSizeId_fkey" FOREIGN KEY ("plateSizeId") REFERENCES "public"."PlateSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
