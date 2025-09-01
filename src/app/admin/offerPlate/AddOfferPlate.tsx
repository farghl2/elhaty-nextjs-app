"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Switch } from "@/components/ui/switch"
import UploadImage from "@/components/custom/atoms/UploadImage"
import { toast } from "sonner"
import { Loader, Plus } from "lucide-react"
import { OfferPlateInput, offerPlateSchema } from "@/lib/validations/offerPlate"


export default function AddOfferPlate() {
  const [open, setOpen] = useState(false)




  const form = useForm<OfferPlateInput>({
   resolver:zodResolver(offerPlateSchema),
   defaultValues:{
    title:'',
    desc:'',
    imageUrl:'',
    bestSale:false,
    offer:'',
    price:'',
    status:true
   }
    
     
  })
 async function onSubmit(values: OfferPlateInput) {
    try {
      const res = await fetch("/api/offer-plate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error("فشل إضافة العرض")

      toast.success("تمت إضافة العرض")
      setOpen(false)
      form.reset()
    } catch (err: any) {
      toast.error(err.message || "خطأ أثناء الإضافة")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="mr-2" /> إضافة عرض جديد</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>إضافة عرض جديد</DialogTitle>
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
                  <FormControl><Input {...field} /></FormControl>
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
                  <FormControl><Input {...field} /></FormControl>
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
                  <FormLabel>الصورة</FormLabel>
                  <FormControl>
                    <UploadImage onUpload={(url)=>field.onChange(url)}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>السعر</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Offer */}
            <FormField
              control={form.control}
              name="offer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الخصم</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center border p-2 rounded">
                  <FormLabel>الحالة</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Best Sale */}
            <FormField
              control={form.control}
              name="bestSale"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center border p-2 rounded">
                  <FormLabel>أفضل مبيعاً</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader className="animate-spin mr-2" />}
                حفظ
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


