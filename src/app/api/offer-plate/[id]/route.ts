import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { offerPlateSchema } from "@/lib/validations/offerPlate"

//  GET ONE
export async function GET(req: NextRequest, { params }: { params:Promise< { id: string }> }) {

  try {
     const {id} =await params;
    const plate = await prisma.offerPlate.findUnique({
      where: { id: parseInt(id) },
    })
    if (!plate) return NextResponse.json({ error: "Not found" }, { status: 404 })

    return NextResponse.json(plate)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}


export async function PUT(req: NextRequest, { params }: { params:Promise< { id: string } >}) {

  try {
    const {id} = await params;
    const body = await req.json()
    const data = offerPlateSchema.partial().parse(body) 

    const updated = await prisma.offerPlate.update({
      where: { id: parseInt(id) },
      data:{
        ...data,
        price:parseInt(data.price!),
        offer:parseInt(data.offer!)

      },
    })
    return NextResponse.json(updated)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

//  DELETE
export async function DELETE(req: NextRequest, { params }: { params:Promise< { id: string }> }) {
  try {
    const {id} = await params
    await prisma.offerPlate.delete({
      where: { id: parseInt(id) },
    })
    return NextResponse.json({ message: "Deleted successfully" })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
