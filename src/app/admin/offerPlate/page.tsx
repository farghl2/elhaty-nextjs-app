'use client';

import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import AddOfferPlate from './AddOfferPlate'
import { OfferPlate } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import OfferCard from '@/components/custom/atoms/OfferCard'
import UpdateOfferPlate from './UpdateOfferPlate';
import { Button } from '@/components/ui/button';
import { getOfferPlates } from '@/app/services/offers';


const page = () => {
  const {data, isPending} = useQuery({
    queryKey:['get-offer-plates'],
    queryFn:getOfferPlates
  })
  
    if(isPending) return <div className='h-[80vh] flex justify-center items-center'><Loader className='animate-spin' /></div>
    return (
      <section className='w-full mt-5 mx-auto px-4'>
        <div className='flex items-center justify-between'>
  
          <AddOfferPlate />
       
        </div>
        <div className='h-0.5 my-8 w-full bg-muted-foreground'/>
        <ScrollArea className='min-h-[80vh] w-full mt-8 sm:pb-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
  {data?data.map((item)=>
  <UpdateOfferPlate offerPlate={item}>
    <button>

    <OfferCard plate={item}/>
    </button>


  </UpdateOfferPlate>
    )
      :<p>No data after no</p>}
      </div>
  
        </ScrollArea>
      </section>
    )
  }


export default page