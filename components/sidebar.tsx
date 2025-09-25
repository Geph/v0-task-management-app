import {
  Home,
  Mail,
  Users,
  FileText,
  BarChart3,
  Puzzle,
  Calendar,
  Headphones,
  Settings,
  HelpCircle,
  Star,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <aside className="w-12 bg-white border-r border-border flex flex-col items-center py-4 gap-2">
      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
        <Home className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
        <Mail className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
        <Users className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
        <FileText className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
        <BarChart3 className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
        <Puzzle className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
        <Calendar className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
        <Headphones className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
        <Settings className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
        <HelpCircle className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
        <Star className="w-5 h-5" />
      </Button>
      <div className="mt-auto">
        <Button variant="ghost" size="sm" className="p-2 text-muted-foreground hover:text-foreground">
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </aside>
  )
}
