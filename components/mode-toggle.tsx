"use client"

import { cn } from "@/lib/utils"

export type ShareMode = "professional" | "business" | "custom"

interface ModeToggleProps {
  activeMode: ShareMode
  onModeChange: (mode: ShareMode) => void
  compact?: boolean
}

export function ModeToggle({ activeMode, onModeChange, compact = false }: ModeToggleProps) {
  const modes: { id: ShareMode; label: string; shortLabel: string }[] = [
    { id: "professional", label: "Professional", shortLabel: "Pro" },
    { id: "business", label: "Business", shortLabel: "Bus" },
    { id: "custom", label: "Custom", shortLabel: "Custom" },
  ]

  return (
    <div className="flex gap-3 w-full">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300",
            compact ? "py-2 px-3 text-xs" : "py-3 px-4 text-sm",
            activeMode === mode.id ? "glass-button-active text-white" : "glass-button text-white/80 hover:text-white",
          )}
        >
          {compact ? mode.shortLabel : mode.label}
        </button>
      ))}
    </div>
  )
}
