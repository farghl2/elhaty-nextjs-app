'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'

const formSchema = z.object({
  title: z.string().min(2, 'العنوان مطلوب'),
  price: z.string().min(1, 'السعر مطلوب'),
  desc: z.string().min(5, 'الوصف مطلوب'),
  offer: z.string().optional(),
  status: z.boolean(),
  bestSale: z.boolean(),
  categoryId: z.string().min(1, 'اختر التصنيف'),
  image: z.instanceof(File).refine((file) => file.size > 0, 'الصورة مطلوبة'),
})

export default function AddPlateDialog() {
  const [open, setOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      price: '',
      desc: '',
      offer: '',
      status: true,
      bestSale: false,
      categoryId: '',
      image: undefined
    }
  })

  // Get categories for dropdown
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories')
      return res.json()
    }
  })

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const fd = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          fd.append(key, value as any)
        }
      })

      const res = await fetch('/api/plates', {
        method: 'POST',
        body: fd
      })

      if (!res.ok) throw new Error('حدث خطأ أثناء الإضافة')
      return res.json()
    },
    onSuccess: () => {
      toast.success('تمت إضافة الوجبة بنجاح')
      form.reset()
      setOpen(false)
    },
    onError: () => toast.error('تعذر إضافة الوجبة')
  })

  function onSubmit(values: any) {
    mutation.mutate(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          إضافة وجبة <Plus className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>إضافة وجبة جديدة</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className='mb-2'>العنوان</Label>
            <Input {...form.register('title')} placeholder="مثال: بيتزا مارجريتا" />
          </div>
          <div>
            <Label className='mb-2'>السعر</Label>
            <Input type="number" step="0.01" {...form.register('price')} placeholder="100" />
          </div>
          <div>
            <Label className='mb-2'>سعر العرض (اختياري)</Label>
            <Input type="number" step="0.01" {...form.register('offer')} placeholder="80" />
          </div>
          <div>
            <Label className='mb-2'>الوصف</Label>
            <Textarea {...form.register('desc')} placeholder="وصف الوجبة" />
          </div>
          <div>
            <Label className='mb-2'>التصنيف</Label>
            <select {...form.register('categoryId')} className="w-full border rounded p-2">
              <option value="">اختر التصنيف</option>
              {categories?.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className='mb-2'>صورة الوجبة</Label>
            <Input type="file" accept="image/*" {...form.register('image')} />
          </div>
          <div className="flex items-center justify-between">
            <Label>متاح</Label>
            <Switch checked={form.watch('status')} onCheckedChange={(val) => form.setValue('status', val)} />
          </div>
          <div className="flex items-center justify-between">
            <Label>أفضل مبيعًا</Label>
            <Switch checked={form.watch('bestSale')} onCheckedChange={(val) => form.setValue('bestSale', val)} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'جاري الإضافة...' : 'إضافة'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
