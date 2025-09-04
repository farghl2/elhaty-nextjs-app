/*
  Warnings:

  - Made the column `dineinPrice` on table `OfferPlate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."OfferPlate" ALTER COLUMN "dineinOffer" DROP NOT NULL,
ALTER COLUMN "dineinPrice" SET NOT NULL;
