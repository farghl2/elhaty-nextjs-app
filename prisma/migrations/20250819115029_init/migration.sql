/*
  Warnings:

  - You are about to drop the `PlateSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlateSizePrice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Plate` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."SizeType" AS ENUM ('S', 'M', 'L', 'R');

-- DropForeignKey
ALTER TABLE "public"."PlateSize" DROP CONSTRAINT "PlateSize_plateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PlateSizePrice" DROP CONSTRAINT "PlateSizePrice_plateSizeId_fkey";

-- AlterTable
ALTER TABLE "public"."Plate" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT true,
ALTER COLUMN "bestSale" SET DEFAULT false;

-- DropTable
DROP TABLE "public"."PlateSize";

-- DropTable
DROP TABLE "public"."PlateSizePrice";

-- DropEnum
DROP TYPE "public"."ServiceType";

-- CreateTable
CREATE TABLE "public"."Size" (
    "id" SERIAL NOT NULL,
    "size" "public"."SizeType" NOT NULL,
    "takeawayPrice" DOUBLE PRECISION NOT NULL,
    "dineinPrice" DOUBLE PRECISION NOT NULL,
    "plateId" INTEGER NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Size" ADD CONSTRAINT "Size_plateId_fkey" FOREIGN KEY ("plateId") REFERENCES "public"."Plate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
