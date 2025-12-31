"use client"

import { useState } from "react"
import { Users, Send, Download } from "lucide-react"
import { ContactCard } from "@/components/contact-card"

type FilterTab = "all" | "sent" | "received"

const contacts = [
  { id: 1, name: "Sarah Johnson", sharedMode: "Personal", type: "sent" as const },
  { id: 2, name: "Mike Thompson", sharedMode: "Professional", type: "received" as const },
  { id: 3, name: "Emily Davis", sharedMode: "Custom", type: "sent" as const },
  { id: 4, name: "David Wilson", sharedMode: "Personal", type: "received" as const },
  { id: 5, name: "Jessica Brown", sharedMode: "Professional", type: "sent" as const },
  { id: 6, name: "Chris Martinez", sharedMode: "Custom", type: "received" as const },
  { id: 7, name: "Amanda Lee", sharedMode: "Personal", type: "sent" as const },
  { id: 8, name: "Ryan Garcia", sharedMode: "Professional", type: "received" as const },
]

export function ContactsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all")

  const filteredContacts = contacts.filter((contact) => {
    if (activeFilter === "all") return true
    return contact.type === activeFilter
  })

  const filterTabs: { id: FilterTab; label: string; icon: typeof Users }[] = [
    { id: "all", label: "All", icon: Users },
    { id: "sent", label: "Sent", icon: Send },
    { id: "received", label: "Received", icon: Download },
  ]

  return (
    <div className="flex-1 px-6 pt-6 pb-24">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white">Connections</h1>
      </div>

      <div className="flex gap-2 mb-6">
        {filterTabs.map((tab) => {
          const Icon = tab.icon
          const count = tab.id === "all" ? contacts.length : contacts.filter((c) => c.type === tab.id).length

          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeFilter === tab.id
                  ? "midnight-glass text-white"
                  : "bg-white/5 border border-white/10 text-white/50 hover:text-white/80"
              }`}
              style={{
                transitionProperty: "background-color, color, border-color",
                transitionDuration: "200ms",
                transitionTimingFunction: "ease-out",
              }}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="text-xs opacity-60">({count})</span>
            </button>
          )
        })}
      </div>

      {/* Contact List */}
      <div className="space-y-3">
        {filteredContacts.map((contact) => (
          <ContactCard key={contact.id} name={contact.name} sharedMode={`Shared: ${contact.sharedMode}`} />
        ))}

        {filteredContacts.length === 0 && (
          <div className="glass-card p-8 rounded-2xl border border-white/15 text-center">
            <p className="text-white/50 font-light">No connections in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
