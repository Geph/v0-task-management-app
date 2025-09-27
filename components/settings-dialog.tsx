"use client"

import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings, Upload, Download, Lock, RotateCcw } from "lucide-react"
import { ExportImportDialog } from "@/components/export-import-dialog"
import { ColumnOrderSettings } from "@/components/column-order-settings"
import { ThemeSettings } from "@/components/theme-settings"

interface ColumnVisibility {
  attachments: boolean
  status: boolean
  priority: boolean
  progress: boolean
  due: boolean
  who: boolean
}

interface SettingsDialogProps {
  children: React.ReactNode
  appName: string
  appIcon: string
  hasPIN: boolean
  onUpdateAppName: (name: string) => void
  onUpdateAppIcon: (icon: string) => void
  onSetPIN: (pin: string) => void
  onRemovePIN: () => void
  sections: any[]
  statusOptions: any[]
  priorityOptions: any[]
  onImport: (data: any) => void
  columnVisibility: ColumnVisibility
  onUpdateColumnVisibility: (visibility: ColumnVisibility) => void
  columnOrder: string[]
  onUpdateColumnOrder: (order: string[]) => void
}

export function SettingsDialog({
  children,
  appName,
  appIcon,
  hasPIN,
  onUpdateAppName,
  onUpdateAppIcon,
  onSetPIN,
  onRemovePIN,
  sections,
  statusOptions,
  priorityOptions,
  onImport,
  columnVisibility,
  onUpdateColumnVisibility,
  columnOrder,
  onUpdateColumnOrder,
}: SettingsDialogProps) {
  const [open, setOpen] = useState(false)
  const [tempAppName, setTempAppName] = useState(appName)
  const [newPIN, setNewPIN] = useState("")
  const [confirmPIN, setConfirmPIN] = useState("")

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 1024 * 1024) {
        // 1MB limit
        alert("File size must be under 1MB")
        return
      }

      if (!file.type.includes("png") && !file.type.includes("svg")) {
        alert("Only PNG and SVG files are supported")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onUpdateAppIcon(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSetPIN = () => {
    if (newPIN.length !== 4 || !/^\d{4}$/.test(newPIN)) {
      alert("PIN must be exactly 4 digits")
      return
    }

    if (newPIN !== confirmPIN) {
      alert("PINs do not match")
      return
    }

    onSetPIN(newPIN)
    setNewPIN("")
    setConfirmPIN("")
    alert("PIN set successfully")
  }

  const handleSaveSettings = () => {
    onUpdateAppName(tempAppName)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Configure your app settings including appearance, columns, security, and data management.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="columns">Columns</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app-name">App Name</Label>
              <Input
                id="app-name"
                value={tempAppName}
                onChange={(e) => setTempAppName(e.target.value)}
                placeholder="Enter app name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="app-icon">App Icon (PNG/SVG, max 1MB)</Label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 border rounded flex items-center justify-center bg-muted">
                  {appIcon ? (
                    <img src={appIcon || "/placeholder.svg"} alt="App icon" className="w-8 h-8 object-contain" />
                  ) : (
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <Input id="app-icon" type="file" accept=".png,.svg" onChange={handleIconUpload} className="flex-1" />
              </div>
            </div>

            <ThemeSettings />
          </TabsContent>

          <TabsContent value="columns" className="space-y-4">
            <ColumnOrderSettings
              columnVisibility={columnVisibility}
              columnOrder={columnOrder}
              onUpdateColumnVisibility={onUpdateColumnVisibility}
              onUpdateColumnOrder={onUpdateColumnOrder}
            />
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded">
                <div>
                  <h3 className="font-medium">4-Digit PIN</h3>
                  <p className="text-sm text-muted-foreground">{hasPIN ? "PIN is currently set" : "No PIN set"}</p>
                </div>
                {hasPIN ? (
                  <Button variant="outline" onClick={onRemovePIN}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Remove PIN
                  </Button>
                ) : null}
              </div>

              {!hasPIN && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="new-pin">New PIN (4 digits)</Label>
                      <Input
                        id="new-pin"
                        type="password"
                        maxLength={4}
                        value={newPIN}
                        onChange={(e) => setNewPIN(e.target.value.replace(/\D/g, ""))}
                        placeholder="0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-pin">Confirm PIN</Label>
                      <Input
                        id="confirm-pin"
                        type="password"
                        maxLength={4}
                        value={confirmPIN}
                        onChange={(e) => setConfirmPIN(e.target.value.replace(/\D/g, ""))}
                        placeholder="0000"
                      />
                    </div>
                  </div>
                  <Button onClick={handleSetPIN} className="w-full">
                    <Lock className="w-4 h-4 mr-2" />
                    Set PIN
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded">
                <h3 className="font-medium mb-2">Export/Import Configuration</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Export your sections, status options, and priority options to share or backup your configuration.
                </p>
                <ExportImportDialog
                  sections={sections}
                  statusOptions={statusOptions}
                  priorityOptions={priorityOptions}
                  onImport={onImport}
                >
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export/Import Data
                  </Button>
                </ExportImportDialog>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
