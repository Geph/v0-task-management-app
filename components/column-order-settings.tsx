"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { GripVertical, Eye, EyeOff } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ColumnConfig {
  id: string
  label: string
  description: string
  visible: boolean
  fixed?: boolean // For columns that can't be reordered
}

interface ColumnOrderSettingsProps {
  columnVisibility: {
    progress: boolean
    due: boolean
    who: boolean
  }
  columnOrder: string[]
  onUpdateColumnVisibility: (visibility: { progress: boolean; due: boolean; who: boolean }) => void
  onUpdateColumnOrder: (order: string[]) => void
}

export function ColumnOrderSettings({
  columnVisibility,
  columnOrder,
  onUpdateColumnVisibility,
  onUpdateColumnOrder,
}: ColumnOrderSettingsProps) {
  const [columns, setColumns] = useState<ColumnConfig[]>([])

  useEffect(() => {
    // Initialize columns based on current order and visibility
    const defaultColumns = [
      { id: "attachments", label: "Attachments", description: "File attachments", visible: true },
      { id: "status", label: "Status", description: "Task status dropdown", visible: true },
      { id: "priority", label: "Priority", description: "Task priority dropdown", visible: true },
      { id: "progress", label: "Progress", description: "Progress bar (0-100%)", visible: columnVisibility.progress },
      { id: "due", label: "Due Date", description: "Task due date picker", visible: columnVisibility.due },
      { id: "who", label: "Assigned To", description: "Person assigned to task", visible: columnVisibility.who },
    ]

    // Sort columns based on the current order
    const orderedColumns =
      columnOrder.length > 0
        ? (columnOrder.map((id) => defaultColumns.find((col) => col.id === id)).filter(Boolean) as ColumnConfig[])
        : defaultColumns

    setColumns(orderedColumns)
  }, [columnOrder, columnVisibility])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(columns)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setColumns(items)
    onUpdateColumnOrder(items.map((col) => col.id))
  }

  const handleVisibilityChange = (columnId: string, visible: boolean) => {
    setColumns(columns.map((col) => (col.id === columnId ? { ...col, visible } : col)))

    // Update the parent component's column visibility state
    if (columnId === "progress") {
      onUpdateColumnVisibility({ ...columnVisibility, progress: visible })
    } else if (columnId === "due") {
      onUpdateColumnVisibility({ ...columnVisibility, due: visible })
    } else if (columnId === "who") {
      onUpdateColumnVisibility({ ...columnVisibility, who: visible })
    }
  }

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded">
        <h3 className="font-medium mb-4">Column Visibility & Order</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Toggle column visibility and drag to reorder columns. Checkbox, emoji, name, and actions columns are always
          visible and cannot be reordered.
        </p>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="columns">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {columns.map((column, index) => (
                  <Draggable key={column.id} draggableId={column.id} index={index} isDragDisabled={column.fixed}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center justify-between p-3 border rounded ${
                          snapshot.isDragging ? "bg-muted" : "bg-background"
                        } ${column.fixed ? "opacity-75" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            {...provided.dragHandleProps}
                            className={`${column.fixed ? "cursor-not-allowed opacity-50" : "cursor-grab"}`}
                          >
                            <GripVertical className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="flex items-center gap-2">
                            {column.visible ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-muted-foreground" />
                            )}
                            <div>
                              <Label className="font-medium">{column.label}</Label>
                              <p className="text-xs text-muted-foreground">{column.description}</p>
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={column.visible}
                          onCheckedChange={(checked) => handleVisibilityChange(column.id, checked)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}
