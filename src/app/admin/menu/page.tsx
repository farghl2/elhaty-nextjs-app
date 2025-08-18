import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import TolTip from '@/components/custom/atoms/ToolTip'
import Catigories from './Catigories'
import AddPlateDialog from './AddPlate'



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
    <section className='w-full  mx-auto px-4'>
      <div className='flex items-center justify-between'>

        <AddPlateDialog />
      <Catigories />
      </div>
      <div className='h-0.5 my-8 w-full bg-muted-foreground'/>
      <ScrollArea className='h-[80vh] mt-8 pb-8'>
      {menuData.map((item, index)=> 
      <>
        <div className='w-full flex items-center justify-evenly py-5'>
             <TolTip content='الاسم'>

            <span>{item.title}</span>
             </TolTip>
            
            <TolTip content='الصورة'>

            <span><Image src={item.images} width={62} height={62} alt='item'
            className='rounded-lg'
            /></span>
            </TolTip>
            
            <TolTip content='price'>
                
                
            <span className='flex items-center gap-1'>
              {item.price}EGP
               
            </span>
            </TolTip>
            <TolTip content='الخصم'>
                
                
            <span className='flex items-center gap-1'>
              {item.offer}
               
            </span>
            </TolTip>
            <TolTip content='الحالة'>
                
                
            <span className='flex items-center gap-1'>
             
            </span>
            </TolTip>
          
            
        </div>
        <Separator />
        
      </>
      )}
      </ScrollArea>
    </section>
  )
}

export default Menu




