"use client"

import type React from "react"

import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Search,
  Plus,
  ArrowUpDown,
  Trash2,
  FolderOpen,
  CheckCircle,
  Edit,
  Copy,
  Merge,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useRef, useEffect } from "react"
import { StatusDropdown, type StatusType } from "@/components/status-dropdown"
import { PriorityDropdown, type PriorityType } from "@/components/priority-dropdown"
import { SectionRenameDialog } from "@/components/section-rename-dialog"
import { MoveToSectionDialog } from "@/components/move-to-section-dialog"
import { TaskDetailsDialog } from "@/components/task-details-dialog"
import { AddSectionDialog } from "@/components/add-section-dialog"
import { RemoveSectionDialog } from "@/components/remove-section-dialog"
import { RocketIcon } from "@/components/rocket-icon"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MergeTasksDialog } from "@/components/merge-tasks-dialog"
import { EmojiPicker } from "@/components/enhanced-emoji-picker" // Updated import
import { FileAttachmentComponent } from "@/components/file-attachment"
import { SettingsDialog } from "@/components/settings-dialog" // Added import
import { ProgressBar } from "@/components/progress-bar"
import { DueDatePicker } from "@/components/due-date-picker"
import { WhoField } from "@/components/who-field"

interface Task {
  id: string
  name: string
  status: StatusType
  priority: PriorityType
  completed: boolean
  notes: string
  emoji: string
  attachments: any[]
  progress: number
  dueDate: Date | null
  assignedTo: string
}

interface TaskSection {
  id: string
  name: string
  tasks: Task[]
  expanded: boolean
}

type SortField = "name" | "status" | "priority"
type SortDirection = "asc" | "desc"

interface ColumnVisibility {
  attachments: boolean // Added attachments visibility
  status: boolean // Added status visibility
  priority: boolean // Added priority visibility
  progress: boolean
  due: boolean
  who: boolean
}

