'use client'

import { Card } from '@/components/ui/card'
import useMenuType from '@/hooks/useMenuType'
import { Plate } from '@/lib/types'



import Image from 'next/image'
import React from 'react'

interface ProductCardProps {
    plate:Plate
}

export const ProductCard = ({plate}:ProductCardProps) => {
  const type = useMenuType();
  
  return (
   <Card className='flex w-full flex-row-reverse px-2 py-1'>
    <Image 
    src={plate.imageUrl}
    alt={plate.title}
    width={120}
    height={120}
    className= 'object-cover rounded-lg'
    /> 
    <div className='flex-1'>
      <div className='text-center mb-1'>
        <h5>{plate.title}</h5>
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
  )
}
