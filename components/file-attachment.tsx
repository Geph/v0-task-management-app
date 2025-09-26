"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip, X, Download } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface FileAttachment {
  id: string
  name: string
  size: number
  type: string
  url: string
}

interface FileAttachmentProps {
  attachments: FileAttachment[]
  onAddAttachment: (file: File) => void
  onRemoveAttachment: (id: string) => void
}

export function FileAttachmentComponent({ attachments, onAddAttachment, onRemoveAttachment }: FileAttachmentProps) {
  const [open, setOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("[v0] File input changed")
    const file = event.target.files?.[0]
    if (file) {
      console.log("[v0] File selected:", file.name, file.size)
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("File size must be under 5MB")
        return
      }
      onAddAttachment(file)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleTriggerClick = () => {
    console.log("[v0] File attachment trigger clicked, current open state:", open)
  }

  const handleAddFileClick = () => {
    console.log("[v0] Add file button clicked")
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 relative" onClick={handleTriggerClick}>
          <Paperclip className="w-4 h-4" />
          {attachments.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {attachments.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">File Attachments</h4>
            <Button variant="outline" size="sm" onClick={handleAddFileClick}>
              <Paperclip className="w-4 h-4 mr-1" />
              Add File
            </Button>
          </div>

          <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" accept="*/*" />

          {attachments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No files attached</p>
          ) : (
            <div className="space-y-2">
              {attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{attachment.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const link = document.createElement("a")
                        link.href = attachment.url
                        link.download = attachment.name
                        link.click()
                      }}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onRemoveAttachment(attachment.id)}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-muted-foreground">Maximum file size: 5MB</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
