// "use client";

// import { useState } from "react";
// import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import UploadImage from "@/components/custom/atoms/UploadImage";
// import { toast } from "sonner";
// import { Loader, Trash } from "lucide-react";
// import { Plate } from "@/lib/types";

// const formSchema = z.object({
//   title: z.string().min(2, { message: "اسم الوجبة لازم يكون أطول من حرفين" }),
//   desc: z.string().min(5, { message: "الوصف لازم يكون أطول من 5 أحرف" }),
//   imageUrl: z.string().min(2, { message: "اضف صورة" }),
//   categoryId: z.string().min(1, { message: "اختر الفئة" }),
//   status: z.boolean(),
//   bestSale: z.boolean(),
//   sizes: z
//     .array(
//       z.object({
//         size: z.enum(["S", "M", "L", "R"], { message: "اختر الحجم" }),
//         takeawayPrice: z.string().min(1, "سعر التيك اوي"),
//         dineinPrice: z.string().min(1, "سعر الصالة "),
//       })
//     )
//     .min(1, { message: "أضف حجم واحد على الأقل" }),
// });

// type FormValues = z.infer<typeof formSchema>;

// export default function UpdatePlate({
//   plate,
//   children,
// }: {
//   plate: Plate;
//   children: React.ReactNode;
// }) {
//   const [open, setOpen] = useState(false);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: plate.title,
//       desc: plate.desc,
//       imageUrl: plate.imageUrl,
//       categoryId: plate.categoryId,
//       status: plate.status,
//       bestSale: plate.bestSale,
//       sizes: plate.sizes.map((s: any) => ({
//         size: s.size,
//         dineinPrice: s.dineinPrice.toString(),
//         takeawayPrice: s.takeawayPrice.toString(),
//       })),
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "sizes",
//   });

//   // ✅ Update
//   const onUpdate: SubmitHandler<FormValues> = async (values) => {
//     try {
//       const res = await fetch(`/api/plates/${plate.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });

//       if (!res.ok) throw new Error("فشل التحديث");

//       toast.success("تم تعديل الوجبة ✅");
//       setOpen(false);
//     } catch (err) {
//       toast.error("خطأ أثناء التعديل");
//     }
//   };

//   // ✅ Delete
//   async function onDelete() {
//     if (!confirm("هل أنت متأكد من حذف هذه الوجبة؟")) return;

//     try {
//       const res = await fetch(`/api/plates/${plate.id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error("فشل الحذف");

//       toast.success("تم حذف الوجبة ❌");
//       setOpen(false);
//     } catch (err) {
//       toast.error("خطأ أثناء الحذف");
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>تعديل / حذف الوجبة</DialogTitle>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-4">
//             {/* Title */}
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>اسم الوجبة</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Description */}
//             <FormField
//               control={form.control}
//               name="desc"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>الوصف</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Image */}
//             <FormField
//               control={form.control}
//               name="imageUrl"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>الصورة</FormLabel>
//                   <FormControl>
//                     <UploadImage
//                       onUpload={(url) => field.onChange(url)}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Status */}
//             <FormField
//               control={form.control}
//               name="status"
//               render={({ field }) => (
//                 <FormItem className="flex items-center justify-between border p-2 rounded">
//                   <FormLabel>الحالة</FormLabel>
//                   <FormControl>
//                     <Switch
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />

//             {/* Sizes */}
//             <div>
//               {fields.map((field, index) => (
//                 <div
//                   key={field.id}
//                   className="grid grid-cols-4 items-end gap-2"
//                 >
//                   {/* Size */}
//                   <FormField
//                     control={form.control}
//                     name={`sizes.${index}.size`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>الحجم</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           value={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="اختر" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="S">صغير</SelectItem>
//                             <SelectItem value="M">وسط</SelectItem>
//                             <SelectItem value="L">كبير</SelectItem>
//                             <SelectItem value="R">حجم واحد</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </FormItem>
//                     )}
//                   />

//                   {/* Takeaway */}
//                   <FormField
//                     control={form.control}
//                     name={`sizes.${index}.takeawayPrice`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>تيك أوي</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />

//                   {/* Dine-in */}
//                   <FormField
//                     control={form.control}
//                     name={`sizes.${index}.dineinPrice`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>صالة</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />

//                   {/* Remove */}
//                   <Button
//                     className="m-0"
//                     variant="destructive"
//                     size="icon"
//                     type="button"
//                     onClick={() => remove(index)}
//                   >
//                     <Trash />
//                   </Button>
//                 </div>
//               ))}

//               <Button
//                 className="mt-2"
//                 type="button"
//                 variant="outline"
//                 onClick={() =>
//                   append({ size: "R", dineinPrice: "", takeawayPrice: "" })
//                 }
//               >
//                 + إضافة حجم
//               </Button>
//             </div>

