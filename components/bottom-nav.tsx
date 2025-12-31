"use client"

import { Home, Users, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export type NavPage = "home" | "contacts" | "settings"

interface BottomNavProps {
  activePage: NavPage
  onPageChange: (page: NavPage) => void
}

export function BottomNav({ activePage, onPageChange }: BottomNavProps) {
  const navItems = [
    { id: "home" as NavPage, icon: Home, label: "Home" },
    { id: "contacts" as NavPage, icon: Users, label: "Connections" },
    { id: "settings" as NavPage, icon: Settings, label: "Settings" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-nav z-50">
      <div className="max-w-md mx-auto flex justify-around items-center py-3 px-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300",
              activePage === item.id ? "text-white bg-white/10" : "text-white/50 hover:text-white/80",
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
