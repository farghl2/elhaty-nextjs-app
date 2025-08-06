import { Button } from '@/components/ui/button'
import {  ChevronLeft, Plus } from 'lucide-react'
import React from 'react'

const Catigories = () => {
  return (
  <section className='px-4 flex items-center justify-center gap-4'>
    

      <p>compoe</p>
      <Button>
        إضافة فئة <Plus />
      </Button>
      </section>
  )
}

export default Catigories