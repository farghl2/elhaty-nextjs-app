import { OfferPlate } from "@/lib/types"
import OfferCard from "../atoms/OfferCard"
import CustomSectionTitle from "../atoms/CustomSectionTitle"



const menuData:OfferPlate[] =[
  {id:1,title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    imageUrl:'/meal.jpg',categoryId:111,status:true,bestSale:false,offer:500,price:1000},
  {id:1,title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    imageUrl:'/meal.jpg',categoryId:111,status:true,bestSale:false,offer:500,price:1000},
 
  
]
const Offers = () => {
  return (
    <section className="sm:p-4">
       <CustomSectionTitle title="عروضنا"/>
        <div className=" flex items-center scroll-smooth gap-2 overflow-x-auto px-4 ">
            {menuData.map((item,index)=><OfferCard plate={item} key={index} />)}
        </div>
    </section>
  )
}

export default Offers
