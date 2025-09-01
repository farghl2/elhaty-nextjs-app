-- CreateTable
CREATE TABLE "public"."OfferPlate" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "imageUrl" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "bestSale" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "offer" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "OfferPlate_pkey" PRIMARY KEY ("id")
);
