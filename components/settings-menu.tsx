"use client"

import { useState, useRef, useEffect } from "react"
import { Settings, User, SlidersHorizontal, Mail, Info } from "lucide-react"

interface SettingsMenuProps {
  onNavigate?: (page: string) => void
}

const menuItems = [
  { id: "account", label: "Account Profile", icon: User },
  { id: "mode-rules", label: "Mode Rules", icon: SlidersHorizontal },
  { id: "contact", label: "Contact Us", icon: Mail },
  { id: "info", label: "App Info", icon: Info },
]

export function SettingsMenu({ onNavigate }: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleItemClick = (id: string) => {
    setIsOpen(false)
    onNavigate?.(id)
  }

  return (
    <div ref={menuRef} className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="midnight-glass w-10 h-10 rounded-full flex items-center justify-center"
        aria-label="Settings menu"
        aria-expanded={isOpen}
      >
        <Settings
          className="w-5 h-5 text-white"
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transitionProperty: "transform",
            transitionDuration: "300ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </button>

      <div
        className="absolute top-full right-0 mt-2 w-48 flex flex-col gap-2 origin-top"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0) scaleY(1)" : "translateY(-8px) scaleY(0.95)",
          pointerEvents: isOpen ? "auto" : "none",
          transitionProperty: "opacity, transform",
          transitionDuration: "300ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="midnight-glass px-4 py-3 rounded-xl flex items-center gap-3 text-left"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(-8px)",
                transitionProperty: "opacity, transform",
                transitionDuration: "250ms",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              <Icon className="w-4 h-4 text-white flex-shrink-0" />
              <span className="text-sm font-medium text-white">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
