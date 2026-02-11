"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface WhoFieldProps {
  value: string
  onChange: (value: string) => void
  users: string[]
  onAddUser: (user: string) => void
}

export function WhoField({ value, onChange, users, onAddUser }: WhoFieldProps) {
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [newUserName, setNewUserName] = useState("")

  const handleAddUser = () => {
    const trimmed = newUserName.trim()
    if (trimmed && !users.includes(trimmed)) {
      onAddUser(trimmed)
      onChange(trimmed)
      setNewUserName("")
      setIsAddingUser(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="w-full h-6 p-1 justify-start text-left font-normal inline-flex items-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <User className="mr-1 h-3 w-3 flex-shrink-0" />
            <span className="truncate">{value || "Unassigned"}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48" sideOffset={5}>
          <DropdownMenuItem onClick={() => onChange("")}>
            <span className="text-muted-foreground italic">Unassigned</span>
          </DropdownMenuItem>
          {users.length > 0 && <DropdownMenuSeparator />}
          {users.map((user) => (
            <DropdownMenuItem key={user} onClick={() => onChange(user)}>
              <User className="mr-2 h-4 w-4" />
              {user}
            </DropdownMenuItem>
          ))}
          {users.length > 0 && <DropdownMenuSeparator />}
          <DropdownMenuItem onClick={() => setIsAddingUser(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-user-name">User Name</Label>
              <Input
                id="new-user-name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddUser()
                  }
                }}
                placeholder="Enter user name"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingUser(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser} disabled={!newUserName.trim()}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
