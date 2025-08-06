import React from 'react'
import SocialCards from './SocialCards'
import Link from 'next/link'
import { PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Footer = () => {
  return (
   <section className='min-h-[70px] px-2 py-4  bg-accent'>
    <div className='flex flex-wrap gap-4 items-center justify-center sm:justify-between max-w-6xl mx-auto h-full flex-row-reverse'>
        <div className='flex items-center justify-center gap-2 flex-row-reverse'>
            <h4>تابعنا علي</h4>
            <SocialCards />
        </div>
        <Button variant={'outline'} asChild>

        <Link href={''}>ساعدنا في تطوير الخدمة</Link>
        </Button>
        <div className='flex items-center justify-center gap-2 flex-row-reverse'>
            <h4>تواصل معنا</h4>
           
        <Link href={'tel:01122882154'}
        className='text-lg'
        >011 22 88 21 54</Link>
        <PhoneCall />
        </div>
    </div>

   </section>
  )
}

export default Footer