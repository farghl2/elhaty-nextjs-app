"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import EditCategoryForm from "./EditCategoryForm" 
import { getCategories } from "@/app/services/catigories"
import CustomDialog from "@/components/custom/atoms/CustomDialog"



const DisplayCategories = () => {
  const [open, setOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null)

  const queryClient = useQueryClient()
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  function handleSaved() {
    setEditingCategory(null)
    queryClient.invalidateQueries({ queryKey: ["categories"] }) // يعمل تحديث للبيانات
  }

  return (
    <CustomDialog 
    open={open}
    setOpen={setOpen}
    title={editingCategory ? "تعديل الفئة" : " الفئات"}>


        <div className="mt-4">
          {isLoading && <p>جارٍ التحميل...</p>}
          {isError && <p className="text-red-500">فشل تحميل الفئات</p>}

          {!editingCategory ? (
            categories && categories.length > 0 ? (
              <ul className="space-y-2">
                {categories.map((cat: { id: string; name: string }) => (
                  <li
                    key={cat.id}
                    onClick={() => setEditingCategory(cat)}
                    className="p-2 border rounded-md hover:bg-muted cursor-pointer transition-colors"
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            ) : (
              !isLoading && <p>لا توجد فئات بعد</p>
            )
          ) : (
            <EditCategoryForm
              category={editingCategory}
              onCancel={() => setEditingCategory(null)}
              onSaved={handleSaved}
            />
          )}
        </div>
        </CustomDialog>
   
  )
}

export default DisplayCategories