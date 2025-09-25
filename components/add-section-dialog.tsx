"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddSectionDialogProps {
  onAddSection: (name: string) => void
  children: React.ReactNode
}

export function AddSectionDialog({ onAddSection, children }: AddSectionDialogProps) {
  const [sectionName, setSectionName] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleAdd = () => {
    if (sectionName.trim()) {
      onAddSection(sectionName.trim())
      setSectionName("")
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    setSectionName("")
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="section-name" className="text-sm font-medium">
              Section Name
            </Label>
            <Input
              id="section-name"
              placeholder="Enter section name..."
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              className="mt-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdd()
                }
              }}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!sectionName.trim()}>
              Add Section
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
