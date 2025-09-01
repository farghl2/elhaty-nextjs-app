import React from 'react'
import SocialCards from './SocialCards'
import Link from 'next/link'
import { PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PHONEN } from '@/lib/const-data'

const Footer = () => {
  return (
   <section className='min-h-[70px] px-2 py-4  bg-accent'>
    <div className='flex flex-wrap  flex-col gap-5 items-center justify-center sm:justify-between max-w-6xl mx-auto h-full sm:flex-row-reverse'>
        <div className='flex items-center justify-center gap-2 flex-row-reverse'>
            <h4>تابعنا علي</h4>
            <SocialCards />
        </div>
        

        
        <div className='flex flex-col items-end justify-center gap-2 '>
            <h4>تواصل معنا</h4>
           <div>
            {PHONEN.map((item,index)=>
            <div key={index}>
               <Link
               key={index}
               href={`tel:${item.n}`}
               className='text-lg flex gap-2 items-center justify-end'
               >{item.title}
               
               <PhoneCall  size={14}/>
               </Link>
               </div>
            
        )}
           </div>
        </div>
        <div className='h-0.5 w-full bg-white'/>
        <Link target='_blank'
        className='text-center w-full'
        href={'https://www.facebook.com/profile.php?id=61579154469528'}>Powerd by CodeMenuX</Link>
    </div>

   </section>
  )
}

export default Footer