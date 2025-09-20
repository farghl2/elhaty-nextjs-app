
import React from 'react'
import AddCatigory from './AddCatigory'
import DisplayCategories from './DisplayCategories'

const Catigories = () => {
  return (
  <section className='px-4 flex items-center justify-center gap-4'>
    

      <DisplayCategories />
     <AddCatigory />
      </section>
  )
}

export default Catigories