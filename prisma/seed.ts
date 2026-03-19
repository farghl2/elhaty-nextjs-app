import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Load JSON data
  const dataPath = path.join(__dirname, "data");
  
  if (!fs.existsSync(dataPath)) {
    console.error(`Please provide the seed JSON files in ${dataPath}`);
    console.error("- categories.json (an array of categories with plates and sizes)");
    console.error("- offers.json (an array of offer plates)");
    return;
  }

  const categoriesFile = path.join(dataPath, "categories.json");
  const offersFile = path.join(dataPath, "offers.json");

  let categoriesData = [];
  let offersData = [];

  try {
    categoriesData = JSON.parse(fs.readFileSync(categoriesFile, "utf-8"));
  } catch (error: any) {
    console.error("Could not parse categories.json:", error.message);
  }

  try {
    offersData = JSON.parse(fs.readFileSync(offersFile, "utf-8"));
  } catch (error: any) {
    console.error("Could not parse offers.json:", error.message);
  }

  // 1. Clear existing data exactly in this order (child -> parent)
  console.log("Clearing existing data...");
  await prisma.size.deleteMany();
  await prisma.plate.deleteMany();
  await prisma.category.deleteMany();
  await prisma.offerPlate.deleteMany();

  // Reset IDs (PostgreSQL sequence reset)
  console.log("Resetting auto-increment sequences...");
  await prisma.$executeRaw`ALTER SEQUENCE "Size_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Plate_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "OfferPlate_id_seq" RESTART WITH 1;`;

  // 2. Insert Categories + Plates + Sizes
  if (categoriesData.length > 0) {
    console.log(`Seeding ${categoriesData.length} categories...`);
    for (const cat of categoriesData) {
      try {
        await prisma.category.create({
          data: {
            id: cat.id,
            name: cat.name,
            plates: {
              create: cat.plates?.map((plate: any) => ({
                id: plate.id,
                title: plate.title,
                desc: plate.desc || "",
                imageUrl: plate.imageUrl || "",
                status: plate.status ?? true,
                bestSale: plate.bestSale ?? false,
                createdAt: new Date(plate.createdAt || new Date()),
                updatedAt: new Date(plate.updatedAt || new Date()),
                sizes: {
                  create: plate.sizes?.map((size: any) => ({
                    id: size.id,
                    size: size.size as any,
                    takeawayPrice: size.takeawayPrice,
                    dineinPrice: size.dineinPrice,
                  })) || [],
                },
              })) || [],
            },
          },
        });
        console.log(`Category "${cat.name}" seeded with ${cat.plates?.length || 0} plates.`);
      } catch (err) {
        console.error(`Failed to insert category id: ${cat.id}, name: ${cat.name}`);
        throw err;
      }
    }
  }

  // 3. Insert Offer Plates
  if (offersData.length > 0) {
    console.log(`Seeding ${offersData.length} offer plates...`);
    for (const offer of offersData) {
      await prisma.offerPlate.create({
        data: {
          id: offer.id,
          title: offer.title,
          desc: offer.desc || "",
          imageUrl: offer.imageUrl,
          status: offer.status ?? true,
          bestSale: offer.bestSale ?? false,
          takeawayPrice: offer.takeawayPrice,
          takeawayOffer: offer.takeawayOffer ?? 0,
          dineinPrice: offer.dineinPrice,
          dineinOffer: offer.dineinOffer ?? 0,
        },
      });
    }
    console.log("Offer plates seeded.");
  }

  // Set sequence manually so any future sequences work smoothly
  if (categoriesData.length > 0) {
    await prisma.$executeRawUnsafe(`SELECT setval('"Category_id_seq"', (SELECT MAX(id) FROM "Category"));`);
    await prisma.$executeRawUnsafe(`SELECT setval('"Plate_id_seq"', (SELECT MAX(id) FROM "Plate"));`);
    await prisma.$executeRawUnsafe(`SELECT setval('"Size_id_seq"', (SELECT MAX(id) FROM "Size"));`);
  }
  if (offersData.length > 0) {
    await prisma.$executeRawUnsafe(`SELECT setval('"OfferPlate_id_seq"', (SELECT MAX(id) FROM "OfferPlate"));`);
  }

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
