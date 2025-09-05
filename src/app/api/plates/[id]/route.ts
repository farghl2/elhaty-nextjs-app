// PUT /api/plates/[id]
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function PUT(req: NextRequest, {params}: { params:Promise< { id: string }> }) {
    const {id} = await params
  try {
    const body = await req.json();

    const updatedPlate = await prisma.plate.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        desc: body.desc,
        imageUrl: body.imageUrl,
        categoryId: body.categoryId,
        status: body.status,
        bestSale: body.bestSale,
        sizes: {
          deleteMany: {}, 
          create: body.sizes.map((s: any) => ({
            size: s.size,
            takeawayPrice: parseInt(s.takeawayPrice),
            dineinPrice:parseInt(s.dineinPrice),
          })),
        },
      },
    });

    return NextResponse.json(updatedPlate, { status: 200 });
  } catch (error) {
    console.error("Update Plate Error:", error);
    return NextResponse.json({ message: "Error updating plate" }, { status: 500 });
  }
}

// DELETE /api/plates/[id]
export async function DELETE(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params; 
  try {
    await prisma.plate.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "تم حذف الوجة بنجاح" }, { status: 200 });
  } catch (error) {
    console.error("Delete Plate Error:", error);
    return NextResponse.json({ message: "Error deleting plate" }, { status: 500 });
  }
}

