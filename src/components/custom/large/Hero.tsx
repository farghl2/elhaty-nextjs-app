'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowDown } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"


 const TITEL ='لحمة بلدى %100'
const Hero = () => {
    const ArrowDownMotion = motion(ArrowDown);

  
  return (
   <section 
    className="relative bg-[url('/rest.jpg')] bg-cover bg-center  min-h-screen flex items-center justify-center"
   >
    <div className="absolute z-0 top-0 left-0 w-full h-full bg-accent-foreground/30"/>
     <div className="text-center z-10 px-4">
        <h1 className=" text-muted text-2xl md:text-4xl max-w-3xl  flex flex-col items-center  justify-start mx-auto font-bold mb-4">
           
           {TITEL}
        </h1>
       
       <Button className={cn(`  px-16`)} 
       asChild>
        <Link href={'/#menu'}>
        
        اطلب دلوقتي
        <ArrowDownMotion 
        animate={{ y: [0, 4, 0] }}
      transition={{
        duration: .8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
        
        />
        </Link>
       </Button>
      </div>
   </section>
  )
}

export default Hero
