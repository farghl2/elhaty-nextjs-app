import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface TolTipProps {
    children:React.ReactNode,
    content:string
}
 
const TolTip = ({children, content}:TolTipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

export default  TolTip