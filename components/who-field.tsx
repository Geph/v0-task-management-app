"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

interface WhoFieldProps {
  value: string
  onChange: (value: string) => void
}

export function WhoField({ value, onChange }: WhoFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  const handleSave = () => {
    onChange(tempValue.trim())
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempValue(value)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Input
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSave()
          } else if (e.key === "Escape") {
            handleCancel()
          }
        }}
        autoFocus
        className="h-6 text-xs px-1"
        placeholder="Enter name"
      />
    )
  }

  return (
    <Button
      variant="ghost"
      className="w-full h-6 p-1 justify-start text-left font-normal"
      onClick={() => {
        setTempValue(value)
        setIsEditing(true)
      }}
    >
      <User className="mr-1 h-3 w-3" />
      <span className="truncate">{value || "Unassigned"}</span>
    </Button>
  )
}
