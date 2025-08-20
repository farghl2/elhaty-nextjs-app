"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { Switch } from "@/components/ui/switch"
import UploadImage from "@/components/custom/atoms/UploadImage"

// ✅ validation schema
const formSchema = z.object({
  title: z.string().min(2, { message: "اسم الوجبة لازم يكون أطول من حرفين" }),
  desc: z.string().min(5, { message: "الوصف لازم يكون أطول من 5 أحرف" }),
  imageUrl: z.string().url({ message: "رابط الصورة غير صحيح" }),
  categoryId: z.string().min(1, { message: "اختر الفئة" }),
    status: z.boolean(),
    bestSale:z.boolean(),
  sizes: z
    .array(
      z.object({
        size:  z.enum(["S", "M", "L", "R"], { message: "اختر الحجم" }),
        takeawayPrice: z.number().min(1, "سعر التيك أوي مطلوب"),
        dineinPrice: z.number().min(1, "سعر الصالة مطلوب"),
      })
    )
    .min(1, { message: "أضف حجم واحد على الأقل" }),
})

type FormValues = z.infer<typeof formSchema>

export default function AddPlateDialog() {
  const [open, setOpen] = useState(false)
  const [upload, setUpload] = useState('')

    const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories')
      return res.json()
    }
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      imageUrl: "",
      categoryId: '',
      status:true,
      bestSale:false,
      sizes: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sizes",
  })
async function onSubmit(values: FormValues) {
  console.log(values)
  console.log("📌 Submitted values:", values)

  try {
    const res = await fetch("/api/plates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    if (!res.ok) throw new Error("فشل إضافة الوجبة")

    const data = await res.json()
    console.log("✅ Plate added:", data)

    setOpen(false)
    form.reset()
  } catch (error) {
    console.error("❌ Error:", error)
  }
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>إضافة وجبة</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة وجبة جديدة</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الوجبة</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: بيتزا مارجريتا" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوصف</FormLabel>
                  <FormControl>
                    <Input placeholder="وصف الوجبة" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رابط الصورة</FormLabel>
                  <FormControl>
                    <UploadImage onUpload={(url)=>{setUpload(url);
                      
                      field.onChange(upload)
                      console.log(field.value)
                      }}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الفئة</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat:{name:string, id:number}) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sizes */}
            <div className="space-y-2">
              <h3 className="font-medium">الأحجام والأسعار</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-4 gap-2 items-end">
                  {/* Size Select */}
                  <FormField
                    control={form.control}
                    name={`sizes.${index}.size`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الحجم</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="S">صغير</SelectItem>
                            <SelectItem value="M">وسط</SelectItem>
                            <SelectItem value="L">كبير</SelectItem>
                            <SelectItem value="R">عائلي</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Takeaway Price */}
                  <FormField
                    control={form.control}
                    name={`sizes.${index}.takeawayPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سعر تيك أوي</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dine-in Price */}
                  <FormField
                    control={form.control}
                    name={`sizes.${index}.dineinPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سعر صالة</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remove Button */}
                  <Button type="button" variant="destructive" onClick={() => remove(index)}>
                    حذف
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ size: "M", takeawayPrice: 0, dineinPrice: 0 })}
              >
                + إضافة حجم
              </Button>
            </div>

            <FormField
  control={form.control}
  name="status"
  render={({ field }) => (
    <FormItem className="flex items-center justify-between rounded-lg border p-3">
      <div className="space-y-0.5">
        <FormLabel>الحالة</FormLabel>
        <FormDescription>
          فعل أو أوقف الفئة
        </FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
    </FormItem>
  )}
/>


            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit">حفظ الوجبة</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