export function TaskList() {
  const [statusOptions, setStatusOptions] = useState([
    { key: "ongoing", label: "On-going", color: "#81b1ff" },
    { key: "waiting", label: "Waiting / review", color: "#06b6d4" },
    { key: "not-yet", label: "Not yet", color: "#b5bcc2" },
    { key: "working", label: "Working on it", color: "#f9d900" },
    { key: "delegated", label: "Delegated", color: "#af7e2e" },
    { key: "paused", label: "Paused", color: "#6b7280" },
    { key: "stuck", label: "Stuck", color: "#ec4899" },
    { key: "someday", label: "Someday", color: "#1bbc9c" },
  ])

  const [priorityOptions, setPriorityOptions] = useState([
    { key: "high", label: "High", color: "#ef4444" },
    { key: "medium", label: "Medium", color: "#ff7800" },
    { key: "low", label: "Low", color: "#3082b7" },
    { key: "someday", label: "Someday", color: "#1bbc9c" },
  ])

  const [sections, setSections] = useState<TaskSection[]>([
    {
      id: "research",
      name: "RESEARCH+EDUCATION",
      expanded: true,
      tasks: [
        {
          id: "1",
          name: "QRF/WHIMC",
          status: "ongoing",
          priority: "medium",
          completed: false,
          notes: "",
          emoji: "🚀",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "2",
          name: "Call Adam, confirm Nina/Versant",
          status: "waiting",
          priority: "high",
          completed: false,
          notes: "",
          emoji: "📞",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "3",
          name: "Confirm Amanda Block Choices",
          status: "not-yet",
          priority: "high",
          completed: false,
          notes: "",
          emoji: "✅",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "4",
          name: "Update WHIMC website for continued play, downloads, server and ML-API on Github, update methods section, QRF section, WHIMC platform usefulness, Mars setup page",
          status: "working",
          priority: "medium",
          completed: false,
          notes: "",
          emoji: "🌐",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "5",
          name: "Email past/present camp parents",
          status: "not-yet",
          priority: "medium",
          completed: false,
          notes: "",
          emoji: "✉️",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "6",
          name: "Return some findings back to UNCC, WCA",
          status: "working",
          priority: "medium",
          completed: false,
          notes: "",
          emoji: "📊",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "7",
          name: "WHIMC website redirect problems",
          status: "not-yet",
          priority: "low",
          completed: false,
          notes: "",
          emoji: "⚠️",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "8",
          name: "Maryville post-camp",
          status: "delegated",
          priority: "low",
          completed: false,
          notes: "",
          emoji: "🧑‍🏫",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "9",
          name: "Update server documentation",
          status: "working",
          priority: "low",
          completed: false,
          notes: "",
          emoji: "📚",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "10",
          name: "Update WHIMC plugins to use new holograms",
          status: "waiting",
          priority: "someday",
          completed: false,
          notes: "",
          emoji: "✨",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "11",
          name: "Redo Two Moons geography",
          status: "not-yet",
          priority: "someday",
          completed: false,
          notes: "",
          emoji: "🗺️",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "12",
          name: "Region naming conventions (POI)",
          status: "not-yet",
          priority: "someday",
          completed: false,
          notes: "",
          emoji: "📍",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "13",
          name: "Fix/replace Image To Map",
          status: "stuck",
          priority: "someday",
          completed: false,
          notes: "",
          emoji: "🛠️",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "14",
          name: "Update to 1.21.x",
          status: "working",
          priority: "someday",
          completed: false,
          notes: "",
          emoji: "⬆️",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
      ],
    },
    {
      id: "invite",
      name: "INVITE / Barrelbot",
      expanded: true,
      tasks: [
        {
          id: "15",
          name: "Update Readme, add Github to website",
          status: "working",
          priority: "low",
          completed: false,
          notes: "",
          emoji: "📄",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "16",
          name: "Dedicated server (version update; Github)",
          status: "stuck",
          priority: "low",
          completed: false,
          notes: "",
          emoji: "💻",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "17",
          name: "New player lane template w/new loop and conditional blocks, more practice puzzles, fix holes and roof on final open-build puzzle, black box spawn region as adventure mode",
          status: "not-yet",
          priority: "someday",
          completed: false,
          notes: "",
          emoji: "🎮",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
        {
          id: "18",
          name: "Update showcase video",
          status: "not-yet",
          priority: "someday",
          completed: false,
          notes: "",
          emoji: "🎬",
          attachments: [],
          progress: 0,
          dueDate: null,
          assignedTo: "",
        },
      ],
    },
  ])

  const [completedTasks, setCompletedTasks] = useState<Task[]>([])
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState("")

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  const [appName, setAppName] = useState("Geph's Task Management")
  const [appIcon, setAppIcon] = useState("")
  const [hasPIN, setHasPIN] = useState(false)
  const [userPIN, setUserPIN] = useState("")
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    attachments: true, // Added default visibility for attachments
    status: true, // Added default visibility for status
    priority: true, // Added default visibility for priority
    progress: false,
    due: false,
    who: false,
  })
  const [columnOrder, setColumnOrder] = useState<string[]>([
    "attachments",
    "status",
    "priority",
    "progress",
    "due",
    "who",
  ])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAppName = localStorage.getItem("appName")
      const storedAppIcon = localStorage.getItem("appIcon")
      const storedUserPIN = localStorage.getItem("userPIN")
      const storedColumnVisibility = localStorage.getItem("columnVisibility")
      const storedColumnOrder = localStorage.getItem("columnOrder")

      if (storedAppName) setAppName(storedAppName)
      if (storedAppIcon) setAppIcon(storedAppIcon)
      if (storedUserPIN) {
        setUserPIN(storedUserPIN)
        setHasPIN(true)
      }
      if (storedColumnVisibility) {
        setColumnVisibility(JSON.parse(storedColumnVisibility))
      }
      if (storedColumnOrder) {
        setColumnOrder(JSON.parse(storedColumnOrder))
      }
    }
  }, [])

  const calculateColumnWidths = () => {
    const baseColumns = {
      checkbox: 4,
      emoji: 4,
      name: 30,
      actions: 4,
    }

    const dynamicColumns: Record<string, number> = {}

    columnOrder.forEach((columnId) => {
      switch (columnId) {
        case "attachments":
          if (columnVisibility.attachments) dynamicColumns.attachments = 6
          break
        case "status":
          if (columnVisibility.status) dynamicColumns.status = 15
          break
        case "priority":
          if (columnVisibility.priority) dynamicColumns.priority = 15
          break
        case "progress":
          if (columnVisibility.progress) dynamicColumns.progress = 15
          break
        case "due":
          if (columnVisibility.due) dynamicColumns.due = 10
          break
        case "who":
          if (columnVisibility.who) dynamicColumns.who = 12
          break
      }
    })

    const allColumns = { ...baseColumns, ...dynamicColumns }
    const totalVisible = Object.values(allColumns).reduce((sum, width) => sum + width, 0)
    const scale = 100 / totalVisible

    return Object.fromEntries(Object.entries(allColumns).map(([key, width]) => [key, width * scale]))
  }

  const [columnWidths, setColumnWidths] = useState(calculateColumnWidths())
  const [isResizing, setIsResizing] = useState<string | null>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (column: string, e: React.MouseEvent) => {
    setIsResizing(column)
    e.preventDefault()
  }

  const handleSort = (field: SortField) => {
    setSortField(field)
    setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"))
  }

  const sortTasks = (tasks: Task[]) => {
    return [...tasks].sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortField) {
        case "name":
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case "status":
          aValue = a.status
          bValue = b.status
          break
        case "priority":
          // Define priority order
          const priorityOrder = { high: 3, medium: 2, low: 1, someday: 0, blank: -1 }
          aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0
          bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !tableRef.current) return

      const tableRect = tableRef.current.getBoundingClientRect()
      const mouseX = e.clientX - tableRect.left
      const tableWidth = tableRect.width
      const percentage = (mouseX / tableWidth) * 100

      if (isResizing === "name") {
        const newNameWidth = Math.max(20, Math.min(60, percentage - columnWidths.checkbox - columnWidths.emoji))
        const remaining =
          100 -
          newNameWidth -
          columnWidths.checkbox -
          columnWidths.emoji -
          columnWidths.attachments -
          columnWidths.actions
        const statusWidth = (columnWidths.status / (columnWidths.status + columnWidths.priority)) * remaining
        const priorityWidth = remaining - statusWidth

        setColumnWidths({
          ...columnWidths,
          name: newNameWidth,
          status: statusWidth,
          priority: priorityWidth,
        })
      } else if (isResizing === "status") {
        const nameAndFixed =
          columnWidths.checkbox +
          columnWidths.emoji +
          columnWidths.name +
          columnWidths.attachments +
          columnWidths.actions
        const available = 100 - nameAndFixed
        const newStatusWidth = Math.max(
          10,
          Math.min(available - 10, percentage - (columnWidths.checkbox + columnWidths.emoji + columnWidths.name)),
        )
        const newPriorityWidth = available - newStatusWidth

        setColumnWidths({
          ...columnWidths,
          status: newStatusWidth,
          priority: newPriorityWidth,
        })
      } else if (isResizing === "priority") {
        const fixedColumns = columnWidths.checkbox + columnWidths.emoji + columnWidths.name + columnWidths.status
        const available = 100 - fixedColumns
        const newPriorityWidth = Math.max(10, Math.min(available - 16, percentage - fixedColumns)) // 16 for attachments + actions minimum
        const remaining = available - newPriorityWidth
        const newAttachmentsWidth = Math.min(10, remaining / 2)
        const newActionsWidth = remaining - newAttachmentsWidth

        setColumnWidths({
          ...columnWidths,
          priority: newPriorityWidth,
          attachments: Math.max(6, newAttachmentsWidth),
          actions: Math.max(4, newActionsWidth),
        })
      } else if (isResizing === "attachments") {
        const fixedColumns =
          columnWidths.checkbox + columnWidths.emoji + columnWidths.name + columnWidths.status + columnWidths.priority
        const available = 100 - fixedColumns
        const newAttachmentsWidth = Math.max(6, Math.min(available - 6, percentage - fixedColumns))
        const newActionsWidth = available - newAttachmentsWidth

        setColumnWidths({
          ...columnWidths,
          attachments: newAttachmentsWidth,
          actions: Math.max(4, newActionsWidth),
        })
      } else if (isResizing === "progress") {
        const fixedColumns =
          columnWidths.checkbox +
          columnWidths.emoji +
          columnWidths.name +
          columnWidths.status +
          columnWidths.priority +
          columnWidths.attachments +
          columnWidths.actions
        const available = 100 - fixedColumns
        const newProgressWidth = Math.max(6, Math.min(available - 6, percentage - fixedColumns))
        const remaining = available - newProgressWidth
        const newDueWidth = Math.min(10, remaining / 2)
        const newWhoWidth = remaining - newDueWidth

        setColumnWidths({
          ...columnWidths,
          progress: newProgressWidth,
          due: Math.max(6, newDueWidth),
          who: Math.max(6, newWhoWidth),
        })
      } else if (isResizing === "due") {
        const fixedColumns =
          columnWidths.checkbox +
          columnWidths.emoji +
          columnWidths.name +
          columnWidths.status +
          columnWidths.priority +
          columnWidths.progress +
          columnWidths.attachments +
          columnWidths.actions
        const available = 100 - fixedColumns
        const newDueWidth = Math.max(6, Math.min(available - 6, percentage - fixedColumns))
        const newWhoWidth = available - newDueWidth

        setColumnWidths({
          ...columnWidths,
          due: newDueWidth,
          who: Math.max(6, newWhoWidth),
        })
      } else if (isResizing === "who") {
        const fixedColumns =
          columnWidths.checkbox +
          columnWidths.emoji +
          columnWidths.name +
          columnWidths.status +
          columnWidths.priority +
          columnWidths.progress +
          columnWidths.due +
          columnWidths.attachments +
          columnWidths.actions
        const available = 100 - fixedColumns
        const newWhoWidth = Math.max(6, Math.min(available - 6, percentage - fixedColumns))

        setColumnWidths({
          ...columnWidths,
          who: newWhoWidth,
        })
      }
    }

    const handleMouseUp = () => {
      setIsResizing(null)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, columnWidths])

  useEffect(() => {
    setColumnWidths(calculateColumnWidths())
  }, [columnVisibility, columnOrder])

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) => (section.id === sectionId ? { ...section, expanded: !section.expanded } : section)),
    )
  }

  const suggestEmoji = (taskName: string): string => {
    const name = taskName.toLowerCase()

    // Common task-related emojis based on keywords
    if (name.includes("call") || name.includes("phone")) return "📞"
    if (name.includes("email") || name.includes("mail")) return "✉️"
    if (name.includes("meeting") || name.includes("meet")) return "🤝"
    if (name.includes("research") || name.includes("study")) return "🔍"
    if (name.includes("write") || name.includes("document")) return "📝"
    if (name.includes("fix") || name.includes("bug") || name.includes("repair")) return "🛠️"
    if (name.includes("update") || name.includes("upgrade")) return "⬆️"
    if (name.includes("website") || name.includes("web")) return "🌐"
    if (name.includes("server") || name.includes("deploy")) return "💻"
    if (name.includes("design") || name.includes("ui")) return "🎨"
    if (name.includes("test") || name.includes("testing")) return "🧪"
    if (name.includes("plan") || name.includes("planning")) return "📋"
    if (name.includes("review") || name.includes("check")) return "👀"
    if (name.includes("data") || name.includes("database")) return "📊"
    if (name.includes("video") || name.includes("record")) return "🎬"
    if (name.includes("photo") || name.includes("image")) return "📸"
    if (name.includes("book") || name.includes("read")) return "📚"
    if (name.includes("travel") || name.includes("trip")) return "✈️"
    if (name.includes("money") || name.includes("payment")) return "💰"
    if (name.includes("security") || name.includes("secure")) return "🔒"
    if (name.includes("backup") || name.includes("save")) return "💾"
    if (name.includes("clean") || name.includes("organize")) return "🧹"
    if (name.includes("launch") || name.includes("start")) return "🚀"

    // Default emoji for new tasks
    return "📝"
  }

  const addTask = (sectionId: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      name: "New Task",
      status: "not-yet",
      priority: "blank",
      completed: false,
      notes: "",
      emoji: "",
      attachments: [],
      progress: 0,
      dueDate: null,
      assignedTo: "",
    }

    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, tasks: [...section.tasks, newTask] } : section,
      ),
    )

    setEditingTaskId(newTask.id)
  }

  const duplicateTask = (sectionId: string, taskId: string) => {
    const section = sections.find((s) => s.id === sectionId)
    const task = section?.tasks.find((t) => t.id === taskId)

    if (task) {
      const duplicatedTask: Task = {
        ...task,
        id: Date.now().toString(),
        name: `${task.name} (Copy)`,
        attachments: [], // Don't duplicate attachments
      }

      setSections(
        sections.map((section) =>
          section.id === sectionId ? { ...section, tasks: [...section.tasks, duplicatedTask] } : section,
        ),
      )
    }
  }

  const renameTask = (sectionId: string, taskId: string, newName: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) => {
                if (task.id === taskId) {
                  const updatedTask = { ...task, name: newName }
                  if (!task.emoji && newName.trim()) {
                    updatedTask.emoji = suggestEmoji(newName)
                  }
                  return updatedTask
                }
                return task
              }),
            }
          : section,
      ),
    )
    setEditingTaskId(null)
  }

  const updateTaskStatus = (sectionId: string, taskId: string, status: StatusType) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) => (task.id === taskId ? { ...task, status } : task)),
            }
          : section,
      ),
    )
  }

  const updateTaskPriority = (sectionId: string, taskId: string, priority: PriorityType) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) => (task.id === taskId ? { ...task, priority } : task)),
            }
          : section,
      ),
    )
  }

  const updateTaskNotes = (sectionId: string, taskId: string, notes: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) => (task.id === taskId ? { ...task, notes } : task)),
            }
          : section,
      ),
    )
  }

  const updateTaskProgress = (sectionId: string, taskId: string, progress: number) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) => (task.id === taskId ? { ...task, progress } : task)),
            }
          : section,
      ),
    )
  }

  const updateTaskDueDate = (sectionId: string, taskId: string, dueDate: Date | null) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) => (task.id === taskId ? { ...task, dueDate } : task)),
            }
          : section,
      ),
    )
  }

  const updateTaskAssignedTo = (sectionId: string, taskId: string, assignedTo: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) => (task.id === taskId ? { ...task, assignedTo } : task)),
            }
          : section,
      ),
    )
  }

  const toggleTaskSelection = (taskId: string) => {
    const newSelected = new Set(selectedTasks)
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId)
    } else {
      newSelected.add(taskId)
    }
    setSelectedTasks(newSelected)
  }

  const deleteSelectedTasks = () => {
    setSections(
      sections.map((section) => ({
        ...section,
        tasks: section.tasks.filter((task) => !selectedTasks.has(task.id)),
      })),
    )
    setSelectedTasks(new Set())
  }

  const moveSelectedTasks = (targetSectionId: string) => {
    const tasksToMove: Task[] = []

    sections.forEach((section) => {
      section.tasks.forEach((task) => {
        if (selectedTasks.has(task.id)) {
          tasksToMove.push(task)
        }
      })
    })

    setSections(
      sections.map((section) => {
        if (section.id === targetSectionId) {
          return {
            ...section,
            tasks: [...section.tasks, ...tasksToMove],
          }
        } else {
          return {
            ...section,
            tasks: section.tasks.filter((task) => !selectedTasks.has(task.id)),
          }
        }
      }),
    )
    setSelectedTasks(new Set())
  }

  const markSelectedAsCompleted = () => {
    const tasksToComplete: Task[] = []

    sections.forEach((section) => {
      section.tasks.forEach((task) => {
        if (selectedTasks.has(task.id)) {
          tasksToComplete.push({ ...task, completed: true })
        }
      })
    })

    setSections(
      sections.map((section) => ({
        ...section,
        tasks: section.tasks.filter((task) => !selectedTasks.has(task.id)),
      })),
    )

    setCompletedTasks([...completedTasks, ...tasksToComplete])
    setSelectedTasks(new Set())
  }

  const renameSection = (sectionId: string, newName: string) => {
    setSections(sections.map((section) => (section.id === sectionId ? { ...section, name: newName } : section)))
  }

  const removeSection = (sectionId: string, moveToSectionId?: string) => {
    const sectionToRemove = sections.find((s) => s.id === sectionId)
    if (!sectionToRemove) return

    if (moveToSectionId && sectionToRemove.tasks.length > 0) {
      setSections(
        sections
          .map((section) => {
            if (section.id === moveToSectionId) {
              return {
                ...section,
                tasks: [...section.tasks, ...sectionToRemove.tasks],
              }
            }
            return section
          })
          .filter((section) => section.id !== sectionId),
      )
    } else {
      setSections(sections.filter((section) => section.id !== sectionId))
    }
  }

  const addSection = (name: string) => {
    const newSection: TaskSection = {
      id: Date.now().toString(),
      name: name.toUpperCase(),
      tasks: [],
      expanded: true,
    }
    setSections([...sections, newSection])
  }

  const handleImport = (data: {
    sections: Array<{ id: string; name: string }>
    statusOptions: Array<{ key: string; label: string; color: string }>
    priorityOptions: Array<{ key: string; label: string; color: string }>
  }) => {
    setStatusOptions(data.statusOptions)
    setPriorityOptions(data.priorityOptions)
  }

  const mergeSelectedTasks = (newTaskName: string) => {
    const tasksToMerge: Task[] = []
    let targetSectionId = ""

    sections.forEach((section) => {
      section.tasks.forEach((task) => {
        if (selectedTasks.has(task.id)) {
          tasksToMerge.push(task)
          if (!targetSectionId) targetSectionId = section.id
        }
      })
    })

    if (tasksToMerge.length > 1) {
      const mergedTask: Task = {
        id: Date.now().toString(),
        name: newTaskName,
        status: tasksToMerge[0].status,
        priority: tasksToMerge[0].priority,
        completed: false,
        notes: tasksToMerge
          .map((t) => t.notes)
          .filter((n) => n)
          .join("\n\n"),
        emoji: tasksToMerge[0].emoji,
        attachments: tasksToMerge.flatMap((t) => t.attachments),
        progress: 0, // Default values for new fields
        dueDate: null,
        assignedTo: "",
      }

      setSections(
        sections.map((section) => {
          if (section.id === targetSectionId) {
            return {
              ...section,
              tasks: [...section.tasks.filter((task) => !selectedTasks.has(task.id)), mergedTask],
            }
          } else {
            return {
              ...section,
              tasks: section.tasks.filter((task) => !selectedTasks.has(task.id)),
            }
          }
        }),
      )
      setSelectedTasks(new Set())
    }
  }

  // Removed sendTaskEmail and setTaskReminder functions

  const updateTaskEmoji = (sectionId: string, taskId: string, emoji: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) => (task.id === taskId ? { ...task, emoji } : task)),
            }
          : section,
      ),
    )
  }

  const addTaskAttachment = (sectionId: string, taskId: string, file: File) => {
    const attachment = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }

    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) =>
                task.id === taskId ? { ...task, attachments: [...task.attachments, attachment] } : task,
              ),
            }
          : section,
      ),
    )
  }

  const removeTaskAttachment = (sectionId: string, taskId: string, attachmentId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, attachments: task.attachments.filter((a) => a.id !== attachmentId) }
                  : task,
              ),
            }
          : section,
      ),
    )
  }

  const handleUpdateAppName = (name: string) => {
    setAppName(name)
    if (typeof window !== "undefined") {
      localStorage.setItem("appName", name)
    }
  }

  const handleUpdateAppIcon = (icon: string) => {
    setAppIcon(icon)
    if (typeof window !== "undefined") {
      localStorage.setItem("appIcon", icon)
    }
  }

  const handleSetPIN = (pin: string) => {
    setUserPIN(pin)
    setHasPIN(true)
    if (typeof window !== "undefined") {
      localStorage.setItem("userPIN", pin)
      localStorage.removeItem("isAuthenticated") // Force re-authentication
    }
    alert("PIN set successfully. You will need to enter it on your next visit.")
  }

  const handleRemovePIN = () => {
    setUserPIN("")
    setHasPIN(false)
    if (typeof window !== "undefined") {
      localStorage.removeItem("userPIN")
      localStorage.removeItem("isAuthenticated")
    }
  }

  const handleUpdateColumnVisibility = (visibility: ColumnVisibility) => {
    setColumnVisibility(visibility)
    if (typeof window !== "undefined") {
      localStorage.setItem("columnVisibility", JSON.stringify(visibility))
    }
  }

  const handleUpdateColumnOrder = (order: string[]) => {
    setColumnOrder(order)
    if (typeof window !== "undefined") {
      localStorage.setItem("columnOrder", JSON.stringify(order))
    }
  }

  const renderTaskColumns = (task: Task, section: { id: string }) => {
    const columnComponents: Record<string, React.JSX.Element> = {
      attachments: columnVisibility.attachments ? ( // Added visibility check for attachments
        <div className="flex items-center" style={{ width: `${columnWidths.attachments}%` }}>
          <FileAttachmentComponent
            attachments={task.attachments}
            onAddAttachment={(file) => addTaskAttachment(section.id, task.id, file)}
            onRemoveAttachment={(attachmentId) => removeTaskAttachment(section.id, task.id, attachmentId)}
          />
        </div>
      ) : null,
      status: columnVisibility.status ? ( // Added visibility check for status
        <div className="flex items-stretch" style={{ width: `${columnWidths.status}%` }}>
          <div className="w-full">
            <StatusDropdown
              value={task.status}
              onChange={(status) => updateTaskStatus(section.id, task.id, status)}
              options={statusOptions}
              onUpdateOptions={setStatusOptions}
              fullWidth
            />
          </div>
        </div>
      ) : null,
      priority: columnVisibility.priority ? ( // Added visibility check for priority
        <div className="flex items-stretch" style={{ width: `${columnWidths.priority}%` }}>
          <div className="w-full">
            <PriorityDropdown
              value={task.priority}
              onChange={(priority) => updateTaskPriority(section.id, task.id, priority)}
              options={priorityOptions}
              onUpdateOptions={setPriorityOptions}
              fullWidth
            />
          </div>
        </div>
      ) : null,
      progress: columnVisibility.progress ? (
        <div className="flex items-center" style={{ width: `${columnWidths.progress}%` }}>
          <ProgressBar
            value={task.progress}
            onChange={(progress) => updateTaskProgress(section.id, task.id, progress)}
          />
        </div>
      ) : null,
      due: columnVisibility.due ? (
        <div className="flex items-center" style={{ width: `${columnWidths.due}%` }}>
          <DueDatePicker value={task.dueDate} onChange={(dueDate) => updateTaskDueDate(section.id, task.id, dueDate)} />
        </div>
      ) : null,
      who: columnVisibility.who ? (
        <div className="flex items-center" style={{ width: `${columnWidths.who}%` }}>
          <WhoField
            value={task.assignedTo}
            onChange={(assignedTo) => updateTaskAssignedTo(section.id, task.id, assignedTo)}
          />
        </div>
      ) : null,
    }

    return columnOrder.map((columnId) => columnComponents[columnId]).filter(Boolean)
  }

  const renderColumnHeaders = () => {
    const headerComponents: Record<string, React.JSX.Element> = {
      attachments: columnVisibility.attachments ? ( // Added visibility check for attachments header
        <div
          className="flex items-center justify-center gap-1 relative"
          style={{ width: `${columnWidths.attachments}%` }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
          <div
            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500"
            onMouseDown={(e) => handleMouseDown("attachments", e)}
          />
        </div>
      ) : null,
      status: columnVisibility.status ? ( // Added visibility check for status header
        <div
          className="flex items-center justify-center gap-1 cursor-pointer relative"
          style={{ width: `${columnWidths.status}%` }}
          onClick={() => handleSort("status")}
        >
          Status
          <ArrowUpDown className="w-3 h-3" />
          <div
            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500"
            onMouseDown={(e) => handleMouseDown("status", e)}
          />
        </div>
      ) : null,
      priority: columnVisibility.priority ? ( // Added visibility check for priority header
        <div
          className="flex items-center justify-center gap-1 cursor-pointer relative"
          style={{ width: `${columnWidths.priority}%` }}
          onClick={() => handleSort("priority")}
        >
          Priority
          <ArrowUpDown className="w-3 h-3" />
          <div
            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500"
            onMouseDown={(e) => handleMouseDown("priority", e)}
          />
        </div>
      ) : null,
      progress: columnVisibility.progress ? (
        <div className="flex items-center justify-center gap-1 relative" style={{ width: `${columnWidths.progress}%` }}>
          Progress
          <div
            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500"
            onMouseDown={(e) => handleMouseDown("progress", e)}
          />
        </div>
      ) : null,
      due: columnVisibility.due ? (
        <div className="flex items-center justify-center gap-1 relative" style={{ width: `${columnWidths.due}%` }}>
          Due
          <div
            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500"
            onMouseDown={(e) => handleMouseDown("due", e)}
          />
        </div>
      ) : null,
      who: columnVisibility.who ? (
        <div className="flex items-center justify-center gap-1 relative" style={{ width: `${columnWidths.who}%` }}>
          Who
          <div
            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500"
            onMouseDown={(e) => handleMouseDown("who", e)}
          />
        </div>
      ) : null,
    }

    return columnOrder.map((columnId) => headerComponents[columnId]).filter(Boolean)
  }

  return (
    <div className="flex-1 bg-background">
      <div className="border-b border-border p-6 bg-purple-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {appIcon ? (
              <img src={appIcon || "/placeholder.svg"} alt="App icon" className="w-8 h-8 object-contain" />
            ) : (
              <RocketIcon className="w-8 h-8 text-white" />
            )}
            <h1 className="text-2xl font-semibold text-white">{appName}</h1>
          </div>
          <div className="flex items-center gap-3">
            <AddSectionDialog onAddSection={addSection}>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white hover:text-purple-900 transition-colors cursor-pointer"
                onClick={() => console.log("[v0] Add section button clicked")} // Added debug logging
              >
                <Plus className="w-4 h-4" />
                Add Section
              </Button>
            </AddSectionDialog>
            <SettingsDialog
              appName={appName}
              appIcon={appIcon}
              hasPIN={hasPIN}
              onUpdateAppName={handleUpdateAppName}
              onUpdateAppIcon={handleUpdateAppIcon}
              onSetPIN={handleSetPIN}
              onRemovePIN={handleRemovePIN}
              sections={sections}
              statusOptions={statusOptions}
              priorityOptions={priorityOptions}
              onImport={handleImport}
              columnVisibility={columnVisibility}
              onUpdateColumnVisibility={handleUpdateColumnVisibility}
              columnOrder={columnOrder}
              onUpdateColumnOrder={handleUpdateColumnOrder}
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white hover:text-purple-900 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </SettingsDialog>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {selectedTasks.size > 0 && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={deleteSelectedTasks} className="gap-1 bg-transparent">
                  <Trash2 className="w-4 h-4" />
                  Delete ({selectedTasks.size})
                </Button>
                <MoveToSectionDialog sections={sections} onMove={moveSelectedTasks}>
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                    <FolderOpen className="w-4 h-4" />
                    Move ({selectedTasks.size})
                  </Button>
                </MoveToSectionDialog>
                <Button variant="outline" size="sm" onClick={markSelectedAsCompleted} className="gap-1 bg-transparent">
                  <CheckCircle className="w-4 h-4" />
                  Complete ({selectedTasks.size})
                </Button>
                {selectedTasks.size > 1 && (
                  <MergeTasksDialog
                    selectedTaskNames={Array.from(selectedTasks)
                      .map((taskId) => {
                        for (const section of sections) {
                          const task = section.tasks.find((t) => t.id === taskId)
                          if (task) return task.name
                        }
                        return ""
                      })
                      .filter(Boolean)}
                    onMerge={mergeSelectedTasks}
                  >
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Merge className="w-4 h-4" />
                      Merge ({selectedTasks.size})
                    </Button>
                  </MergeTasksDialog>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4" ref={tableRef}>
        {sections.map((section) => (
          <div key={section.id} className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" onClick={() => toggleSection(section.id)} className="p-1">
                {section.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
              <div className="bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-2">
                <span>{section.name}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs">{section.tasks.length}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <SectionRenameDialog
                    currentName={section.name}
                    onRename={(newName) => renameSection(section.id, newName)}
                  >
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Edit className="w-4 h-4 mr-2" />
                      Rename Section
                    </DropdownMenuItem>
                  </SectionRenameDialog>
                  <RemoveSectionDialog
                    sectionToRemove={section}
                    availableSections={sections}
                    onRemoveSection={removeSection}
                  >
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Section
                    </DropdownMenuItem>
                  </RemoveSectionDialog>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground"
                onClick={() => addTask(section.id)}
              >
                <Plus className="w-4 h-4" />
                Add Task
              </Button>
            </div>

            {section.expanded && (
              <>
                <div
                  className="flex gap-1 px-4 py-2 text-sm text-muted-foreground border-b border-border"
                  style={{
                    gridTemplateColumns: `${columnWidths.checkbox}% ${columnWidths.emoji}% ${columnWidths.name}% ${columnOrder
                      .map((id) =>
                        columnVisibility[id as keyof ColumnVisibility] !== false
                          ? `${columnWidths[id as keyof typeof columnWidths]}%`
                          : "",
                      )
                      .filter(Boolean)
                      .join(" ")} ${columnWidths.actions}%`,
                  }}
                >
                  <div style={{ width: `${columnWidths.checkbox}%` }}>☑️</div>
                  <div style={{ width: `${columnWidths.emoji}%` }}>😀</div>
                  <div className="flex items-center gap-1 relative" style={{ width: `${columnWidths.name}%` }}>
                    Name
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500"
                      onMouseDown={(e) => handleMouseDown("name", e)}
                    />
                  </div>
                  {renderColumnHeaders()}
                  <div className="flex items-center justify-center" style={{ width: `${columnWidths.actions}%` }}>
                    {/* Empty - no header label for actions */}
                  </div>
                </div>

                {section.tasks
                  .filter((task) => searchTerm === "" || task.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .sort((a, b) => (sortTasks([a, b])[0] === a ? -1 : 1))
                  .map((task) => (
                    <div
                      key={task.id}
                      className={`flex gap-1 px-4 py-0.75 hover:bg-muted/50 border-b border-border/50 ${
                        task.completed ? "opacity-60" : ""
                      } ${selectedTasks.has(task.id) ? "bg-blue-50" : ""}`}
                      style={{ minHeight: "32px" }}
                    >
                      <div className="flex items-center" style={{ width: `${columnWidths.checkbox}%` }}>
                        <Checkbox
                          checked={selectedTasks.has(task.id)}
                          onCheckedChange={() => toggleTaskSelection(task.id)}
                        />
                      </div>

                      <div className="flex items-center" style={{ width: `${columnWidths.emoji}%` }}>
                        <EmojiPicker
                          value={task.emoji}
                          onChange={(emoji) => updateTaskEmoji(section.id, task.id, emoji)}
                        />
                      </div>

                      <div className="flex items-center" style={{ width: `${columnWidths.name}%` }}>
                        {editingTaskId === task.id ? (
                          <Input
                            value={task.name}
                            onChange={(e) => {
                              const newName = e.target.value
                              setSections(
                                sections.map((section) =>
                                  section.id === section.id
                                    ? {
                                        ...section,
                                        tasks: section.tasks.map((t) =>
                                          t.id === task.id ? { ...t, name: newName } : t,
                                        ),
                                      }
                                    : section,
                                ),
                              )
                            }}
                            onBlur={() => {
                              if (task.name.trim()) {
                                renameTask(section.id, task.id, task.name.trim())
                              } else {
                                renameTask(section.id, task.id, "New Task")
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.currentTarget.blur()
                              }
                            }}
                            autoFocus
                            className="text-sm h-6 px-1 py-0"
                          />
                        ) : (
                          <TaskDetailsDialog
                            taskName={task.name}
                            taskNotes={task.notes}
                            onUpdateNotes={(notes) => updateTaskNotes(section.id, task.id, notes)}
                          >
                            <span
                              className={`text-sm cursor-pointer hover:bg-muted/50 px-1 py-0.5 rounded flex-1 ${
                                task.completed ? "line-through" : ""
                              }`}
                            >
                              {task.name}
                            </span>
                          </TaskDetailsDialog>
                        )}
                      </div>

                      {renderTaskColumns(task, section)}

                      <div className="flex items-center justify-end" style={{ width: `${columnWidths.actions}%` }}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-1 cursor-pointer hover:bg-muted">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                console.log("[v0] Rename task clicked")
                                setEditingTaskId(task.id)
                              }}
                              className="cursor-pointer"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Rename Task
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                console.log("[v0] Duplicate task clicked")
                                duplicateTask(section.id, task.id)
                              }}
                              className="cursor-pointer"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate Task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        ))}

        {completedTasks.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-2">
                <span>COMPLETED</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs">{completedTasks.length}</span>
              </div>
            </div>

            <div className="flex gap-1 px-4 py-2 text-sm text-muted-foreground border-b border-border">
              <div style={{ width: `${columnWidths.checkbox}%` }}>☑️</div>
              <div style={{ width: `${columnWidths.emoji}%` }}>😀</div>
              <div style={{ width: `${columnWidths.name}%` }}>Name</div>
              <div style={{ width: `${columnWidths.attachments}%` }}>📎</div>
              <div style={{ width: `${columnWidths.status}%` }}>Status</div>
              <div style={{ width: `${columnWidths.priority}%` }}>Priority</div>
              {columnVisibility.progress && <div style={{ width: `${columnWidths.progress}%` }}>Progress</div>}
              {columnVisibility.due && <div style={{ width: `${columnWidths.due}%` }}>Due</div>}
              {columnVisibility.who && <div style={{ width: `${columnWidths.who}%` }}>Who</div>}
              <div style={{ width: `${columnWidths.actions}%` }}></div>
            </div>

            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex gap-1 px-4 py-0.75 hover:bg-muted/50 border-b border-border/50 opacity-60"
                style={{ minHeight: "32px" }}
              >
                <div className="flex items-center" style={{ width: `${columnWidths.checkbox}%` }}>
                  <Checkbox checked={true} disabled />
                </div>
                <div className="flex items-center" style={{ width: `${columnWidths.emoji}%` }}>
                  <span>{task.emoji}</span>
                </div>
                <div className="flex items-center" style={{ width: `${columnWidths.name}%` }}>
                  <span className="text-sm line-through">{task.name}</span>
                </div>
                <div style={{ width: `${columnWidths.attachments}%` }}></div>
                <div className="flex items-stretch" style={{ width: `${columnWidths.status}%` }}>
                  <div className="w-full">
                    <StatusDropdown
                      value={task.status}
                      onChange={() => {}}
                      options={statusOptions}
                      onUpdateOptions={setStatusOptions}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="flex items-stretch" style={{ width: `${columnWidths.priority}%` }}>
                  <div className="w-full">
                    <PriorityDropdown
                      value={task.priority}
                      onChange={() => {}}
                      options={priorityOptions}
                      onUpdateOptions={setPriorityOptions}
                      fullWidth
                    />
                  </div>
                </div>
                {columnVisibility.progress && <div style={{ width: `${columnWidths.progress}%` }}></div>}
                {columnVisibility.due && <div style={{ width: `${columnWidths.due}%` }}></div>}
                {columnVisibility.who && <div style={{ width: `${columnWidths.who}%` }}></div>}
                <div style={{ width: `${columnWidths.actions}%` }}></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
