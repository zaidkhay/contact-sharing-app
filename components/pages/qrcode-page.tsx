"use client"

import { useState } from "react"
import { ModeToggle, type ShareMode } from "@/components/mode-toggle"
import { QRCodeDisplay } from "@/components/qr-code-display"

export function QRCodePage() {
  const [activeMode, setActiveMode] = useState<ShareMode>("professional")

  return (
    <div className="flex-1 px-6 pt-6 pb-24 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Share My Code</h1>
        <p className="text-sm text-white/50 mt-1">Let others scan to connect</p>
      </div>

      {/* Mode Switcher */}
      <div className="mb-8">
        <ModeToggle activeMode={activeMode} onModeChange={setActiveMode} compact />
      </div>

      {/* QR Code Display */}
      <div className="flex-1 flex items-center justify-center">
        <QRCodeDisplay mode={activeMode} userName="Zaid Khayyat" />
      </div>
    </div>
  )
}
