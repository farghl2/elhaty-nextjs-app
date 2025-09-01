'use client'

import OfferCard from "../atoms/OfferCard"
import CustomSectionTitle from "../atoms/CustomSectionTitle"
import { useQuery } from "@tanstack/react-query"
import { getOfferPlates } from "@/app/services/offers"
import { Skeleton } from "../atoms/Skeleton"



const Offers = () => {
  const {data,isPending} = useQuery({
    queryKey:['get-offer'],
    queryFn:getOfferPlates
  })

  if(isPending) return(
    <div className=" flex items-center scroll-smooth gap-2 overflow-x-auto px-4 ">

    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="border rounded-lg p-2 flex  my-6 flex-col gap-2">
        <Skeleton className="h-32 w-full rounded-md" /> 
            
              <Skeleton className="h-4 w-3/4" /> 
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between gap-2">
                <Skeleton className="h-8 w-16 rounded-md" /> 
                <Skeleton className="h-8 w-16 rounded-md" /> 
              </div>
      </div>
    ))
    }
      </div>
  )
  return (
    <section className={`${data?.length === 0?'hidden':''} sm:p-4`}>
       <CustomSectionTitle title="عروضنا"/>
        <div className={` flex items-center ${data?.length ==1? 'justify-center':''} scroll-smooth gap-2 overflow-x-auto px-4 `}>
            {data&&data.map((item,index)=><OfferCard plate={item} key={index} />)}
        </div>
        <div className="h-0.5 w-full bg-primary dark:bg-white px-4 my-8"/>
    </section>
  )
}

export default Offers
