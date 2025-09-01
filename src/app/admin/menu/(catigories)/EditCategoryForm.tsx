"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { Loader } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم لازم يكون أطول من حرفين" }),
})

type EditCategoryFormProps = {
  category: { id: string; name: string }
  onCancel: () => void
  onSaved: () => void
}

export default function EditCategoryForm({
  category,
  onCancel,
  onSaved,
}: EditCategoryFormProps) {
    const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const res = await fetch(`/api/categories/${category.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    setLoading(false)
    if (!res.ok) {
      alert("فشل تحديث الفئة")
      return
    }

    onSaved()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم الفئة</FormLabel>
              <FormControl>
                <Input placeholder="اسم الفئة" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
          <Button type="submit" disabled={loading}>حفظ {loading&&<Loader className="animate-spin"/>}</Button>
        </div>
      </form>
    </Form>
  )
}
