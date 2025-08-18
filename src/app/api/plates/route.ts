// app/api/plates/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// CREATE or GET ALL
export async function GET() {
  const plates = await prisma.plate.findMany({ include: { category: true } });
  return NextResponse.json(plates);
}

export async function POST(req: Request) {
  const data = await req.json();
  const plate = await prisma.plate.create({ data });
  return NextResponse.json(plate);
}
