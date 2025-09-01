import { OfferPlate } from "@prisma/client"

export async function getOfferPlates():Promise<OfferPlate[]> {
  const res = await fetch("/api/offer-plate")
  if (!res.ok) throw new Error("Failed to fetch plates")
  return res.json()
}