
import Footer from "@/components/custom/atoms/Footer"
import Header from "@/components/custom/atoms/Header"
import WhatsAppBtn from "@/components/custom/atoms/WhatsAppBtn"
import Hero from "@/components/custom/large/Hero"
import Menu from "@/components/custom/large/Menu"


export default function Home() {
  return (
    <div className="w-full bg-primary">
      <Header />
        <WhatsAppBtn phoneNumber={1122882154}/>
      <Hero/>
      <Menu/> 
      <Footer />
      
    </div>
  )
}