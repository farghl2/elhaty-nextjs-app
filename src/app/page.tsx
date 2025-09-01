
import CallPhone from "@/components/custom/atoms/CallPhone"
import Footer from "@/components/custom/atoms/Footer"
import Header from "@/components/custom/atoms/Header"
import ContactUs from "@/components/custom/large/contactUs/ContactUs"
import Hero from "@/components/custom/large/Hero"
import Menu from "@/components/custom/large/Menu"
import Offers from "@/components/custom/large/Offers"
import { PHONEN } from "@/lib/const-data"


export default function Home() {
  return (
    <div className="w-full ">
      <Header />
        <CallPhone phoneNumber={PHONEN[0].n}/>
      <Hero/>
      <Offers />
      
      <Menu/> 
      <div className="h-0.5 w-full bg-primary dark:bg-white px-4 my-8"/>
      <ContactUs />
      <Footer />
      
    </div>
  )
}