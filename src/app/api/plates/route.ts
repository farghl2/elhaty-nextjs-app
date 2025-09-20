// app/api/plates/route.ts
import { prisma } from "@/lib/prisma";
import { plateFormSchema } from "@/lib/validations/plate";
import { NextRequest, NextResponse } from "next/server";

import {z} from 'zod'

// CREATE or GET ALL
export async function GET(req: NextRequest) {
  try {
    const admin = req.headers.get('referer')?.includes('admin') 
    if(admin) {
       const categoriesWithPlates = await prisma.category.findMany({
        include: {
          plates: {
            
  
            include:{sizes:true}
          }
        },
      });
      return NextResponse.json(categoriesWithPlates);

    }else{

      const categoriesWithPlates = await prisma.category.findMany({
        include: {
          plates: {
            where:{status:true,},
  
            include:{sizes:true}
          }
        },
      });
      return NextResponse.json(categoriesWithPlates);
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch categories with plates" },
      { status: 500 }
    );
  }
}




// POST route
export async function POST(req: Request) {
  try {
    const body = await req.json();


    const data = plateFormSchema.parse(body);

 
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

