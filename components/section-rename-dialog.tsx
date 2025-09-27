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
      setNewName(currentName)
      // Use setTimeout to ensure the dialog is fully rendered before focusing
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          inputRef.current.select() // Select all text for easy replacement
        }
      }, 100)
    }
  }, [isOpen, currentName])

  const handleSave = () => {
    if (newName.trim() && newName.trim() !== currentName) {
      onRename(newName.trim())
    }
    setIsOpen(false)
  }

  const handleCancel = () => {
    setNewName(currentName) // Reset to original name
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Rename Section</DialogTitle>
          <DialogDescription>
            Change the name of this section. The new name will be displayed in the task list.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="section-name">Section Name</Label>
            <Input
              ref={inputRef}
              id="section-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleSave()
                }
                if (e.key === "Escape") {
                  e.preventDefault()
                  handleCancel()
                }
              }}
              placeholder="Enter section name"
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
