import { PhoneCall } from "lucide-react";


interface CallPhoneProps {
  phoneNumber:number
}
const CallPhone = ({phoneNumber}:CallPhoneProps) => {
  return (
    <div className="fixed bottom-20 right-[20px] flex flex-col items-center z-50">
      <a
        href={`tel:${phoneNumber}`} 
                target="_blank"
        rel="noopener noreferrer"
        className="bg-primary rounded-full shadow-lg p-4 animate-bounce duration-500   hover:scale-[1.1] hover:shadow-xl"
      >
        <PhoneCall size={30} color="#fff" />
      </a>
      <div className="mt-[8px] text-sm text-center font-bold text-black dark:text-white"> اطلب الان</div> 
    </div>
  );
};

export default CallPhone;