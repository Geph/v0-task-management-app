"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, Search, GripVertical } from "lucide-react"

interface Option {
  key: string
  label: string
  color: string
}

interface OptionManagerDialogProps {
  title: string
  options: Option[]
  onUpdateOptions: (options: Option[]) => void
  children: React.ReactNode
}

export function OptionManagerDialog({ title, options, onUpdateOptions, children }: OptionManagerDialogProps) {
  const [localOptions, setLocalOptions] = useState<Option[]>(options)
  const [newOptionLabel, setNewOptionLabel] = useState("")
  const [newOptionColor, setNewOptionColor] = useState("#3b82f6")
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (isOpen) {
      setLocalOptions(options)
      setSearchTerm("")
      setNewOptionLabel("")
      setNewOptionColor("#3b82f6")
    }
  }, [isOpen, options])

  const filteredOptions = localOptions.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))

  const addOption = () => {
    if (newOptionLabel.trim()) {
      const newOption: Option = {
        key: newOptionLabel.toLowerCase().replace(/\s+/g, "-"),
        label: newOptionLabel.trim(),
        color: newOptionColor,
      }
      setLocalOptions([...localOptions, newOption])
      setNewOptionLabel("")
      setNewOptionColor("#3b82f6")
    }
  }

  const removeOption = (key: string) => {
    setLocalOptions(localOptions.filter((option) => option.key !== key))
  }

  const updateOption = (key: string, field: "label" | "color", value: string) => {
    setLocalOptions(localOptions.map((option) => (option.key === key ? { ...option, [field]: value } : option)))
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null) return

    const newOptions = [...localOptions]
    const draggedOption = newOptions[draggedIndex]
    newOptions.splice(draggedIndex, 1)
    newOptions.splice(dropIndex, 0, draggedOption)

    setLocalOptions(newOptions)
    setDraggedIndex(null)
  }

  const saveChanges = () => {
    onUpdateOptions(localOptions)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setLocalOptions(options)
    setSearchTerm("")
    setNewOptionLabel("")
    setNewOptionColor("#3b82f6")
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel()
    } else {
      setIsOpen(open)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage {title} Options</DialogTitle>
          <DialogDescription>
            Add, edit, remove, and reorder {title.toLowerCase()} options. Drag items to reorder them.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Existing options with drag and drop */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <div
                key={option.key}
                className="flex items-center gap-2 p-2 border rounded hover:bg-muted/50"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                <Input
                  value={option.label}
                  onChange={(e) => updateOption(option.key, "label", e.target.value)}
                  className="flex-1"
                />
                <input
                  type="color"
                  value={option.color}
                  onChange={(e) => updateOption(option.key, "color", e.target.value)}
                  className="w-10 h-8 rounded border"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(option.key)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add new option */}
          <div className="border-t pt-4">
            <Label className="text-sm font-medium">Add New Option</Label>
            <div className="flex items-center gap-2 mt-2">
              <Input
                placeholder="Option name"
                value={newOptionLabel}
                onChange={(e) => setNewOptionLabel(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addOption()
                  }
                }}
              />
              <input
                type="color"
                value={newOptionColor}
                onChange={(e) => setNewOptionColor(e.target.value)}
                className="w-10 h-8 rounded border"
              />
              <Button variant="ghost" size="sm" onClick={addOption}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={saveChanges}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
