'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Logo from "./Logo";
import { useEffect, useState } from "react";
import SocialCards from "./SocialCards";
import { ShoppingCart } from "lucide-react";

const HEADERDATA = [
  { title: "الرئيسية", link: "/" ,icon:''},
  { title: "المنيو", link: "/#menu",icon:'' },
  // { title: "السلة", link: "#", icon:ShoppingCart },
];


const Header = () => {


  return (
    <section className={`z-40 h-[60px] fixed w-full bg-transparent flex items-center}
    `}>
      <div className="w-11/12 max-w-6xl mx-auto flex flex-row-reverse items-center justify-between">
       
        <Logo />
        <nav className={`hidden flex-row-reverse sm:flex gap-5 `}>
          {HEADERDATA.map((item, index) => (
            <Button
            
          
            key={index} className={`px-16 text-white font-bold text-xl`}  variant={'link'}>
              <Link href={item.link} className="flex items-center gap-2">
              
              {/* {item.icon && <item.icon className="size-6"/>} */}
              {item.title}
              </Link>
            </Button>
          ))}
        </nav>
        <SocialCards />
      </div>
    </section>
  );
};

export default Header;
