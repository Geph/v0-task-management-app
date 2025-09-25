"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RocketIcon } from "@/components/rocket-icon"
import { RotateCcw } from "lucide-react"

interface PinEntryPageProps {
  appName: string
  appIcon: string
  onPinEntered: (pin: string) => void
  onResetPin: (email: string) => void
}

export function PinEntryPage({ appName, appIcon, onPinEntered, onResetPin }: PinEntryPageProps) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState("")

  const handlePinSubmit = () => {
    if (pin.length !== 4) {
      setError("PIN must be 4 digits")
      return
    }
    onPinEntered(pin)
  }

  const handleResetPin = () => {
    if (!resetEmail.trim()) {
      setError("Please enter your recovery email")
      return
    }
    onResetPin(resetEmail)
    setShowReset(false)
    setResetEmail("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {appIcon ? (
              <img src={appIcon || "/placeholder.svg"} alt="App icon" className="w-16 h-16 object-contain" />
            ) : (
              <RocketIcon className="w-16 h-16 text-purple-600" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{appName}</h1>
          <p className="text-gray-600">Enter your 4-digit PIN to continue</p>
        </div>

        {!showReset ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pin">PIN</Label>
              <Input
                id="pin"
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value.replace(/\D/g, ""))
                  setError("")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePinSubmit()
                  }
                }}
                placeholder="0000"
                className="text-center text-2xl tracking-widest"
                autoFocus
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button onClick={handlePinSubmit} className="w-full" disabled={pin.length !== 4}>
              Enter
            </Button>

            <Button
              variant="ghost"
              onClick={() => setShowReset(true)}
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Forgot PIN?
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Recovery Email</Label>
              <Input
                id="reset-email"
                type="email"
                value={resetEmail}
                onChange={(e) => {
                  setResetEmail(e.target.value)
                  setError("")
                }}
                placeholder="your@email.com"
                autoFocus
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowReset(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleResetPin} className="flex-1">
                Reset PIN
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
