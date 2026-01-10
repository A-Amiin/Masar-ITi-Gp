import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"

export default function ChatHeader({ representative }) {
  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="font-semibold">
        {representative.nameAr}
      </div>

      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold cursor-pointer">
            {representative.nameAr.charAt(0)}
          </div>
        </HoverCardTrigger>

        <HoverCardContent align="end" className="w-64 text-right space-y-1">
          <div className="font-semibold">
            {representative.nameAr}
          </div>
          <div className="text-sm text-muted-foreground">
            {representative.email}
          </div>
          <div className="text-sm text-muted-foreground">
            {representative.phone}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}