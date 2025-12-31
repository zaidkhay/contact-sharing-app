"use client"

import { Camera } from "lucide-react"

interface FABButtonProps {
  onClick?: () => void
}

export function FABButton({ onClick }: FABButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-6 w-14 h-14 rounded-full glass-button flex items-center justify-center z-40 transition-all duration-300 hover:scale-105 active:scale-95"
      aria-label="Scan QR Code"
    >
      <Camera className="w-6 h-6 text-white/90" />
    </button>
  )
}
