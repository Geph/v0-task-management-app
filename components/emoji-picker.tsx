"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface EmojiPickerProps {
  value: string
  onChange: (emoji: string) => void
}

const EMOJI_CATEGORIES = {
  Faces: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
  ],
  Objects: [
    "📝",
    "📋",
    "📌",
    "📍",
    "🔥",
    "⭐",
    "🎯",
    "🚀",
    "💡",
    "🔔",
    "⚡",
    "💎",
    "🏆",
    "🎉",
    "🎊",
    "🎈",
    "🎁",
    "🔑",
    "🛠️",
    "⚙️",
    "🔧",
    "🔨",
    "⚖️",
    "🎪",
    "🎭",
    "🎨",
    "🎬",
    "🎤",
    "🎧",
    "🎵",
  ],
  Nature: [
    "🌟",
    "🌙",
    "☀️",
    "⛅",
    "🌈",
    "🔥",
    "💧",
    "🌊",
    "🌍",
    "🌎",
    "🌏",
    "🌋",
    "🏔️",
    "⛰️",
    "🌲",
    "🌳",
    "🌴",
    "🌱",
    "🌿",
    "☘️",
    "🍀",
    "🌺",
    "🌸",
    "🌼",
    "🌻",
    "🌹",
    "🥀",
    "🌷",
    "🌵",
    "🍄",
  ],
  Symbols: [
    "✅",
    "❌",
    "⚠️",
    "🚫",
    "💯",
    "🔴",
    "🟠",
    "🟡",
    "🟢",
    "🔵",
    "🟣",
    "⚫",
    "⚪",
    "🟤",
    "🔺",
    "🔻",
    "🔸",
    "🔹",
    "🔶",
    "🔷",
    "🔳",
    "🔲",
    "▪️",
    "▫️",
    "◾",
    "◽",
    "◼️",
    "◻️",
    "⬛",
    "⬜",
  ],
}

export function EmojiPicker({ value, onChange }: EmojiPickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-lg">
          {value || "😀"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2">
        <div className="space-y-2">
          {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
            <div key={category}>
              <div className="text-xs font-medium text-muted-foreground mb-1">{category}</div>
              <div className="grid grid-cols-8 gap-1">
                {emojis.map((emoji) => (
                  <Button
                    key={emoji}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 text-lg hover:bg-muted"
                    onClick={() => {
                      onChange(emoji)
                      setOpen(false)
                    }}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
