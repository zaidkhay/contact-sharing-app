"use client"

import type { ShareMode } from "./mode-toggle"

interface QRCodeDisplayProps {
  mode: ShareMode
  userName: string
}

export function QRCodeDisplay({ mode, userName }: QRCodeDisplayProps) {
  // Generate different QR patterns based on mode
  const getModeColor = () => {
    switch (mode) {
      case "professional":
        return "from-blue-400/20 to-indigo-500/20"
      case "business":
        return "from-emerald-400/20 to-teal-500/20"
      case "custom":
        return "from-pink-400/20 to-purple-500/20"
    }
  }

  const getModeAccent = () => {
    switch (mode) {
      case "professional":
        return "bg-blue-400"
      case "business":
        return "bg-emerald-400"
      case "custom":
        return "bg-pink-400"
    }
  }

  return (
    <div className="glass-card rounded-3xl p-8 flex flex-col items-center">
      {/* QR Code Container */}
      <div className={`bg-gradient-to-br ${getModeColor()} p-6 rounded-2xl mb-6`}>
        <div className="bg-white rounded-xl p-4">
          {/* Stylized QR Code Pattern */}
          <svg width="200" height="200" viewBox="0 0 200 200" className="transition-all duration-500">
            {/* Corner patterns */}
            <rect x="10" y="10" width="50" height="50" rx="8" fill="#1a1a2e" />
            <rect x="18" y="18" width="34" height="34" rx="4" fill="white" />
            <rect x="26" y="26" width="18" height="18" rx="2" fill="#1a1a2e" />

            <rect x="140" y="10" width="50" height="50" rx="8" fill="#1a1a2e" />
            <rect x="148" y="18" width="34" height="34" rx="4" fill="white" />
            <rect x="156" y="26" width="18" height="18" rx="2" fill="#1a1a2e" />

            <rect x="10" y="140" width="50" height="50" rx="8" fill="#1a1a2e" />
            <rect x="18" y="148" width="34" height="34" rx="4" fill="white" />
            <rect x="26" y="156" width="18" height="18" rx="2" fill="#1a1a2e" />

            {/* Data pattern - varies by mode */}
            <g fill="#1a1a2e">
              {mode === "professional" && (
                <>
                  <rect x="70" y="20" width="12" height="12" rx="2" />
                  <rect x="90" y="20" width="12" height="12" rx="2" />
                  <rect x="110" y="20" width="12" height="12" rx="2" />
                  <rect x="70" y="40" width="12" height="12" rx="2" />
                  <rect x="110" y="40" width="12" height="12" rx="2" />
                </>
              )}
              {mode === "business" && (
                <>
                  <rect x="70" y="20" width="12" height="12" rx="2" />
                  <rect x="90" y="30" width="12" height="12" rx="2" />
                  <rect x="110" y="20" width="12" height="12" rx="2" />
                  <rect x="80" y="45" width="12" height="12" rx="2" />
                  <rect x="100" y="45" width="12" height="12" rx="2" />
                </>
              )}
              {mode === "custom" && (
                <>
                  <rect x="75" y="25" width="12" height="12" rx="2" />
                  <rect x="95" y="20" width="12" height="12" rx="2" />
                  <rect x="115" y="25" width="12" height="12" rx="2" />
                  <rect x="85" y="40" width="12" height="12" rx="2" />
                  <rect x="105" y="40" width="12" height="12" rx="2" />
                </>
              )}

              {/* Center pattern */}
              <rect x="70" y="70" width="60" height="60" rx="8" />
              <rect x="78" y="78" width="44" height="44" rx="4" fill="white" />
              <rect x="88" y="88" width="24" height="24" rx="4" fill="#1a1a2e" />

              {/* Additional data modules */}
              <rect x="20" y="70" width="10" height="10" rx="2" />
              <rect x="35" y="85" width="10" height="10" rx="2" />
              <rect x="20" y="100" width="10" height="10" rx="2" />
              <rect x="45" y="70" width="10" height="10" rx="2" />

              <rect x="140" y="70" width="10" height="10" rx="2" />
              <rect x="155" y="85" width="10" height="10" rx="2" />
              <rect x="170" y="70" width="10" height="10" rx="2" />
              <rect x="155" y="100" width="10" height="10" rx="2" />

              <rect x="70" y="145" width="10" height="10" rx="2" />
              <rect x="90" y="155" width="10" height="10" rx="2" />
              <rect x="110" y="145" width="10" height="10" rx="2" />
              <rect x="85" y="170" width="10" height="10" rx="2" />
              <rect x="105" y="170" width="10" height="10" rx="2" />

              <rect x="145" y="145" width="10" height="10" rx="2" />
              <rect x="160" y="160" width="10" height="10" rx="2" />
              <rect x="175" y="145" width="10" height="10" rx="2" />
              <rect x="145" y="175" width="10" height="10" rx="2" />
              <rect x="175" y="175" width="10" height="10" rx="2" />
            </g>
          </svg>
        </div>
      </div>

      {/* Mode indicator */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${getModeAccent()}`} />
        <span className="text-sm text-white/60 capitalize">{mode} Mode</span>
      </div>

      <p className="text-white/80 font-medium">{userName}</p>
      <p className="text-xs text-white/40 mt-1">Scan to connect</p>
    </div>
  )
}
