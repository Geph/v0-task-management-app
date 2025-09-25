"use client"

import { useState, useEffect } from "react"
import { TaskList } from "@/components/task-list"
import { PinEntryPage } from "@/components/pin-entry-page"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasPIN, setHasPIN] = useState(false)
  const [appName, setAppName] = useState("Geph's Task Management")
  const [appIcon, setAppIcon] = useState("")
  const [isLoading, setIsLoading] = useState(true) // Added loading state to prevent hydration issues

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPIN = localStorage.getItem("userPIN")
      const storedAuth = localStorage.getItem("isAuthenticated")

      if (storedPIN) {
        setHasPIN(true)
        // Check if user was previously authenticated in this session
        if (storedAuth === "true") {
          setIsAuthenticated(true)
        }
      } else {
        setIsAuthenticated(true) // No PIN required, allow access
      }

      // Load app settings
      const storedAppName = localStorage.getItem("appName")
      const storedAppIcon = localStorage.getItem("appIcon")
      if (storedAppName) setAppName(storedAppName)
      if (storedAppIcon) setAppIcon(storedAppIcon)

      setIsLoading(false) // Set loading to false after all localStorage operations
    }
  }, [])

  const handlePinEntered = (pin: string) => {
    if (typeof window !== "undefined") {
      const storedPIN = localStorage.getItem("userPIN")
      if (pin === storedPIN) {
        setIsAuthenticated(true)
        localStorage.setItem("isAuthenticated", "true")
      } else {
        alert("Incorrect PIN. Please try again.")
      }
    }
  }

  const handleResetPin = (email: string) => {
    // In a real app, this would send a reset email
    console.log("PIN reset requested for:", email)
    alert(`PIN reset instructions would be sent to: ${email}`)
    // For demo purposes, remove the PIN requirement
    if (typeof window !== "undefined") {
      localStorage.removeItem("userPIN")
      localStorage.removeItem("isAuthenticated")
    }
    setHasPIN(false)
    setIsAuthenticated(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (hasPIN && !isAuthenticated) {
    return (
      <PinEntryPage appName={appName} appIcon={appIcon} onPinEntered={handlePinEntered} onResetPin={handleResetPin} />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <TaskList />
    </div>
  )
}
