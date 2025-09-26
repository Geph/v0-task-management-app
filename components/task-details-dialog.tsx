"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RichTextEditor } from "@/components/rich-text-editor"

interface TaskDetailsDialogProps {
  taskName: string
  taskNotes: string
  onUpdateNotes: (notes: string) => void
  children: React.ReactNode
}

export function TaskDetailsDialog({ taskName, taskNotes, onUpdateNotes, children }: TaskDetailsDialogProps) {
  const [notes, setNotes] = useState(taskNotes)
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    onUpdateNotes(notes)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setNotes(taskNotes)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{taskName}</DialogTitle>
          <DialogDescription>
            View and edit detailed notes for this task. Use the rich text editor to format your notes.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes
            </Label>
            <RichTextEditor
              value={notes}
              onChange={setNotes}
              placeholder="Add notes for this task..."
              className="mt-1"
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
