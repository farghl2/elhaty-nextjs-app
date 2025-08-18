import { Badge } from "@/components/ui/badge"
import { ProductCard } from "../atoms/ProductCard"
import { Plate, ServiceType } from "@/lib/types"
import CustomSectionTitle from "../atoms/CustomSectionTitle"



const menuData:Plate[] =[
  {id:1,title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    imageUrl:'/meal.jpg',categoryId:111,status:true,bestSale:false,
    sizes:[
      {id:1,prices:[{id:1,type:ServiceType.DINEIN,price:100}],size:'L'},
      {id:2,prices:[{id:2,type:ServiceType.DINEIN,price:80}],size:'S'},
      {id:3,prices:[{id:3,type:ServiceType.DINEIN,price:90,offer:0}],size:'M'},
  ]
  },
  {id:1,title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    imageUrl:'/meal.jpg',categoryId:111,status:true,bestSale:false,
    sizes:[
      {id:1,prices:[{id:1,type:ServiceType.DINEIN,price:100}],size:'L'},
      {id:2,prices:[{id:2,type:ServiceType.DINEIN,price:80}],size:'S'},
      {id:3,prices:[{id:3,type:ServiceType.DINEIN,price:90,offer:0}],size:'M'},
  ]
  },
  {id:1,title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    imageUrl:'/meal.jpg',categoryId:111,status:true,bestSale:false,
    sizes:[
      {id:1,prices:[{id:1,type:ServiceType.DINEIN,price:100}],size:'L'},
      {id:2,prices:[{id:2,type:ServiceType.DINEIN,price:80}],size:'S'},
      {id:3,prices:[{id:3,type:ServiceType.DINEIN,price:90,offer:0}],size:'M'},
  ]
  },
  {id:1,title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    imageUrl:'/meal.jpg',categoryId:111,status:true,bestSale:false,
    sizes:[
      {id:1,prices:[{id:1,type:ServiceType.DINEIN,price:100}],size:'L'},
      {id:2,prices:[{id:2,type:ServiceType.DINEIN,price:80}],size:'S'},
      {id:3,prices:[{id:3,type:ServiceType.DINEIN,price:90,offer:0}],size:'M'},
  ]
  },
  {id:1,title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة نص فرخ نص فرخ',
    imageUrl:'/meal.jpg',categoryId:111,status:true,bestSale:false,
    sizes:[
      // {id:1,prices:[{id:1,type:ServiceType.DINEIN,price:100}],size:'L'},
      // {id:2,prices:[{id:2,type:ServiceType.DINEIN,price:80}],size:'S'},
      {id:3,prices:[{id:3,type:ServiceType.DINEIN,price:90,offer:0}],size:'M'},
  ]
  },
  {id:1,title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة نص فرخ نص فرخ',
    imageUrl:'/meal.jpg',categoryId:111,status:true,bestSale:false,
    sizes:[
      {id:1,prices:[{id:1,type:ServiceType.DINEIN,price:100}],size:'L'},
      // {id:2,prices:[{id:2,type:ServiceType.DINEIN,price:80}],size:'S'},
      {id:3,prices:[{id:3,type:ServiceType.DINEIN,price:90,offer:0}],size:'M'},
  ]
  },
 
 
]
const Menu = () => {
  return (
   <section id="menu" className=" mx-auto">
   <CustomSectionTitle title="قائمة الطعام"/>
    <Catigories />
    <div className="flex items-center flex-wrap justify-center  gap-1 mb-8 px-1">
      {menuData.map((item,index)=><ProductCard plate={item} key={index}/>)}
    </div>
   </section>
  )
}

export default Menu








const data =[
    {id:'1', name:'كل الاصناف',image:''},
    {id:'2', name:'المشويات',image:''},
    {id:'3', name:'بيتزا',image:''},
    {id:'4', name:'ساندوتشات',image:''},
    {id:'5', name:'مقبلات',image:''},
    {id:'6', name:'وجبات',image:''},
]
const Catigories = () => {
  return (
   <section className="flex  flex-row-reverse items-center gap-2 sm:gap-4 my-4 sm:my-8 overflow-x-auto w-full  sm:w-11/12 max-w-6xl mx-auto">
    {data.map((item)=>
    
    <Badge
  variant={'outline'}
    className="text-lg text-white hover:bg-muted hover:text-primary  sm:text-2xl px-4 sm:px-8 cursor-pointer
    
    "
    key={item.id}>{item.name}</Badge>
    )}
   </section>
  )
}


