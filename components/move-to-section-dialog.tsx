"use client"

import type React from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile" // Added mobile hook import

interface Section {
  id: string
  name: string
}

interface MoveToSectionDialogProps {
  sections: Section[]
  onMove: (sectionId: string) => void
  children: React.ReactNode
}

export function MoveToSectionDialog({ sections, onMove, children }: MoveToSectionDialogProps) {
  const isMobile = useIsMobile()

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={`${isMobile ? "max-w-[95vw] w-full mx-2" : "max-w-sm"} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle>Move to Section</DialogTitle>
          <DialogDescription>
            Select a section to move this task to. Choose from the available sections below.
          </DialogDescription>
        </DialogHeader>
        <div className={`space-y-2 ${isMobile && sections.length > 8 ? "max-h-64 overflow-y-auto" : ""}`}>
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              className="w-full justify-start text-left"
              onClick={() => onMove(section.id)}
            >
              {section.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
