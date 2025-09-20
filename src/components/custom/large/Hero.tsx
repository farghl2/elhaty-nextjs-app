'use client'

import { Button } from "@/components/ui/button"
import { hero } from "@/lib/const-data"
import { cn } from "@/lib/utils"
import { ArrowDown } from "lucide-react"
import { motion } from "motion/react"

import Link from "next/link"


 
const Hero = () => {
    const ArrowDownMotion = motion(ArrowDown);

  
  return (
   <section 
    className={`relative bg-cover bg-center  min-h-screen flex items-center justify-center`}
    style={{ backgroundImage: `url(${hero.imageUrl})` }}
   >
    <div className="absolute z-0 top-0 left-0 w-full h-full bg-accent-foreground/30 dark:bg-accent/40"/>
     <div className="text-center z-10 px-4">
        <h1 className=" text-white text-2xl md:text-4xl max-w-3xl  flex flex-col items-center  justify-start mx-auto font-bold mb-4">
           
           {hero.title}
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
