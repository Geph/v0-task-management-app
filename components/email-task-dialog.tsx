"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

interface EmailTaskDialogProps {
  children: React.ReactNode
  taskName: string
  taskNotes: string
  onSendEmail: (email: string, subject: string, message: string) => void
}

export function EmailTaskDialog({ children, taskName, taskNotes, onSendEmail }: EmailTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [savedEmails, setSavedEmails] = useState(["team@company.com", "manager@company.com", "client@example.com"])
  const [selectedEmail, setSelectedEmail] = useState("")
  const [customEmail, setCustomEmail] = useState("")
  const [subject, setSubject] = useState(`Task: ${taskName}`)
  const [message, setMessage] = useState(`Task Details:\n\n${taskName}\n\nNotes:\n${taskNotes}`)
  const [newEmail, setNewEmail] = useState("")

  const handleSendEmail = () => {
    const emailToUse = selectedEmail === "custom" ? customEmail : selectedEmail
    if (emailToUse && subject && message) {
      onSendEmail(emailToUse, subject, message)
      setOpen(false)
    }
  }

  const addNewEmail = () => {
    if (newEmail && !savedEmails.includes(newEmail)) {
      setSavedEmails([...savedEmails, newEmail])
      setNewEmail("")
    }
  }

  const removeEmail = (email: string) => {
    setSavedEmails(savedEmails.filter((e) => e !== email))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send Task via Email</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email-select">Email Address</Label>
            <Select value={selectedEmail} onValueChange={setSelectedEmail}>
              <SelectTrigger>
                <SelectValue placeholder="Select or enter email" />
              </SelectTrigger>
              <SelectContent>
                {savedEmails.map((email) => (
                  <SelectItem key={email} value={email}>
                    <div className="flex items-center justify-between w-full">
                      <span>{email}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeEmail(email)
                        }}
                        className="ml-2 p-1 h-auto"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </SelectItem>
                ))}
                <SelectItem value="custom">Enter custom email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedEmail === "custom" && (
            <div>
              <Label htmlFor="custom-email">Custom Email</Label>
              <Input
                id="custom-email"
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
          )}

          <div className="flex gap-2">
            <Input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Add new email to saved list"
              type="email"
            />
            <Button onClick={addNewEmail} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
            />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Email message"
              rows={6}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail}>Send Email</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
