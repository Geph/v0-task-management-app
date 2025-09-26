"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const colorThemes = [
  { id: "white", color: "#FFFFFF", name: "White" },
  { id: "cream", color: "#EDE8D0", name: "Cream" },
  { id: "beige", color: "#E3DAC9", name: "Beige" }, // Added new beige color theme
  { id: "light-gray", color: "#E4E6EB", name: "Light Gray" },
  { id: "dark-gray", color: "#3A3B3C", name: "Dark Gray" },
  { id: "dark-blue", color: "#000435", name: "Dark Blue" },
]

export function ThemeSettings() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && theme) {
      // Remove all theme classes first
      const root = document.documentElement
      colorThemes.forEach((t) => root.classList.remove(t.id))

      // Add the current theme class
      if (theme !== "white") {
        root.classList.add(theme)
      }
    }
  }, [theme, mounted])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded">
        <h3 className="font-medium mb-4">Color Theme</h3>
        <p className="text-sm text-muted-foreground mb-4">Choose your preferred color theme for the interface.</p>

        <RadioGroup value={theme || "white"} onValueChange={setTheme} className="flex gap-3 flex-wrap">
          {colorThemes.map((colorTheme) => (
            <div key={colorTheme.id} className="flex flex-col items-center gap-2">
              <div className="relative">
                <RadioGroupItem value={colorTheme.id} id={colorTheme.id} className="sr-only" />
                <Label htmlFor={colorTheme.id} className="cursor-pointer block" title={colorTheme.name}>
                  <div
                    className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: colorTheme.color }}
                  />
                  {theme === colorTheme.id && (
                    <div className="absolute inset-0 rounded border-2 border-primary bg-primary/10" />
                  )}
                </Label>
              </div>
              <span className="text-xs text-muted-foreground">{colorTheme.name}</span>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
