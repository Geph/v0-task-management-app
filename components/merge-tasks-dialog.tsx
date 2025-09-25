"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MergeTasksDialogProps {
  children: React.ReactNode
  selectedTaskNames: string[]
  onMerge: (newTaskName: string) => void
}

export function MergeTasksDialog({ children, selectedTaskNames, onMerge }: MergeTasksDialogProps) {
  const [open, setOpen] = useState(false)
  const [newTaskName, setNewTaskName] = useState(selectedTaskNames.join(" + "))

  const handleMerge = () => {
    if (newTaskName.trim()) {
      onMerge(newTaskName.trim())
      setOpen(false)
      setNewTaskName("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Merge Tasks</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="task-name">New Task Name</Label>
            <Input
              id="task-name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Enter merged task name"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Merging {selectedTaskNames.length} tasks:</p>
            <ul className="list-disc list-inside mt-1">
              {selectedTaskNames.map((name, index) => (
                <li key={index} className="truncate">
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMerge}>Merge Tasks</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
