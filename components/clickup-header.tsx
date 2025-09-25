import { Search, Calendar, Sparkles, Plus, CheckCircle, FileText, Play, RotateCcw, Grid3X3, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ClickUpHeader() {
  return (
    <header className="bg-[#7b68ee] text-white px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-[#7b68ee] rounded-sm transform rotate-45"></div>
          </div>
          <span className="font-semibold text-sm">ClickUp</span>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10 12l-4-4 4-4" />
            </svg>
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </Button>
        </div>

        {/* Calendar */}
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1">
          <Calendar className="w-4 h-4" />
        </Button>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
          <Input
            placeholder="Search"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/70 pl-10 w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 gap-1">
          <Sparkles className="w-4 h-4" />
          AI
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 gap-1">
          <Plus className="w-4 h-4" />
          New
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1">
          <CheckCircle className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1">
          <FileText className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1">
          <Play className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1">
          <FileText className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-1">
          <Grid3X3 className="w-4 h-4" />
        </Button>
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  )
}
