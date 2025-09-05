/*
  Warnings:

  - You are about to drop the column `offer` on the `OfferPlate` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `OfferPlate` table. All the data in the column will be lost.
  - Added the required column `dineinPrice` to the `OfferPlate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `takeawayPrice` to the `OfferPlate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."OfferPlate" DROP COLUMN "offer",
DROP COLUMN "price",
ADD COLUMN     "dineinOffer" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "dineinPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "takeawayOffer" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "takeawayPrice" DOUBLE PRECISION NOT NULL;
