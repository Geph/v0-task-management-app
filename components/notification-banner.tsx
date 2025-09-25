import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NotificationBanner() {
  return (
    <div className="bg-[#7b68ee] text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Bell className="w-5 h-5" />
        <span className="text-sm">ClickUp needs your permission to send notifications</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
          Enable
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
          Remind me
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
