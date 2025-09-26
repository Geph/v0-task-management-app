"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Download, Upload } from "lucide-react"

interface ExportImportDialogProps {
  sections: Array<{ id: string; name: string }>
  statusOptions: Array<{ key: string; label: string; color: string }>
  priorityOptions: Array<{ key: string; label: string; color: string }>
  onImport: (data: {
    sections: Array<{ id: string; name: string }>
    statusOptions: Array<{ key: string; label: string; color: string }>
    priorityOptions: Array<{ key: string; label: string; color: string }>
  }) => void
  children: React.ReactNode
}

export function ExportImportDialog({
  sections,
  statusOptions,
  priorityOptions,
  onImport,
  children,
}: ExportImportDialogProps) {
  const [importData, setImportData] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [importUrl, setImportUrl] = useState("")
  const [isLoadingUrl, setIsLoadingUrl] = useState(false)

  const exportData = () => {
    const data = {
      sections: sections.map((section, index) => ({
        id: section.id,
        name: section.name,
        order: index,
      })),
      statusOptions: statusOptions.map((option, index) => ({
        key: option.key,
        label: option.label,
        color: option.color,
        order: index,
      })),
      priorityOptions: priorityOptions.map((option, index) => ({
        key: option.key,
        label: option.label,
        color: option.color,
        order: index,
      })),
      exportDate: new Date().toISOString(),
      version: "1.0",
    }

    const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<taskManagementConfig version="1.0" exportDate="${data.exportDate}">
  <sections>
    ${data.sections
      .map((section) => `    <section id="${section.id}" name="${section.name}" order="${section.order}" />`)
      .join("\n")}
  </sections>
  <statusOptions>
    ${data.statusOptions
      .map(
        (option) =>
          `    <status key="${option.key}" label="${option.label}" color="${option.color}" order="${option.order}" />`,
      )
      .join("\n")}
  </statusOptions>
  <priorityOptions>
    ${data.priorityOptions
      .map(
        (option) =>
          `    <priority key="${option.key}" label="${option.label}" color="${option.color}" order="${option.order}" />`,
      )
      .join("\n")}
  </priorityOptions>
</taskManagementConfig>`

    const blob = new Blob([xmlData], { type: "application/xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `task-management-config-${new Date().toISOString().split("T")[0]}.xml`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleUrlImport = async () => {
    if (!importUrl.trim()) {
      alert("Please enter a valid URL")
      return
    }

    setIsLoadingUrl(true)
    try {
      const response = await fetch(importUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.text()
      setImportData(data)
      setImportUrl("")
      alert("Data loaded from URL successfully. Review and click Import Configuration to apply.")
    } catch (error) {
      alert(`Error loading data from URL: ${error.message}`)
    } finally {
      setIsLoadingUrl(false)
    }
  }

  const handleImport = () => {
    try {
      // Parse XML data (simplified parser for our specific format)
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(importData, "application/xml")

      const sections = Array.from(xmlDoc.querySelectorAll("section")).map((section) => ({
        id: section.getAttribute("id") || "",
        name: section.getAttribute("name") || "",
      }))

      const statusOptions = Array.from(xmlDoc.querySelectorAll("status")).map((status) => ({
        key: status.getAttribute("key") || "",
        label: status.getAttribute("label") || "",
        color: status.getAttribute("color") || "",
      }))

      const priorityOptions = Array.from(xmlDoc.querySelectorAll("priority")).map((priority) => ({
        key: priority.getAttribute("key") || "",
        label: priority.getAttribute("label") || "",
        color: priority.getAttribute("color") || "",
      }))

      onImport({ sections, statusOptions, priorityOptions })
      setImportData("")
      setIsOpen(false)
    } catch (error) {
      alert("Error parsing import data. Please check the format.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export / Import Configuration</DialogTitle>
          <DialogDescription>
            Export your current configuration to share with others or import a configuration from XML data or URL.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Export Current Configuration</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Download your current sections, status options, and priority options as an XML file.
            </p>
            <Button onClick={exportData} className="gap-2">
              <Download className="w-4 h-4" />
              Export to XML
            </Button>
          </div>

          <div className="border-t pt-6">
            <Label htmlFor="import-data" className="text-base font-medium">
              Import Configuration
            </Label>
            <p className="text-sm text-muted-foreground mb-3">
              Import configuration from a URL or paste XML data directly.
            </p>

            <div className="space-y-3 mb-4">
              <Label htmlFor="import-url">Import from URL</Label>
              <div className="flex gap-2">
                <Input
                  id="import-url"
                  placeholder="https://example.com/config.xml"
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleUrlImport} disabled={!importUrl.trim() || isLoadingUrl} variant="outline">
                  {isLoadingUrl ? "Loading..." : "Load"}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="import-data">Or paste XML data</Label>
              <Textarea
                id="import-data"
                placeholder="Paste XML configuration data here..."
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            <div className="flex gap-2 mt-3">
              <Button onClick={handleImport} disabled={!importData.trim()} className="gap-2">
                <Upload className="w-4 h-4" />
                Import Configuration
              </Button>
              <Button variant="outline" onClick={() => setImportData("")}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
