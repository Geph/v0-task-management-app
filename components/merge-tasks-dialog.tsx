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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useIsMobile } from "@/hooks/use-mobile" // Added mobile hook import

interface MergeTasksDialogProps {
  children: React.ReactNode
  selectedTaskNames: string[]
  onMerge: (newTaskName: string) => void
}

export function MergeTasksDialog({ children, selectedTaskNames, onMerge }: MergeTasksDialogProps) {
  const [open, setOpen] = useState(false)
  const [newTaskName, setNewTaskName] = useState(selectedTaskNames.join(" + "))

  const isMobile = useIsMobile()

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
      <DialogContent
        className={`${isMobile ? "max-w-[95vw] w-full mx-2" : "sm:max-w-md"} max-h-[90vh] overflow-y-auto`}
      >
        <DialogHeader>
          <DialogTitle>Merge Tasks</DialogTitle>
          <DialogDescription>
            Combine multiple selected tasks into a single task. Enter a name for the merged task below.
          </DialogDescription>
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
            <ul
              className={`list-disc list-inside mt-1 ${isMobile && selectedTaskNames.length > 5 ? "max-h-32 overflow-y-auto" : ""}`}
            >
              {selectedTaskNames.map((name, index) => (
                <li key={index} className="truncate">
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div className={`flex ${isMobile ? "flex-col gap-3" : "justify-end gap-2"}`}>
            <Button variant="outline" onClick={() => setOpen(false)} className={isMobile ? "w-full" : ""}>
              Cancel
            </Button>
            <Button onClick={handleMerge} className={isMobile ? "w-full" : ""}>
              Merge Tasks
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
