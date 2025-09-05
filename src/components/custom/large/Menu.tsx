'use client'

import { Badge } from "@/components/ui/badge"
import { ProductCard } from "../atoms/ProductCard"

import CustomSectionTitle from "../atoms/CustomSectionTitle"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/app/services/catigories"
import { ArrowLeft, ChevronLeft, Loader } from "lucide-react"
import { getPlates } from "@/app/services/getPlate"
import Link from "next/link"
import { Plate } from "@/lib/types"
import { Skeleton } from "../atoms/Skeleton"
import { Card } from "@/components/ui/card"




const Menu = () => {
    const { data,isPending}= useQuery({
      queryKey:['get-plates'],
      queryFn:getPlates
    })

    if(isPending) return(
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
           <Card key={i} className="flex w-full flex-row-reverse px-2 py-2 gap-2">
      <Skeleton className="h-20 w-20 rounded-lg" /> 

      <div className="flex flex-col justify-between flex-1">
        <div className="text-right">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-3 w-32" />
        </div>

        <div className="flex items-center justify-end gap-4 mt-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-4 w-8 mb-1" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
    </Card>
          ))}
        </div>
    )
  return (
   <section id="menu" className=" mx-auto">
   <CustomSectionTitle title="قائمة الطعام"/>
    <Catigories />
    <div className="flex w-full flex-col   gap-1 mb-8 px-1">
      {data&&data.map((item,index)=>
      <div key={index} className={`${item.plates.length ===0?'hidden':''}`}>
        <p id={item.id} className="my-2 sm:my-6 flex items-end justify-end text-end w-full text-sm sm:text-lg font-semibold underline text-primary"><ChevronLeft className="size-4 lg:size-6" />{item.name } </p>
        <div className="w-full grid grid-cols-1 justify-self-end gap-2 sm:grid-cols-3 lg:grid-cols-4">

        {item.plates.map((pl,index)=>
        
        <ProductCard plate={pl} key={index}/>
        )}
        </div>
      </div>
      )}
    </div>
   </section>
  )
}

export default Menu









const Catigories = () => {
  const {data, isPending} =useQuery({
    queryKey:['get-catigories'],
    queryFn:getCategories
  })
  if(isPending) return(
    <div className="flex  flex-row-reverse items-center gap-2 sm:gap-4 my-4 sm:my-8 overflow-x-auto w-full  sm:w-11/12 max-w-6xl mx-auto">
{
        Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 sm:h-12 w-20 sm:w-32 rounded-full" />
        ))
      }
    </div>
      )
  return (
   <section className="flex  flex-row-reverse items-center gap-2 sm:gap-4 my-4 sm:my-8 overflow-x-auto w-full  sm:w-11/12 max-w-6xl mx-auto">
    {data.map((item:{id:string,name:string,plates:Plate[]})=>
    
    <Badge asChild
  variant={'outline'}
    className={`text-lg  hover:bg-muted hover:text-primary  sm:text-2xl px-4 sm:px-8 cursor-pointer
    ${item.plates.length ===0?'hidden':''}
    `}
    key={item.id}>
      <Link href={`#${item.id}`}>
      {item.name}
      </Link>
      </Badge>
    )}
   </section>
  )
}


