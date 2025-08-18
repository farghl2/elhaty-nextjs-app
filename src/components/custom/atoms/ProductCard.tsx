import { Card } from '@/components/ui/card'
import { Plate } from '@/lib/types'


import Image from 'next/image'
import React from 'react'

interface ProductCardProps {
    plate:Plate
}

export const ProductCard = ({plate}:ProductCardProps) => {
  return (
    <Card className='flex px-1 py-1 flex-row-reverse
    w-full sm:w-5/12 lg:w-3/12 
    '>
      <Image src={plate.imageUrl} alt={plate.title}
      className='rounded-lg'
      width={92} height={92}/>
      <div>

      <div className='text-end'>
        <h4 className='text-lg font-semibold'>{plate.title}</h4>
        <p className='max-w-[300px] text-sm mt-3'>{plate.desc}</p>
      </div>
      <div className='flex justify-around items-center font-semibold mt-3'>
        
          {plate.sizes.map((item)=><>
          <p>{item.size}

            {item.prices.map((item)=>
          <p>{item.price}</p>)}
          </p>
          </>)}
        
      </div>
      </div>
    </Card>
  )
}
