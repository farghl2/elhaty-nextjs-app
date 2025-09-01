import { Plate } from "@/lib/types"


export async function getPlates():Promise<{id:string,name:string,plates:Plate[]}[]> {
  const res = await fetch("/api/plates")
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}
