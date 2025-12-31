"use client"

import { ContactCard } from "@/components/contact-card"

const contacts = [
  { id: 1, name: "Sarah Johnson", sharedMode: "Shared: Personal" },
  { id: 2, name: "Mike Thompson", sharedMode: "Shared: Business" },
  { id: 3, name: "Emily Davis", sharedMode: "Shared: Custom" },
  { id: 4, name: "David Wilson", sharedMode: "Shared: Personal" },
  { id: 5, name: "Jessica Brown", sharedMode: "Shared: Business" },
  { id: 6, name: "Chris Martinez", sharedMode: "Shared: Custom" },
  { id: 7, name: "Amanda Lee", sharedMode: "Shared: Personal" },
  { id: 8, name: "Ryan Garcia", sharedMode: "Shared: Business" },
]

export function ContactsPage() {
  return (
    <div className="flex-1 px-6 pt-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Connections</h1>
        <p className="text-sm text-white/50 mt-1">{contacts.length} contacts</p>
      </div>

      {/* Contact List */}
      <div className="space-y-3">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} name={contact.name} sharedMode={contact.sharedMode} />
        ))}
      </div>
    </div>
  )
}
