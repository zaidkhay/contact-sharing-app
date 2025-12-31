"use client"

import type { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"

interface SubpageTemplateProps {
  title: string
  onBack: () => void
  children: ReactNode
}

export function SubpageTemplate({ title, onBack, children }: SubpageTemplateProps) {
  return (
    <div>
      <div className="mesh-gradient min-h-screen w-full fixed inset-0 -z-10" />
      <div className="flex-1 px-6 pt-6 pb-24 relative z-10">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="glass-button w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white/95">{title}</h1>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  )
}
