
import CallPhone from "@/components/custom/atoms/CallPhone"
import Footer from "@/components/custom/atoms/Footer"
import Header from "@/components/custom/atoms/Header"
import ContactUs from "@/components/custom/large/contactUs/ContactUs"
import Hero from "@/components/custom/large/Hero"
import Menu from "@/components/custom/large/Menu"
import Offers from "@/components/custom/large/Offers"


export default function Home() {
  return (
    <div className="w-full bg-primary">
      <Header />
        <CallPhone phoneNumber={+201122882154}/>
      <Hero/>
      <Offers />
      <div className="h-0.5 w-full bg-white px-4 my-8"/>
      <Menu/> 
      <div className="h-0.5 w-full bg-white px-4 my-8"/>
      <ContactUs />
      <Footer />
      
    </div>
  )
}