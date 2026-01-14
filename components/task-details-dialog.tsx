"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Copy, Edit3, CheckCircle } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface TaskDetailsDialogProps {
  taskName: string
  taskNotes: string
  taskEmoji?: string
  isCompleted?: boolean
  onUpdateNotes: (notes: string) => void
  onRenameTask: (newName: string) => void
  onDuplicateTask: () => void
  onMarkCompleted: () => void
  children: React.ReactNode
}

export function TaskDetailsDialog({
  taskName,
  taskNotes,
  taskEmoji = "📝",
  isCompleted = false,
  onUpdateNotes,
  onRenameTask,
  onDuplicateTask,
  onMarkCompleted,
  children,
}: TaskDetailsDialogProps) {
  const [notes, setNotes] = useState(taskNotes)
  const [isOpen, setIsOpen] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [newTaskName, setNewTaskName] = useState(taskName)

  const isMobile = useIsMobile()

  useState(() => {
    setNewTaskName(taskName)
  })

  const handleSave = () => {
    onUpdateNotes(notes)
    const trimmedName = newTaskName.trim()
    if (trimmedName && trimmedName !== taskName) {
      onRenameTask(trimmedName)
    }
    setIsOpen(false)
    setIsRenaming(false)
  }

  const handleCancel = () => {
    setNotes(taskNotes)
    setNewTaskName(taskName)
    setIsRenaming(false)
    setIsOpen(false)
  }

  const handleDuplicate = () => {
    onDuplicateTask()
    setIsOpen(false)
  }

  const handleMarkCompleted = () => {
    onMarkCompleted()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-[95vw] w-full sm:w-[75vw] sm:max-w-[1200px] max-h-[90vh] sm:max-h-[95vh] overflow-y-auto"
        showCloseButton={false}
      >
        <DialogHeader className="relative">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{taskEmoji}</div>
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
                <DialogTitle className="flex-1 text-left">{newTaskName}</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsRenaming(true)} className="h-6 w-6 p-0">
                  <Edit3 className="w-3 h-3" />
                </Button>
              </>
            )}
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <RichTextEditor value={notes} onChange={setNotes} placeholder="Add notes for this task..." className="-1" />
          </div>

          <div className={`flex ${isMobile ? "flex-col gap-3" : "justify-between items-center"}`}>
            <div className={`flex gap-2 ${isMobile ? "flex-col" : ""}`}>
              <Button
                variant="outline"
                onClick={handleDuplicate}
                className={`flex items-center gap-2 bg-transparent ${isMobile ? "w-full" : ""}`}
              >
                <Copy className="w-4 h-4" />
                Duplicate
              </Button>
              <Button
                onClick={handleMarkCompleted}
                className={`flex items-center gap-2 ${
                  isCompleted ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
                } ${isMobile ? "w-full" : ""}`}
              >
                <CheckCircle className="w-4 h-4" />
                {isCompleted ? "Set to Incomplete" : "Complete"}
              </Button>
            </div>
            <div className={`flex gap-2 ${isMobile ? "flex-col" : ""}`}>
              <Button onClick={handleSave} className={isMobile ? "w-full" : ""}>
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel} className={isMobile ? "w-full" : ""}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
