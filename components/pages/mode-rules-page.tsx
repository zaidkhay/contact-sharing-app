"use client"

import { useState } from "react"
import { SubpageTemplate } from "@/components/subpage-template"

interface ModeRulesPageProps {
  onBack: () => void
}

const modes = [
  {
    id: "pro",
    label: "Pro Mode",
    description: "Professional contact details",
    fields: ["Email", "Phone", "LinkedIn", "Website"],
  },
  {
    id: "business",
    label: "Business Mode",
    description: "Company information",
    fields: ["Company", "Job Title", "Office Phone", "Work Email"],
  },
  {
    id: "custom",
    label: "Custom Mode",
    description: "Personalized details",
    fields: ["Instagram", "Twitter", "Discord", "Custom Field"],
  },
]

export function ModeRulesPage({ onBack }: ModeRulesPageProps) {
  const [toggles, setToggles] = useState<Record<string, Record<string, boolean>>>({
    pro: { Email: true, Phone: true, LinkedIn: false, Website: false },
    business: { Company: true, "Job Title": true, "Office Phone": false, "Work Email": true },
    custom: { Instagram: true, Twitter: false, Discord: false, "Custom Field": false },
  })

  const handleToggle = (mode: string, field: string) => {
    setToggles((prev) => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [field]: !prev[mode][field],
      },
    }))
  }

  return (
    <SubpageTemplate title="Mode Rules" onBack={onBack}>
      <div className="space-y-6 max-w-md">
        {modes.map((mode) => (
          <div key={mode.id} className="glass-card p-6 rounded-xl space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-white/95">{mode.label}</h2>
              <p className="text-sm text-white/50">{mode.description}</p>
            </div>

            {/* Field Toggles */}
            <div className="space-y-3">
              {mode.fields.map((field) => (
                <div key={field} className="flex items-center justify-between">
                  <span className="text-sm text-white/70">{field}</span>
                  <button
                    onClick={() => handleToggle(mode.id, field)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      toggles[mode.id][field] ? "bg-blue-500/60" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        toggles[mode.id][field] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Save Button */}
        <button className="w-full glass-button py-3 rounded-lg text-white font-medium">Save Mode Rules</button>
      </div>
    </SubpageTemplate>
  )
}
