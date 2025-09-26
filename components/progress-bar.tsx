"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ProgressBarProps {
  value: number
  onChange: (value: number) => void
}

export function ProgressBar({ value, onChange }: ProgressBarProps) {
  const [open, setOpen] = useState(false)
  const [tempValue, setTempValue] = useState(value.toString())

  const handleSave = () => {
    const numValue = Math.max(0, Math.min(100, Number.parseInt(tempValue) || 0))
    onChange(numValue)
    setOpen(false)
  }

  const getProgressColor = (progress: number) => {
    if (progress === 0) return "bg-gray-200"
    if (progress < 25) return "bg-red-500"
    if (progress < 50) return "bg-orange-500"
    if (progress < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full h-6 p-0 justify-start"
          onClick={() => {
            setTempValue(value.toString())
            setOpen(true)
          }}
        >
          <div className="w-full bg-gray-200 rounded-full h-2 relative">
            <div
              className={`h-2 rounded-full transition-all ${getProgressColor(value)}`}
              style={{ width: `${value}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
              {value}%
            </span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Progress</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="progress" className="text-sm font-medium">
              Progress Percentage (0-100)
            </label>
            <Input
              id="progress"
              type="number"
              min="0"
              max="100"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              placeholder="Enter percentage"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
