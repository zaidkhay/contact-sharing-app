"use client"

import type { ShareMode } from "./mode-toggle"
import { Linkedin, Mail, FileText, Building2, Phone, MapPin, Instagram, Music2, Smartphone } from "lucide-react"

interface ModePreviewCardProps {
  mode: ShareMode
}

const modeContent = {
  professional: {
    title: "Professional Mode",
    items: [
      { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/zaid-khayyat" },
      { icon: Mail, label: "Work Email", value: "zaidkhayyat0@gmail.com" },
      { icon: FileText, label: "Resume", value: "resume.zaidkhayyat.io" },
    ],
  },
  business: {
    title: "Business Mode",
    items: [
      { icon: Building2, label: "Company", value: "ShamyCreations Inc." },
      { icon: Phone, label: "Work Phone", value: "+1 (313) 618-6238" },
      { icon: MapPin, label: "Office", value: "123 Innovation Blvd, SF" },
    ],
  },
  custom: {
    title: "Custom Mode",
    items: [
      { icon: Instagram, label: "Instagram", value: "@khayyat.zaid" },
      { icon: Music2, label: "TikTok", value: "@zaidkhayyat" },
      { icon: Smartphone, label: "Personal Cell", value: "+1 (313) 618-6238" },
    ],
  },
}

export function ModePreviewCard({ mode }: ModePreviewCardProps) {
  const content = modeContent[mode]

  return (
    <div className="glass-card rounded-2xl p-6 transition-all duration-500">
      <h3 className="text-lg font-semibold text-white/90 mb-4">{content.title}</h3>
      <div className="space-y-4">
        {content.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-xl bg-white/5 transition-all duration-300 hover:bg-white/10"
          >
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-white/80" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/50 uppercase tracking-wider">{item.label}</p>
              <p className="text-sm text-white/90 truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
