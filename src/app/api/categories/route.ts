// app/api/categories/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  const categories = await prisma.category.findMany({ include: { plates: true } });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
   try {
    const { name } = await req.json()
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ message: 'اسم غير صالح' }, { status: 400 })
    }

    const category = await prisma.category.create({ data: { name } })
    return NextResponse.json(category, { status: 201 })
  } catch (e) {
    return NextResponse.json({ message: 'خطأ بالخادم' }, { status: 500 })
  }
}
