// app/api/categories/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  const categories = await prisma.category.findMany({ include: { plates: true } });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const data = await req.json();
  const category = await prisma.category.create({ data });
  return NextResponse.json(category);
}
