import React from 'react'

const CustomSectionTitle = ({title}:{title:string}) => {
  return (
     <div className="my-8 relative w-full text-center">
            <h2 className="   text-xl sm:text-3xl font-bold">{title}</h2>
            <div className="absolute  h-0.5  w-[20%] sm:w-[5%] left-1/2 -translate-x-1/2 bg-black dark:bg-white  my-3"/>
        </div>

  )
}

export default CustomSectionTitle