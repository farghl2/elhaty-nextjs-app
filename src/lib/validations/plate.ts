import { z } from "zod";

export const plateFormSchema = z.object({
  title: z.string().min(2, { message: "اسم الوجبة لازم يكون أطول من حرفين" }),
  desc: z.string().min(5, { message: "الوصف لازم يكون أطول من 5 أحرف" }),
  imageUrl: z.string().min(2,{ message: "رابط الصورة غير صحيح" }),
  categoryId: z.string().min(1, { message: "اختر الفئة" }),
  status: z.boolean(),
  bestSale: z.boolean(),
  sizes: z
    .array(
      z.object({
        size: z.enum(["S", "M", "L", "R"], { message: "اختر الحجم" }),
        takeawayPrice: z.string().min(1, "سعر التيك أوي مطلوب"),
        dineinPrice: z.string().min(1, "سعر الصالة مطلوب"),
      })
    )
    .min(1, { message: "أضف حجم واحد على الأقل" }),
});

export type PlateInput = z.infer<typeof plateFormSchema>