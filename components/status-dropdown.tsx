"use client"

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

export type StatusType = string

interface StatusOption {
  key: string
  label: string
  color: string
}

interface StatusDropdownProps {
  value: StatusType
  onChange: (status: StatusType) => void
  options: StatusOption[]
  onUpdateOptions: (options: StatusOption[]) => void
  fullWidth?: boolean
}

export function StatusDropdown({ value, onChange, options, onUpdateOptions, fullWidth = false }: StatusDropdownProps) {
  const allOptions = [{ key: "blank", label: "--", color: "#ffffff" }, ...options]

  const currentStatus = allOptions.find((option) => option.key === value) || allOptions[0]

  const handleStatusChange = (status: StatusType) => {
    console.log("[v0] Status dropdown clicked:", status)
    onChange(status)
  }

  const handleTriggerClick = () => {
    console.log("[v0] Status dropdown trigger clicked")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`h-auto p-0 hover:bg-transparent ${fullWidth ? "w-full h-full min-h-[32px]" : ""}`}
          onClick={handleTriggerClick}
        >
          <Badge
            className={`text-xs font-medium hover:opacity-80 ${
              fullWidth ? "w-full h-full flex items-center justify-center rounded-none border" : "rounded-full"
            } ${currentStatus.key === "blank" ? "text-gray-500 border-gray-300" : "text-white"}`}
            style={{
              backgroundColor: currentStatus.key === "blank" ? "#ffffff" : currentStatus.color,
              borderColor: currentStatus.key === "blank" ? "#d1d5db" : currentStatus.color,
            }}
          >
            {currentStatus.label}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {allOptions.map((option) => (
          <DropdownMenuItem
            key={option.key}
            onClick={() => handleStatusChange(option.key)}
            className="flex items-center justify-between"
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
          <OptionManagerDialog title="Status" options={options} onUpdateOptions={onUpdateOptions}>
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Manage Options</span>
            </div>
          </OptionManagerDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
