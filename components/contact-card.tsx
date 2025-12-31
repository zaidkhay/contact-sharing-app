"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ContactCardProps {
  name: string
  avatar?: string
  sharedMode: string
}

export function ContactCard({ name, avatar, sharedMode }: ContactCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="glass-card rounded-xl p-4 transition-all duration-300 hover:bg-white/10 cursor-pointer">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 border border-white/20">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          <AvatarFallback className="bg-white/10 text-white/80 text-sm font-medium">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white/90 truncate">{name}</h3>
          <p className="text-sm text-white/50">{sharedMode}</p>
        </div>
      </div>
    </div>
  )
}
