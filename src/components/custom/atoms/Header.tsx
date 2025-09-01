'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Logo from "./Logo";

import SocialCards from "./SocialCards";
import { Grid, Home, LocateFixedIcon, Menu } from "lucide-react";
import { Contrast, Moon, Sun } from "lucide-react";

const HEADERDATA = [
  { title: "الرئيسية", link: "/" ,icon:Home},
  { title: "قائمة الطعام", link: "/#menu",icon:Grid },
  { title: "تواصل معنا", link: "/#contact-us", icon:LocateFixedIcon },
];


const Header = () => {
    const {setTheme, theme} = useTheme()


  return (
    <section className={`bg-primary dark:bg-accent z-40 h-[60px] fixed w-full flex items-center}
    `}>
      <div className="w-11/12 max-w-6xl mx-auto flex flex-row-reverse items-center justify-between">
       
        <Logo />
        <nav className={`hidden flex-row-reverse sm:flex gap-5 `}>
          {HEADERDATA.map((item, index) => (
            <Button
            
          
            key={index} className={`px-16 text-white font-bold text-xl`}  variant={'link'}>
              <Link href={item.link} className="flex items-center gap-2">
              
              {/* {item.icon && <item.icon className="size-5"/>} */}
              {item.title}
              </Link>
            </Button>
          ))}
        </nav>
         <Button  className="shadow-none bg-transparent" onClick={()=>theme === 'light'?setTheme('dark'):setTheme('light')}>
            {theme === 'dark'&& <Sun />}
           {theme === 'light'&& <Moon className="text-black"/>}
           {theme === 'system'&& <Contrast className="text-white"/>}
          </Button>
          <div className="py-3 h-full">

        <Separator orientation="vertical"/>
          </div>
        <div className="hidden sm:block">
        <SocialCards />
        </div>
        <div className="block sm:hidden">
          <PhoneNavBar />
        </div>
      </div>
    </section>
  );
};

export default Header;


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";

const PhoneNavBar =()=>{

  return(
   <Sheet>
      <SheetTrigger>
        <Menu className="text-accent dark:text-white w-6 h-6" />
      </SheetTrigger>

      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="h-8"></SheetTitle>
          <SheetDescription className="text-center space-y-2">
            <ul className="space-y-2 mb-4">
              {HEADERDATA.map((item) => (
                <li key={item.link}>
                  <SheetClose asChild>
                    <Link
                      href={item.link}
                      className="py-3 px-4 flex items-center justify-between rounded hover:bg-muted transition"
                    >
                      <span>{item.title}</span>
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                    </Link>
                  </SheetClose>
                  <div className="h-0.5 bg-muted-foreground" />
                </li>
              ))}
            </ul>
            <SocialCards />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )

}