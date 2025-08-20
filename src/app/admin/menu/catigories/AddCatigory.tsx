'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'



import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { toast } from 'sonner'


// 1) Schema
const schema = z.object({
  name: z
    .string()
    .min(2, 'الاسم قصير جدًا')
    .max(50, 'الاسم طويل جدًا'),
})

type FormValues = z.infer<typeof schema>


const AddCatigory = () => {
    const [open, setOpen] = useState(false)
    const qc = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
    mode: 'onSubmit',
  })

  // 3) Mutation
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.message || 'فشل إنشاء التصنيف')
      }
      return res.json()
    },
    onSuccess: () => {
      toast.success('تم إضافة التصنيف بنجاح')
      form.reset()
      qc.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (e: any) => {
      toast.error(e?.message ?? 'حدث خطأ غير متوقع')
    },
  })

  const onSubmit = (values: FormValues) => mutation.mutate(values)

  return (
    
    
<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          إضافة فئة <Plus className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>إضافة فئة جديدة</DialogTitle>
        </DialogHeader>

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem dir="rtl">
                <FormLabel>اسم الفئة</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: بيتزا / ساندوتشات / مشروبات" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? 'جاري الحفظ...' : <>إضافة <Plus className="ms-2 h-4 w-4" /></>}
          </Button>
        </form>
      </Form>
        </DialogContent>

        </Dialog >
  )
}

export default AddCatigory