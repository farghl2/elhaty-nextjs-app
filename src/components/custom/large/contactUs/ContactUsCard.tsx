import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import React from 'react'

const ContactUsCard = ({title,icon:Icon}:{title:React.ReactNode,icon:LucideIcon}) => {
  return (
  <Card className='p-4 flex flex-col items-center text-foreground  text-sm'>
    <div  className='p-6 bg-primary/10 rounded-full'>

      <Icon className='size-8'/>
    </div>

      {title}


  </Card>
  )
}

export default ContactUsCard