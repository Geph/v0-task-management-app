"use client"

import { useState, useEffect } from "react"
import { Check, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { OptionManagerDialog } from "@/components/option-manager-dialog"

export type PriorityType = string

interface PriorityOption {
  key: string
  label: string
  color: string
}

interface PriorityDropdownProps {
  value: PriorityType
  onChange: (priority: PriorityType) => void
  options: PriorityOption[]
  onUpdateOptions: (options: PriorityOption[]) => void
  fullWidth?: boolean
}

export function PriorityDropdown({
  value,
  onChange,
  options,
  onUpdateOptions,
  fullWidth = false,
}: PriorityDropdownProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const allOptions = [{ key: "blank", label: "--", color: "#ffffff" }, ...options]

  const currentPriority = allOptions.find((option) => option.key === value) || allOptions[0]

  const handlePriorityChange = (priority: PriorityType) => {
    console.log("[v0] Priority changing to:", priority)
    onChange(priority)
  }

  if (!isMounted) {
    return (
      <div className="relative inline-block w-full h-full">
        <Button
          variant="ghost"
          className={`h-auto p-0 hover:bg-transparent cursor-pointer relative ${fullWidth ? "w-full h-full min-h-[32px]" : ""}`}
        >
          <Badge
            className={`text-xs font-medium hover:opacity-80 cursor-pointer ${
              fullWidth ? "w-full h-full flex items-center justify-center rounded-none border" : "rounded-full"
            } ${currentPriority.key === "blank" ? "text-gray-500 border-gray-300" : "text-white"}`}
            style={{
              backgroundColor: currentPriority.key === "blank" ? "#ffffff" : currentPriority.color,
              borderColor: currentPriority.key === "blank" ? "#d1d5db" : currentPriority.color,
            }}
          >
            {currentPriority.label}
          </Badge>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative inline-block w-full h-full" style={{ contain: "layout" }}>
      <DropdownMenu
        onOpenChange={(open) => {
          console.log("[v0] Priority dropdown open state changed:", open)
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`h-auto p-0 hover:bg-transparent cursor-pointer relative ${fullWidth ? "w-full h-full min-h-[32px]" : ""}`}
            onClick={() => console.log("[v0] Priority dropdown trigger clicked")}
            data-dropdown-trigger="priority"
          >
            <Badge
              className={`text-xs font-medium hover:opacity-80 cursor-pointer ${
                fullWidth ? "w-full h-full flex items-center justify-center rounded-none border" : "rounded-full"
              } ${currentPriority.key === "blank" ? "text-gray-500 border-gray-300" : "text-white"}`}
              style={{
                backgroundColor: currentPriority.key === "blank" ? "#ffffff" : currentPriority.color,
                borderColor: currentPriority.key === "blank" ? "#d1d5db" : currentPriority.color,
              }}
            >
              {currentPriority.label}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-32"
          sideOffset={8}
          alignOffset={0}
          avoidCollisions={true}
          collisionPadding={20}
          sticky="always"
          strategy="fixed"
        >
          {allOptions.map((option) => (
            <DropdownMenuItem
              key={option.key}
              onClick={() => {
                console.log("[v0] Priority option clicked:", option.key)
                handlePriorityChange(option.key)
              }}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${option.key === "blank" ? "border border-gray-300" : ""}`}
                  style={{ backgroundColor: option.key === "blank" ? "#ffffff" : option.color }}
                />
                <span>{option.label}</span>
              </div>
              {value === option.key && <Check className="w-4 h-4" />}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <OptionManagerDialog title="Priority" options={options} onUpdateOptions={onUpdateOptions}>
              <div className="flex items-center gap-2 cursor-pointer">
                <Settings className="w-4 h-4" />
                <span>Manage Options</span>
              </div>
            </OptionManagerDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
