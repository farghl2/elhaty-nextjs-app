
const menuData =[
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  {id:'1',title:'نص فرخة مشوي', desc:'نص فرخ نص فرخة نص فرخة نص فرخة',
    price:150,offer:0,images:'/meal.jpg',
  },
  
]
const Menu = () => {
  return (
   <section id="menu" className=" mx-auto">
    <MenuTitle />
    <Catigories />
    <div className="flex items-center flex-wrap justify-center  gap-1 mb-8">
      {menuData.map((item,index)=><Card
      className="p-0 rounded-lg text-center"
      key={index}
      >
        <Image
        className="rounded-lg object-cover p-0 m-0"
        alt={item.desc}
        src={item.images}
        width={350}
        height={350}
        />
        <CardContent>
<h4 className="text-lg sm:text-xl font-semibold">{item.title}</h4>
<h5 className="text-lg sm:text-xl font-bold">{item.price}EGP</h5>


        </CardContent>
        <Button className="mx-3 mb-4">اضف للسلة <ShoppingCart /></Button>
      </Card>)}
    </div>
   </section>
  )
}

export default Menu



import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"



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


const MenuTitle=()=>(
    <h2 
    className="text-center text-yellow-700 my-4 text-2xl sm:text-3xl font-bold
    "
    >اكتشف المنيو بتاعنا</h2>
)