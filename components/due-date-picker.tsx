"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DueDatePickerProps {
  value: Date | null
  onChange: (date: Date | null) => void
}

export function DueDatePicker({ value, onChange }: DueDatePickerProps) {
  const [open, setOpen] = useState(false)

  const isOverdue = value && value < new Date() && !isSameDay(value, new Date())
  const isDueToday = value && isSameDay(value, new Date())

  function isSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full h-6 p-1 justify-start text-left font-normal",
            !value && "text-muted-foreground",
            isOverdue && "text-red-600 bg-red-50",
            isDueToday && "text-orange-600 bg-orange-50",
          )}
        >
          <CalendarIcon className="mr-1 h-3 w-3" />
          {value ? format(value, "MMM dd") : "No date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value || undefined}
          onSelect={(date) => {
            onChange(date || null)
            setOpen(false)
          }}
          initialFocus
        />
        {value && (
          <div className="p-3 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onChange(null)
                setOpen(false)
              }}
              className="w-full"
            >
              Clear Date
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