//             {/* Actions */}
//             <div className="flex justify-between">
//               <Button
//                 type="button"
//                 variant="destructive"
//                 onClick={onDelete}
//               >
//                 حذف الوجبة
//               </Button>
//               <Button type="submit">
//                 تحديث{" "}
//                 {form.formState.isSubmitting && (
//                   <Loader className="animate-spin ml-2" />
//                 )}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }

///////////

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import UploadImage from "@/components/custom/atoms/UploadImage";
import { toast } from "sonner";
import { Loader, Trash } from "lucide-react";
import { Plate } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


async function getCategories():Promise<{id:string,name:string}[]> {
  const res = await fetch("/api/plates")
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}

export default function UpdatePlateNoHookForm({
  plate,
  children,
}: {
  plate: Plate;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data,isPending}= useQuery({
    queryKey:['get-plates'],
    queryFn:getCategories
  })


  // ✅ Local State
  const [title, setTitle] = useState(plate.title);
  const [desc, setDesc] = useState(plate.desc);
  const [imageUrl, setImageUrl] = useState(plate.imageUrl);
  const [categoryId, setCategoryId] = useState(plate.categoryId);
  const [status, setStatus] = useState(plate.status);
  const [bestSale, setBestSale] = useState(plate.bestSale);

  const [sizes, setSizes] = useState(
    plate.sizes.map((s: any) => ({
      size: s.size,
      dineinPrice: s.dineinPrice.toString(),
      takeawayPrice: s.takeawayPrice.toString(),
    }))
  );

  const router = useRouter();
  //  Update Plate
  async function onUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const values = {
      title,
      desc,
      imageUrl,
      categoryId,
      status,
      bestSale,
      sizes,
    };

    try {
      const res = await fetch(`/api/plates/${plate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("فشل التحديث");

      toast.success("تم تعديل الوجبة ");
      setOpen(false);
      router.refresh();
      
    } catch (err) {
      toast.error("خطأ أثناء التعديل");
    } finally {
      setLoading(false);
    }
  }

  // Delete Plate
  async function onDelete() {
    if (!confirm("هل أنت متأكد من حذف هذه الوجبة؟")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/plates/${plate.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("فشل الحذف");

      toast.success("تم حذف الوجبة ❌");
      setOpen(false);
    } catch (err) {
      toast.error("خطأ أثناء الحذف");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Update Size Field
  const updateSize = (index: number, key: string, value: string) => {
    setSizes((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [key]: value } : s))
    );
  };

  // ✅ Remove Size
  const removeSize = (index: number) => {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Add Size
  const addSize = () => {
    setSizes((prev) => [
      ...prev,
      { size: "R", dineinPrice: "", takeawayPrice: "" },
    ]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>تعديل / حذف الوجبة</DialogTitle>
        </DialogHeader>

        <form onSubmit={onUpdate} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium">اسم الوجبة</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">الوصف</label>
            <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium">الصورة</label>
            <UploadImage onUpload={(url) => setImageUrl(url)} />
            {imageUrl && (
              <img src={`/api/static/${imageUrl}`} alt="preview" className="w-24 mt-2 rounded" />
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">الفئة</label>
            <Select onValueChange={setCategoryId} value={categoryId}>
              <SelectTrigger>
              
                <SelectValue  placeholder="اختر الفئة" />
                
                
              </SelectTrigger>
              <SelectContent 
            >
            {data&&data.map((item:{id:string, name:string})=>
                <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
            )}
               
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between border p-2 rounded">
            <span>الحالة</span>
            <Switch checked={status} onCheckedChange={setStatus} />
          </div>

          {/* Best Sale */}
          <div className="flex items-center justify-between border p-2 rounded">
            <span>أفضل مبيعاً</span>
            <Switch checked={bestSale} onCheckedChange={setBestSale} />
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-medium mb-2">الأحجام والأسعار</h3>
            {sizes.map((s, i) => (
              <div
                key={i}
                className="flex gap-2 items-end mb-2 border p-2 rounded"
              >
                <Select
                  onValueChange={(v) => updateSize(i, "size", v)}
                  value={s.size}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="الحجم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S">صغير</SelectItem>
                    <SelectItem value="M">وسط</SelectItem>
                    <SelectItem value="L">كبير</SelectItem>
                    <SelectItem value="R">حجم واحد</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="تيك أوي"
                  value={s.takeawayPrice}
                  onChange={(e) => updateSize(i, "takeawayPrice", e.target.value)}
                />
                <Input
                  placeholder="صالة"
                  value={s.dineinPrice}
                  onChange={(e) => updateSize(i, "dineinPrice", e.target.value)}
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeSize(i)}
                >
                  <Trash />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addSize}>
              + إضافة حجم
            </Button>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <Button type="button" variant="destructive" onClick={onDelete}>
              حذف الوجبة
            </Button>
            <Button type="submit" disabled={loading}>
              تحديث {loading && <Loader className="animate-spin ml-2" />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
