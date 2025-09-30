"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SectionRenameDialogProps {
  currentName: string
  onRename: (newName: string) => void
  children: React.ReactNode
}

export function SectionRenameDialog({ currentName, onRename, children }: SectionRenameDialogProps) {
  const [newName, setNewName] = useState(currentName)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      console.log("[v0] Dialog opened, setting up focus for input")
      setNewName(currentName)
      // Use requestAnimationFrame to ensure the dialog is fully rendered
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (inputRef.current) {
            console.log("[v0] Attempting to focus input field")
            inputRef.current.focus()
            inputRef.current.select()
            console.log("[v0] Input focused and text selected")
          } else {
            console.log("[v0] Input ref not available")
          }
        }, 100)
      })
    }
  }, [isOpen, currentName])

  const handleSave = () => {
    console.log("[v0] Save clicked with name:", newName.trim())
    if (newName.trim() && newName.trim() !== currentName) {
      onRename(newName.trim())
    }
    setIsOpen(false)
  }

  const handleCancel = () => {
    console.log("[v0] Cancel clicked")
    setNewName(currentName)
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    console.log("[v0] Dialog open state changing:", open)
    setIsOpen(open)
    if (!open) {
      console.log("[v0] Dialog closing, resetting state")
      setNewName(currentName)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("[v0] Input changed:", e.target.value)
    setNewName(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("[v0] Key pressed:", e.key)
    if (e.key === "Enter") {
      e.preventDefault()
      e.stopPropagation()
      handleSave()
    }
    if (e.key === "Escape") {
      e.preventDefault()
      e.stopPropagation()
      handleCancel()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-sm"
        onInteractOutside={(e) => {
          console.log("[v0] Dialog interact outside")
          e.preventDefault()
          handleCancel()
        }}
      >
        <DialogHeader>
          <DialogTitle>Rename Section</DialogTitle>
          <DialogDescription>
            Change the name of this section. The new name will be displayed in the task list.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="section-name">Section Name</Label>
            <Input
              ref={inputRef}
              id="section-name"
              value={newName}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter section name"
              autoComplete="off"
              spellCheck={false}
              onFocus={() => console.log("[v0] Input focused")}
              onBlur={() => console.log("[v0] Input blurred")}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
