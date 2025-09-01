import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { offerPlateSchema } from "@/lib/validations/offerPlate"

//  CREATE
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = offerPlateSchema.parse(body) 

    const plate = await prisma.offerPlate.create({data:{
      ...data,
      price:parseInt(data.price),
      offer:parseInt(data.offer)
    }})
    return NextResponse.json(plate, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

//  GET ALL
export async function GET(req: NextRequest) {
  try {
     const admin = req.headers.get('referer')?.includes('admin') 
     if(admin){
           const plates = await prisma.offerPlate.findMany({
         orderBy: { id: "desc" },
       })
       return NextResponse.json(plates)

     }else{

       const plates = await prisma.offerPlate.findMany({
         orderBy: { id: "desc" },
         where:{status:true}
       })
       return NextResponse.json(plates)
     }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
