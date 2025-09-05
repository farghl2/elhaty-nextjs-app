'use client'

import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import useMenuType from '@/hooks/useMenuType'
import { Plate } from '@/lib/types'



import Image from 'next/image'
import React, { useState } from 'react'

interface ProductCardProps {
    plate:Plate
}

export const ProductCard = ({plate}:ProductCardProps) => {
  const type = useMenuType();
  const [open, setOpen] = useState(false);
  console.log(plate.imageUrl)
  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        
      
   <Card className='flex w-full flex-row-reverse px-2 py-1'>
    <Image 
    src={`/api/static/${plate.imageUrl}`}
    alt={plate.title}
    width={120}
    height={120}
    className= 'object-cover rounded-lg'
    /> 
    <div className='flex-1'>
      <div className='text-center mb-1'>
        <h5 className='my-1'>{plate.title}</h5>
        <p className='text-muted-foreground text-sm'>{plate.desc} </p>
      </div>
      <div className='flex items-center justify-around'>
       {plate.sizes.map((s,i)=>
      <div key={i}>
        <p>{s.size}</p>
        {type === "dinein" ? (
                <p className='font-semibold'>{s.dineinPrice} ج.م</p>
              ) : (
                <p className='font-semibold'>{s.takeawayPrice} ج.م</p>
              )}
      </div>
      )}
      </div>
    </div>
   </Card>
   </DialogTrigger>
      <DialogContent className="sm:max-w-3xl flex flex-col items-center justify-center gap-6">
        <DialogHeader>
          <DialogTitle className='text-2xl'>{plate.title}</DialogTitle>
        </DialogHeader>
        <Image alt={plate.title} src={`/api/static/${plate.imageUrl}`} width={500} 
         height={500}
         className='object-cover rounded-lg'
         />
         <h5 >{plate.desc}</h5>
         <div className='flex items-center gap-8 justify-between'>
       {plate.sizes.map((s,i)=>
      <div key={i}>
        <p className='mb-4'>{s.size}</p>
        {type === "dinein" ? (
                <p className='font-semibold text-lg'>{s.dineinPrice} ج.م</p>
              ) : (
                <p className='font-semibold text-lg'>{s.takeawayPrice} ج.م</p>
              )}
      </div>
      )}
      </div>
        </DialogContent>
        </Dialog>
    </>
  )
}

