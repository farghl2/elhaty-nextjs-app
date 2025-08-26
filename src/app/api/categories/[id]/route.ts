import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id} = await params
  try {
    const body = await req.json()

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt( id) },
      data: {
        name: body.name,
      },
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}