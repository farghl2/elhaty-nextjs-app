import * as z from "zod"

export const offerPlateSchema = z.object({
    title: z.string().min(2, "اسم الوجبة لازم يكون أطول من حرفين"),
  desc: z.string().optional(),
  imageUrl: z.string().min(2, "اضف صورة"),
  price: z.string().min(1, "اضف السعر"),
  offer: z.string().min(0, "الخصم لا يقل عن 0"),
  status: z.boolean(),
  bestSale: z.boolean(),
})

export type OfferPlateInput = z.infer<typeof offerPlateSchema>