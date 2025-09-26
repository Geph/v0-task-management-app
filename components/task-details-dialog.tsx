"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RichTextEditor } from "@/components/rich-text-editor"
import { EmojiPicker } from "@/components/enhanced-emoji-picker"
import { Copy, Edit3 } from "lucide-react"

interface TaskDetailsDialogProps {
  taskName: string
  taskNotes: string
  taskEmoji?: string
  onUpdateNotes: (notes: string) => void
  onUpdateEmoji?: (emoji: string) => void
  onRenameTask: (newName: string) => void
  onDuplicateTask: () => void
  children: React.ReactNode
}

export function TaskDetailsDialog({
  taskName,
  taskNotes,
  taskEmoji = "📝",
  onUpdateNotes,
  onUpdateEmoji,
  onRenameTask,
  onDuplicateTask,
  children,
}: TaskDetailsDialogProps) {
  const [notes, setNotes] = useState(taskNotes)
  const [emoji, setEmoji] = useState(taskEmoji)
  const [isOpen, setIsOpen] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [newTaskName, setNewTaskName] = useState(taskName)

  const handleSave = () => {
    onUpdateNotes(notes)
    if (onUpdateEmoji && emoji !== taskEmoji) {
      onUpdateEmoji(emoji)
    }
    if (isRenaming && newTaskName.trim() !== taskName) {
      onRenameTask(newTaskName.trim())
    }
    setIsOpen(false)
    setIsRenaming(false)
  }

  const handleCancel = () => {
    setNotes(taskNotes)
    setEmoji(taskEmoji)
    setNewTaskName(taskName)
    setIsRenaming(false)
    setIsOpen(false)
  }

  const handleDuplicate = () => {
    onDuplicateTask()
    setIsOpen(false)
  }

  const handleEmojiChange = (newEmoji: string) => {
    setEmoji(newEmoji)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <EmojiPicker value={emoji} onChange={handleEmojiChange} />
            </div>
            {isRenaming ? (
              <Input
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                className="text-lg font-semibold flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsRenaming(false)
                  }
                  if (e.key === "Escape") {
                    setNewTaskName(taskName)
                    setIsRenaming(false)
                  }
                }}
                autoFocus
              />
            ) : (
              <>
                <DialogTitle className="flex-1">{newTaskName}</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsRenaming(true)} className="h-6 w-6 p-0">
                  <Edit3 className="w-3 h-3" />
                </Button>
              </>
            )}
          </div>
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
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleDuplicate} className="flex items-center gap-2 bg-transparent">
              <Copy className="w-4 h-4" />
              Duplicate Task
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
