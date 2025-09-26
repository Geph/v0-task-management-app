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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"

interface TaskSection {
  id: string
  name: string
  tasks: any[]
}

interface RemoveSectionDialogProps {
  sectionToRemove: TaskSection
  availableSections: TaskSection[]
  onRemoveSection: (sectionId: string, moveToSectionId?: string) => void
  children: React.ReactNode
}

export function RemoveSectionDialog({
  sectionToRemove,
  availableSections,
  onRemoveSection,
  children,
}: RemoveSectionDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [moveToSectionId, setMoveToSectionId] = useState<string>("")

  const handleRemove = (discardTasks: boolean) => {
    if (discardTasks) {
      onRemoveSection(sectionToRemove.id)
    } else if (moveToSectionId) {
      onRemoveSection(sectionToRemove.id, moveToSectionId)
    }
    setIsOpen(false)
    setMoveToSectionId("")
  }

  const otherSections = availableSections.filter((s) => s.id !== sectionToRemove.id)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Remove Section
          </DialogTitle>
          <DialogDescription>
            This action will permanently remove the section. Choose what to do with any existing tasks in this section.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You are about to remove the section "{sectionToRemove.name}" which contains {sectionToRemove.tasks.length}{" "}
            task(s).
          </p>

          {sectionToRemove.tasks.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">What would you like to do with the tasks?</Label>

              {otherSections.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm">Move tasks to another section:</Label>
                  <Select value={moveToSectionId} onValueChange={setMoveToSectionId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a section" />
                    </SelectTrigger>
                    <SelectContent>
                      {otherSections.map((section) => (
                        <SelectItem key={section.id} value={section.id}>
                          {section.name} ({section.tasks.length} tasks)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2 pt-4">
            {sectionToRemove.tasks.length > 0 && otherSections.length > 0 && (
              <Button onClick={() => handleRemove(false)} disabled={!moveToSectionId} className="w-full">
                Move Tasks & Remove Section
              </Button>
            )}
            <Button variant="destructive" onClick={() => handleRemove(true)} className="w-full">
              {sectionToRemove.tasks.length > 0 ? "Discard All Tasks & Remove Section" : "Remove Section"}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
