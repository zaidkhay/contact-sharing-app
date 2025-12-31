"use client"

import { useState } from "react"
import { LinkIcon } from "lucide-react"
import { ModeToggle, type ShareMode } from "@/components/mode-toggle"
import { QRCodeDisplay } from "@/components/qr-code-display"
import { FABButton } from "@/components/fab-button"

export function HomePage() {
  const [activeMode, setActiveMode] = useState<ShareMode>("professional")
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    const link = `${window.location.origin}/share/user123?mode=${activeMode}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-start px-6 pt-8 pb-24">
      {/* Top Header Section */}
      <div className="w-full flex items-start justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Zaid Khayyat</h1>
          <p className="text-sm text-white/40 mt-1">Share your contact</p>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="w-full mb-12">
        <ModeToggle activeMode={activeMode} onModeChange={setActiveMode} />
      </div>

      {/* QR Code Center Section */}
      <div className="flex-1 flex items-center justify-center w-full mb-8">
        <div className="relative">
          <style>{`
            @keyframes pulse-subtle {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.8; }
            }
            .qr-pulse {
              animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
          `}</style>
          <div className="qr-pulse">
            <QRCodeDisplay mode={activeMode} userName="Zaid Khayyat" />
          </div>
        </div>
      </div>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="glass-button w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 mb-6 transition-all"
        style={{
          transitionProperty: "all",
          transitionDuration: "300ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <LinkIcon className="w-5 h-5 text-white/90" />
        <span className="text-white font-medium">{copied ? "Copied!" : "Copy Link"}</span>
      </button>

      {/* FAB for QR Scanning */}
      <FABButton onClick={() => console.log("Open QR Scanner")} />
    </div>
  )
}
