import React from 'react'
import CustomSectionTitle from '../../atoms/CustomSectionTitle'
import { CalendarClock, LocateFixed, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import { title } from 'process'
import { Item } from '@radix-ui/react-select'
import ContactUsCard from './ContactUsCard'
import { PHONEN } from '@/lib/const-data'


const CONTACTUSDATA = [
    {title:<Link className='text-center' href={'https://maps.app.goo.gl/ip7yFL25SwpGbW2t6'} target='_blank'>
        7 ش محمد حسن الشجاعي متفرع من - ش سوتر الازاريطة ثاني شارع يمين بعد مزلقان الترام</Link>
        ,icon:LocateFixed},
    {title:<p className='flex flex-col items-start gap-2'>
        {PHONEN.map((item,index)=>
        <Link key={index} href={`tel:${item.n}`}>{item.title}</Link>
        )}
    </p>
        ,icon:PhoneCall},
        {
            title:<p className='text-center'> 
                جميع ايام الاسبوع من 12.30 ص - الي 2.30 ص
                    </p>,
            icon:CalendarClock
        }
]

const ContactUs = () => {
  return (
    <section id='contact-us' className='max-w-6xl mb-8 mx-auto'>
        <CustomSectionTitle  title='تواصل معنا'/>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 justify-center items-stretch p-2'>
            {CONTACTUSDATA.map((item,index)=><ContactUsCard key={index} icon={item.icon}
            title={item.title}
            />)}
        </div>
    </section>
  )
}

export default ContactUs