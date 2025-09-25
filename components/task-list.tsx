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
  Mail,
  Bell,
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
import { EmailTaskDialog } from "@/components/email-task-dialog"
import { RemindMeDialog } from "@/components/remind-me-dialog"
import { EmojiPicker } from "@/components/enhanced-emoji-picker" // Updated import
import { FileAttachmentComponent } from "@/components/file-attachment"
import { SettingsDialog } from "@/components/settings-dialog" // Added import

interface Task {
  id: string
  name: string
  status: StatusType
  priority: PriorityType
  completed: boolean
  notes: string
  emoji: string
  attachments: any[]
}

interface TaskSection {
  id: string
  name: string
  tasks: Task[]
  expanded: boolean
}

type SortField = "name" | "status" | "priority"
type SortDirection = "asc" | "desc"

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

  const [appName, setAppName] = useState(localStorage.getItem("appName") || "Geph's Task Management")
  const [appIcon, setAppIcon] = useState(localStorage.getItem("appIcon") || "")
  const [defaultEmail, setDefaultEmail] = useState("")
  const [hasPIN, setHasPIN] = useState(localStorage.getItem("userPIN") !== null)
  const [userPIN, setUserPIN] = useState(localStorage.getItem("userPIN") || "")

  const calculateColumnWidths = () => {
    const baseWidths = {
      checkbox: 4,
      emoji: 4,
      name: 40,
      status: 18,
      priority: 18,
      attachments: 6, // Reduced from 8 to 6
      actions: 4, // Reduced from 6 to 4
    }

    let maxNameLength = 4 // "Name"
    let maxStatusLength = 6 // "Status"
    let maxPriorityLength = 8 // "Priority"

    sections.forEach((section) => {
      section.tasks.forEach((task) => {
        maxNameLength = Math.max(maxNameLength, task.name.length)
        const statusOption = statusOptions.find((opt) => opt.key === task.status)
        if (statusOption) {
          maxStatusLength = Math.max(maxStatusLength, statusOption.label.length)
        }
        const priorityOption = priorityOptions.find((opt) => opt.key === task.priority)
        if (priorityOption) {
          maxPriorityLength = Math.max(maxPriorityLength, priorityOption.label.length)
        }
      })
    })

    const nameWidth = Math.min(45, Math.max(25, maxNameLength * 0.8 + maxNameLength * 0.3))
    const statusWidth = Math.min(22, Math.max(15, maxStatusLength * 0.6 + maxStatusLength * 0.3))
    const priorityWidth = Math.min(22, Math.max(15, maxPriorityLength * 0.6 + maxPriorityLength * 0.3))
    const remaining = 100 - nameWidth - statusWidth - priorityWidth - 4 - 4 - 6 - 4 // checkbox, emoji, attachments, actions

    return {
      checkbox: 4,
      emoji: 4,
      name: nameWidth,
      status: statusWidth,
      priority: priorityWidth,
      attachments: 6, // Reduced from 8
      actions: Math.max(4, remaining + 4), // Reduced minimum from 6 to 4
    }
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

  const sendTaskEmail = (email: string, subject: string, message: string) => {
    // In a real app, this would send an actual email
    console.log("Sending email:", { email, subject, message })
    alert(`Email would be sent to: ${email}\nSubject: ${subject}`)
  }

  const setTaskReminder = (email: string, date: string, time: string, message: string) => {
    // In a real app, this would set up an actual reminder
    console.log("Setting reminder:", { email, date, time, message })
    alert(`Reminder set for ${date} at ${time}\nEmail: ${email}`)
  }

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
    localStorage.setItem("appName", name)
  }

  const handleUpdateAppIcon = (icon: string) => {
    setAppIcon(icon)
    localStorage.setItem("appIcon", icon)
  }

  const handleUpdateDefaultEmail = (email: string) => {
    setDefaultEmail(email)
    localStorage.setItem("defaultEmail", email)
  }

  const handleSetPIN = (pin: string) => {
    setUserPIN(pin)
    setHasPIN(true)
    localStorage.setItem("userPIN", pin)
    localStorage.removeItem("isAuthenticated") // Force re-authentication
    alert("PIN set successfully. You will need to enter it on your next visit.")
  }

  const handleRemovePIN = () => {
    setUserPIN("")
    setHasPIN(false)
    localStorage.removeItem("userPIN")
    localStorage.removeItem("isAuthenticated")
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
                className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white hover:text-purple-900 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Section
              </Button>
            </AddSectionDialog>
            <SettingsDialog
              appName={appName}
              appIcon={appIcon}
              defaultEmail={defaultEmail}
              hasPIN={hasPIN}
              onUpdateAppName={handleUpdateAppName}
              onUpdateAppIcon={handleUpdateAppIcon}
              onUpdateDefaultEmail={handleUpdateDefaultEmail}
              onSetPIN={handleSetPIN}
              onRemovePIN={handleRemovePIN}
              sections={sections}
              statusOptions={statusOptions}
              priorityOptions={priorityOptions}
              onImport={handleImport}
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
                    gridTemplateColumns: `${columnWidths.checkbox}% ${columnWidths.emoji}% ${columnWidths.name}% ${columnWidths.status}% ${columnWidths.priority}% ${columnWidths.attachments}% ${columnWidths.actions}%`,
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
                  <div className="flex items-center justify-center" style={{ width: `${columnWidths.actions}%` }}>
                    Actions
                  </div>
                </div>

                {section.tasks
                  .filter((task) => searchTerm === "" || task.name.toLowerCase().includes(searchTerm.toLowerCase()))
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

                      <div className="flex items-center" style={{ width: `${columnWidths.attachments}%` }}>
                        <FileAttachmentComponent
                          attachments={task.attachments}
                          onAddAttachment={(file) => addTaskAttachment(section.id, task.id, file)}
                          onRemoveAttachment={(attachmentId) => removeTaskAttachment(section.id, task.id, attachmentId)}
                        />
                      </div>

                      <div className="flex items-center justify-end" style={{ width: `${columnWidths.actions}%` }}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-1">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setEditingTaskId(task.id)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Rename Task
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => duplicateTask(section.id, task.id)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate Task
                            </DropdownMenuItem>
                            <EmailTaskDialog taskName={task.name} taskNotes={task.notes} onSendEmail={sendTaskEmail}>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Mail className="w-4 h-4 mr-2" />
                                Send to Email
                              </DropdownMenuItem>
                            </EmailTaskDialog>
                            <RemindMeDialog taskName={task.name} onSetReminder={setTaskReminder}>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Bell className="w-4 h-4 mr-2" />
                                Remind Me
                              </DropdownMenuItem>
                            </RemindMeDialog>
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
              <div style={{ width: `${columnWidths.status}%` }}>Status</div>
              <div style={{ width: `${columnWidths.priority}%` }}>Priority</div>
              <div style={{ width: `${columnWidths.attachments}%` }}>📎</div>
              <div style={{ width: `${columnWidths.actions}%` }}>Actions</div>
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
                <div style={{ width: `${columnWidths.attachments}%` }}></div>
                <div style={{ width: `${columnWidths.actions}%` }}></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
