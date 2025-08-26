// app/api/plates/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";


// CREATE or GET ALL
export async function GET() {
  try {
    const categoriesWithPlates = await prisma.category.findMany({
      include: {
        plates: {

          include:{sizes:true}
        }
      },
    });

    return NextResponse.json(categoriesWithPlates);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch categories with plates" },
      { status: 500 }
    );
  }
}





// ✅ Zod Schema (same as your formSchema)
const formSchema = z.object({
  title: z.string().min(2, { message: "اسم الوجبة لازم يكون أطول من حرفين" }),
  desc: z.string().min(5, { message: "الوصف لازم يكون أطول من 5 أحرف" }),
  imageUrl: z.string().min(2,{ message: "رابط الصورة غير صحيح" }),
  categoryId: z.string().min(1, { message: "اختر الفئة" }),
  status: z.boolean(),
  bestSale: z.boolean(),
  sizes: z
    .array(
      z.object({
        size: z.enum(["S", "M", "L", "R"], { message: "اختر الحجم" }),
        takeawayPrice: z.string().min(1, "سعر التيك أوي مطلوب"),
        dineinPrice: z.string().min(1, "سعر الصالة مطلوب"),
      })
    )
    .min(1, { message: "أضف حجم واحد على الأقل" }),
});

// ✅ POST route
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // validate with zod
    const data = formSchema.parse(body);

    // create plate in DB
    const plate = await prisma.plate.create({
      data: {
        title: data.title,
        desc: data.desc,
        imageUrl: data.imageUrl,
        categoryId: parseInt(data.categoryId),
        status: data.status,
        bestSale: data.bestSale,
        sizes: {
          create: data.sizes.map((s) => ({
            size: s.size,
            takeawayPrice:parseInt(s.takeawayPrice),
            dineinPrice:parseInt( s.dineinPrice),
          })),
        },
      },
      include: { sizes: true },
    });

    return NextResponse.json(plate, { status: 201 });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

