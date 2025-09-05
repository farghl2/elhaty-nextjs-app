'use client'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import TolTip from '@/components/custom/atoms/ToolTip'
import AddPlateDialog from './(plate)/AddPlate'
import Catigories from './(catigories)/Catigories'
import { useQuery } from '@tanstack/react-query'
import { Plate } from '@/lib/types'
import UpdatePlate from './(plate)/UpdatePlate'
import { ProductCard } from '@/components/custom/atoms/ProductCard'
import { Card } from '@/components/ui/card'
import { Loader } from 'lucide-react'
import { getPlates } from '@/app/services/getPlate'





const Menu = () => {
  const { data,isPending}= useQuery({
    queryKey:['get-plates'],
    queryFn:getPlates
  })


  if(isPending) return <div className='h-[80vh]  flex justify-center items-center'><Loader className='animate-spin' /></div>
  return (
    <section className='w-full mt-5 mx-auto px-1 sm:px-4'>
      <div className='flex items-center justify-between'>

        <AddPlateDialog />
      <Catigories />
      </div>
      <div className='h-0.5 my-8 w-full bg-muted-foreground'/>
      <ScrollArea className='min-h-[80vh] w-full my-8 sm:pb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-5'>

        {data?data?.map((item)=>

item.plates.map((item)=><UpdatePlate plate={item}>
        <Card key={item.id} className='flex flex-row-reverse justify-between px-2 gap-4'>
          <Image src={`/api/static/${item.imageUrl}`} className='rounded-lg object-cover' width={62} height={62} alt='img'/>
          <div className='flex-1 text-center '>
          <h4>{item.title}</h4>
          <h5 className='text-muted-foreground my-2 text-sm'>{item.desc}</h5>
<div className='flex'>
  <div>
    <span className='block'>.</span>
            <span className='block'>صالة</span>
            <span className='block'>تيك اوي</span>
  </div>
          <div className='flex flex-1 justify-around'>
           
            {item&& item.sizes.map((s)=>
            <div>
              <p>{s.size}</p>
              <p> {s.dineinPrice}</p>
              <p> {s.takeawayPrice}</p>
            </div>
            )}
            
          </div>
          </div>
              </div>

        </Card>
        </UpdatePlate>
      )
      
    )
    :<p>No data after no</p>}
    </div>

      </ScrollArea>
    </section>
  )
}

export default Menu




