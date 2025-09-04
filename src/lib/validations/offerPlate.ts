import * as z from "zod"

export const offerPlateSchema = z.object({
    title: z.string().min(2, "اسم الوجبة لازم يكون أطول من حرفين"),
  desc: z.string().optional(),
  imageUrl: z.string().min(2, "اضف صورة"),
  takeawayPrice: z.string().min(1, "اضف السعر"),
  takeawayOffer: z.string().optional(),
  dineinPrice: z.string().min(1, "اضف السعر"),
  dineinOffer: z.string().optional(),
  status: z.boolean(),
  bestSale: z.boolean(),
})

export type OfferPlateInput = z.infer<typeof offerPlateSchema>