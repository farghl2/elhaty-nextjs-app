import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { OfferPlate } from '@prisma/client'
import useMenuType from '@/hooks/useMenuType'


interface OfferCardProps {
    plate:OfferPlate
} 

const OfferCard = ({plate}:OfferCardProps) => {
  const type = useMenuType();
  

    const price = type ==='takeaway'?plate.takeawayPrice:plate.dineinPrice;
    const offer = type ==='takeaway'?plate.takeawayOffer:plate.dineinOffer;
       const discountPercentage = Math.round(((price! - offer!) / price!) * 100);

  return (
   <Card
      className="relative flex flex-col items-center justify-center p-0 min-w-[300px] max-w-[300px] rounded-lg text-center"
      >
        {plate.bestSale&& <span className="absolute top-4 left-4 bg-white text-primary pl-1 pr-3 py-1 rounded-full text-sm shadow-md flex items-center justify-between"><Image src={'/fire.gif'} height={22} width={22} unoptimized  alt='badge'/>  الأكثر مبيعًا</span>}
              {offer!=0 && <span className="absolute top-16 -rotate-30 animate-wiggle left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">{discountPercentage}% خصم</span>}
        <Image
        className="rounded-lg object-cover p-0 m-0"
        alt={plate.title}
        src={`/api/static/${plate.imageUrl}`}
        width={300}
        height={250}
        />
        <CardContent>
<h4 className="text-lg sm:text-xl font-semibold">{plate.title}</h4>
{offer !=0? <p className=''>
    <span className='line-through text-gray-600 mr-1 text-xl'>{price}</span>
    <span className='text-xl animate-bounce font-semibold'>{offer} ج.م</span>
</p>:<span className='text-xl animate-bounce font-semibold'>{price} ج.م</span>}
<p className="mb-4 text-muted-foreground text-sm">{plate.desc}</p>

        </CardContent>
        {/* <Button className="mx-3 mb-4">اضف للسلة <ShoppingCart /></Button> */}
      </Card>
  )
}

export default OfferCard