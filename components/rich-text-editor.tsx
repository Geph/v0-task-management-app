"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bold, Italic, Link, Strikethrough, Code, Quote, Eraser, List, ListOrdered } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [fontSize, setFontSize] = useState("16px")

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.tagName === "A") {
      e.preventDefault()
      const href = target.getAttribute("href")
      if (href) {
        window.open(href, "_blank", "noopener,noreferrer")
      }
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value?: string) => {
    // Ensure the editor has focus before executing command
    if (editorRef.current) {
      editorRef.current.focus()
    }

    // Execute the command
    document.execCommand(command, false, value)

    // Trigger input event to save changes
    setTimeout(() => {
      handleInput()
    }, 10)
  }

  const insertLink = () => {
    const url = prompt("Enter URL (e.g., https://example.com):")
    if (url) {
      // Add https:// if no protocol is specified
      const formattedUrl = url.match(/^https?:\/\//) ? url : `https://${url}`
      execCommand("createLink", formattedUrl)
    }
  }

  const handleFontChange = (fontFamily: string) => {
    execCommand("fontName", fontFamily)
  }

  const handleFontSizeChange = (size: string) => {
    setFontSize(size)
    execCommand("fontSize", "7") // Use a base size
    // Then apply the size with inline style
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const span = document.createElement("span")
      span.style.fontSize = size
      range.surroundContents(span)
      handleInput()
    }
  }

  const formatAsCode = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = range.toString()

      if (selectedText) {
        const codeElement = document.createElement("code")
        codeElement.textContent = selectedText
        codeElement.style.backgroundColor = "#f3f4f6"
        codeElement.style.padding = "4px 6px"
        codeElement.style.borderRadius = "4px"
        codeElement.style.fontFamily = "monospace"
        codeElement.style.fontSize = "0.9em"

        range.deleteContents()
        range.insertNode(codeElement)

        // Clear selection
        selection.removeAllRanges()
        editorRef.current?.focus()
        handleInput()
      }
    }
  }

  const formatAsQuote = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = range.toString()

      if (selectedText) {
        const quoteElement = document.createElement("blockquote")
        quoteElement.textContent = selectedText
        quoteElement.style.borderLeft = "4px solid #d1d5db"
        quoteElement.style.paddingLeft = "16px"
        quoteElement.style.margin = "8px 0"
        quoteElement.style.fontStyle = "italic"
        quoteElement.style.color = "#6b7280"

        range.deleteContents()
        range.insertNode(quoteElement)

        // Clear selection
        selection.removeAllRanges()
        editorRef.current?.focus()
        handleInput()
      }
    }
  }

  const clearFormatting = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = range.toString()

      if (selectedText) {
        // Create a plain text node
        const textNode = document.createTextNode(selectedText)
        range.deleteContents()
        range.insertNode(textNode)

        // Clear selection
        selection.removeAllRanges()
        editorRef.current?.focus()
        handleInput()
      }
    }
  }

  return (
    <div className={`border border-border rounded-md ${className}`}>
      <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/50 flex-wrap">
        <Select onValueChange={handleFontChange}>
          <SelectTrigger className="w-32 h-8">
            <SelectValue placeholder="Font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Helvetica">Helvetica</SelectItem>
            <SelectItem value="Times New Roman">Times</SelectItem>
            <SelectItem value="Georgia">Georgia</SelectItem>
            <SelectItem value="Verdana">Verdana</SelectItem>
            <SelectItem value="Courier New">Courier</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={handleFontSizeChange} defaultValue="16px">
          <SelectTrigger className="w-20 h-8">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12px">12</SelectItem>
            <SelectItem value="14px">14</SelectItem>
            <SelectItem value="16px">16</SelectItem>
            <SelectItem value="18px">18</SelectItem>
            <SelectItem value="20px">20</SelectItem>
            <SelectItem value="24px">24</SelectItem>
            <SelectItem value="28px">28</SelectItem>
            <SelectItem value="32px">32</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-px h-6 bg-border mx-1" />

        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("bold")} className="h-8 w-8 p-0">
          <Bold className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("italic")} className="h-8 w-8 p-0">
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("strikeThrough")}
          className="h-8 w-8 p-0"
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={formatAsCode} className="h-8 w-8 p-0">
          <Code className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={formatAsQuote} className="h-8 w-8 p-0">
          <Quote className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertUnorderedList")}
          className="h-8 w-8 p-0"
          title="Bulleted list"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => execCommand("insertOrderedList")}
          className="h-8 w-8 p-0"
          title="Numbered list"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearFormatting}
          className="h-8 w-8 p-0"
          title="Clear formatting"
        >
          <Eraser className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button type="button" variant="ghost" size="sm" onClick={insertLink} className="h-8 w-8 p-0">
          <Link className="w-4 h-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onClick={handleClick}
        className="p-3 min-h-[120px] focus:outline-none prose prose-sm max-w-none"
        style={{ wordWrap: "break-word" }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        /* Added styles for links to make them visible and clickable */
        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }
        [contenteditable] a:hover {
          color: #2563eb;
          text-decoration: underline;
        }
        /* Added list styling */
        [contenteditable] ul {
          list-style-type: disc;
          margin-left: 20px;
          padding-left: 10px;
        }
        [contenteditable] ol {
          list-style-type: decimal;
          margin-left: 20px;
          padding-left: 10px;
        }
        [contenteditable] li {
          margin: 4px 0;
        }
      `}</style>
    </div>
  )
}
