"use client"

import { useState } from "react"
import { Camera, LinkIcon } from "lucide-react"
import { QRCodeDisplay } from "@/components/qr-code-display"

type ShareMode = "personal" | "professional" | "custom"

export function HomePage() {
  const [activeMode, setActiveMode] = useState<ShareMode>("professional")
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    const link = `${window.location.origin}/share/user123?mode=${activeMode}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const modes: { id: ShareMode; label: string }[] = [
    { id: "personal", label: "Personal" },
    { id: "professional", label: "Professional" },
    { id: "custom", label: "Custom" },
  ]

  return (
    <div className="flex-1 flex flex-col px-6 pt-8 pb-24">
      <div className="w-full flex items-start justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Zaid Khayyat</h1>
          <p className="text-sm font-light text-white/40 mt-1">Share your contact</p>
        </div>
        <button
          onClick={() => console.log("Open Camera Scanner")}
          className="midnight-glass p-3 rounded-xl"
          style={{
            transitionProperty: "background-color, border-color",
            transitionDuration: "200ms",
            transitionTimingFunction: "ease-out",
          }}
        >
          <Camera className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="w-full mb-10">
        <div className="glass-card p-1.5 rounded-2xl border border-white/15 flex">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                activeMode === mode.id
                  ? "bg-white/20 text-white border border-white/20"
                  : "text-white/50 hover:text-white/80"
              }`}
              style={{
                transitionProperty: "background-color, color, border-color",
                transitionDuration: "200ms",
                transitionTimingFunction: "ease-out",
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center w-full mb-8">
        <div className="relative">
          <style>{`
            @keyframes pulse-subtle {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.85; }
            }
            .qr-pulse {
              animation: pulse-subtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
        className="glass-button w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2"
        style={{
          transitionProperty: "background-color, border-color",
          transitionDuration: "200ms",
          transitionTimingFunction: "ease-out",
        }}
      >
        <LinkIcon className="w-5 h-5 text-white/90" />
        <span className="text-white font-medium">{copied ? "Copied!" : "Copy Link"}</span>
      </button>
    </div>
  )
}
