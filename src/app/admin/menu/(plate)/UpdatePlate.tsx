
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
