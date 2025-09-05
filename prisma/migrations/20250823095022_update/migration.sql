-- DropForeignKey
ALTER TABLE "public"."Size" DROP CONSTRAINT "Size_plateId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Size" ADD CONSTRAINT "Size_plateId_fkey" FOREIGN KEY ("plateId") REFERENCES "public"."Plate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
