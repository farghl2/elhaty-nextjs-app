"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import UploadImage from "@/components/custom/atoms/UploadImage";
import { toast } from "sonner";
import { Loader, Trash } from "lucide-react";
import { OfferPlateInput, offerPlateSchema } from "@/lib/validations/offerPlate";
import { OfferPlate } from "@prisma/client";



export default function UpdateOfferPlate({
  offerPlate,
  children,
}: {
  offerPlate: OfferPlate; 
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<OfferPlateInput>({
    resolver: zodResolver(offerPlateSchema),
    defaultValues: {
      title: offerPlate.title,
      desc: offerPlate.desc ?? "",
      imageUrl: offerPlate.imageUrl,
      status: offerPlate.status,
      bestSale: offerPlate.bestSale,
      takeawayPrice:offerPlate.takeawayPrice.toString(),
      takeawayOffer:offerPlate.takeawayOffer? offerPlate.takeawayOffer.toString():'' ,
      dineinPrice:offerPlate.dineinPrice.toString(),
      dineinOffer:offerPlate.dineinOffer? offerPlate.dineinOffer.toString():'' ,
    },
  });

  //  Update
  async function onUpdate(values: OfferPlateInput) {
    try {
      const res = await fetch(`/api/offer-plate/${offerPlate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("فشل التحديث");

      toast.success("تم التعديل ");
      setOpen(false);
    } catch (err) {
      toast.error("خطأ أثناء التعديل");
    }
  }

  // Delete
  async function onDelete() {
    if (!confirm("هل أنت متأكد من حذف العرض؟")) return;
    try {
      const res = await fetch(`/api/offer-plate/${offerPlate.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("فشل الحذف");

      toast.success("تم الحذف ");
      setOpen(false);
    } catch (err) {
      toast.error("خطأ أثناء الحذف");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>تعديل / حذف العرض</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onUpdate)}
            className="space-y-4"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الوجبة</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                  <FormLabel>الصورة</FormLabel>
                  <FormControl>
                    <UploadImage onUpload={(url) => field.onChange(url)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between border p-2 rounded">
                  <FormLabel>الحالة</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Best Sale */}
            <FormField
              control={form.control}
              name="bestSale"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between border p-2 rounded">
                  <FormLabel>الأكثر مبيعًا</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
<div className="border p-2 rounded-lg ">
              <h5 className="ml-5 pb-4">الصالة</h5>
            <div className="flex gap-3 items-center">

            {/* Price */}
            <FormField
              control={form.control}
              name="dineinPrice"
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
              name="dineinOffer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الخصم</FormLabel>
                  <FormControl><Input placeholder="optional" type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              </div>

            </div >
            <div className="border p-2 rounded-lg">
              <h5 className="ml-5 pb-4">تيك اواي</h5>
            <div className="flex gap-3 items-center">

            {/* Price */}
            <FormField
              control={form.control}
              name="takeawayPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>السعر</FormLabel>
                  <FormControl><Input  type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Offer */}
            <FormField
              control={form.control}
              name="takeawayOffer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الخصم</FormLabel>
                  <FormControl><Input placeholder="optional" type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              </div>

            </div>

            {/* Actions */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="destructive"
                onClick={onDelete}
              >
                <Trash className="mr-2" /> حذف
              </Button>
              <Button type="submit">
                تحديث
                {form.formState.isSubmitting && (
                  <Loader className="animate-spin ml-2" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
