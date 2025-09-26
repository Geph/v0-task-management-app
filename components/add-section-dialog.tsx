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
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/components/ui/use-toast"

interface AddSectionDialogProps {
  onAddSection: (sectionName: string) => void
  children: React.ReactNode
}

export function AddSectionDialog({ onAddSection, children }: AddSectionDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [sectionName, setSectionName] = useState("")
  // const { toast } = useToast()

  const handleAddSection = () => {
    if (sectionName.trim() !== "") {
      onAddSection(sectionName)
      setIsOpen(false)
      setSectionName("")
      // toast({
      //   title: "Section Added",
      //   description: `Section "${sectionName}" has been added.`,
      // })
    } else {
      // toast({
      //   title: "Error",
      //   description: "Section name cannot be empty.",
      //   variant: "destructive",
      // })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
          <DialogDescription>
            Create a new section to organize your tasks. Enter a name for the section below.
          </DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={sectionName} onChange={(e) => setSectionName(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleAddSection}>
            Add Section
          </Button>
        </div> */}
      </DialogContent>
    </Dialog>
  )
}
