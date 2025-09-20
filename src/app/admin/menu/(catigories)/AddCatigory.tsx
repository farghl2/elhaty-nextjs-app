'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Loader, Plus } from 'lucide-react'
import React, { useState } from 'react'



import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { toast } from 'sonner'
import CustomDialog from '@/components/custom/atoms/CustomDialog'


// 1) Schema
const schema = z.object({
  name: z
    .string()
    .min(2, 'الاسم قصير جدًا')
    .max(50, 'الاسم طويل جدًا'),
})

type FormValues = z.infer<typeof schema>


const AddCatigory = () => {
  const [open, setOpen] = useState(false);
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
        throw new Error(err?.message || 'فشل إنشاء الفئة')
      }
      return res.json()
    },
    onSuccess: () => {
      toast.success('تم إضافة الفئة بنجاح')
      form.reset()
      qc.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (e: any) => {
      toast.error(e?.message ?? 'حدث خطأ غير متوقع')
    },
  })

  const onSubmit = (values: FormValues) => mutation.mutate(values)

  return (
    
    
<CustomDialog 
open={open}
setOpen={setOpen}
title='إضافة فئة '>


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
            حفظ الفئة {mutation.isPending &&<Loader className='animate-spin'/>}
          </Button>
        </form>
      </Form>
      </CustomDialog>
       
  )
}

export default AddCatigory