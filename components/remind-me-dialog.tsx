"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface RemindMeDialogProps {
  children: React.ReactNode
  taskName: string
  onSetReminder: (email: string, date: string, time: string, message: string) => void
}

export function RemindMeDialog({ children, taskName, onSetReminder }: RemindMeDialogProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [message, setMessage] = useState(`Reminder: ${taskName}`)

  const handleSetReminder = () => {
    if (email && date && time && message) {
      onSetReminder(email, date, time, message)
      setOpen(false)
      setEmail("")
      setDate("")
      setTime("")
      setMessage("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Reminder</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="reminder-email">Email Address</Label>
            <Input
              id="reminder-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="reminder-date">Date</Label>
              <Input id="reminder-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="reminder-time">Time</Label>
              <Input id="reminder-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          <div>
            <Label htmlFor="reminder-message">Reminder Message</Label>
            <Textarea
              id="reminder-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Reminder message"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSetReminder}>Set Reminder</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
