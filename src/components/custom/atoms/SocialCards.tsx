import { cn } from '@/lib/utils'
import Link from 'next/link';

import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";

const SOCIALCARDS =[
    {icon:FaFacebookF, url:'https://www.facebook.com/profile.php?id=61578594356110'},
    {icon:FaInstagram, url:'https://www.instagram.com/nextdigitx'},
    {icon:FaTiktok, url:'https://www.tiktok.com/@nextdigitx'},
]

const SocialCards = () => {
  return (
    <div>
        
        <div className="flex gap-5 items-center justify-center">
            {SOCIALCARDS.map((item,index)=>
            <Link   target='_blank' key={index} href={item.url} className={`${cn(`bg-primary/75 text-white rounded-xl text-2xl dark:border-white border-1 p-2 shadowg hover:bg-secondary/95 dark:hover:bg-white/95 hover:text-primary`)} `}>
                <item.icon  className="text-xl" />
            </Link>
            
            )}
        </div>
    </div>
  )
}

export default SocialCards


