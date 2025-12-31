"use client"

import { useState } from "react"
import { SubpageTemplate } from "@/components/subpage-template"
import { ChevronDown, Trash2, Mail } from "lucide-react"

interface SettingsPageProps {
  onBack: () => void
}

const modes = [
  {
    id: "professional",
    label: "Personal",
    description: "Personal details & social",
    liveFields: ["Email", "Phone", "LinkedIn"],
    allFields: ["Email", "Phone", "LinkedIn", "Website"],
  },
  {
    id: "business",
    label: "Professional",
    description: "Work & career info",
    liveFields: ["Company", "Job Title", "Work Email"],
    allFields: ["Company", "Job Title", "Office Phone", "Work Email"],
  },
  {
    id: "custom",
    label: "Custom",
    description: "Your personalized set",
    liveFields: ["Instagram", "Twitter"],
    allFields: ["Instagram", "Twitter", "Discord", "Custom Field"],
  },
]

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [expandedMode, setExpandedMode] = useState<string | null>(null)
  const [name, setName] = useState("Zaid Khayyat")
  const [bio, setBio] = useState("Creative digital designer and developer")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [toggles, setToggles] = useState<Record<string, Record<string, boolean>>>({
    professional: { Email: true, Phone: true, LinkedIn: true, Website: false },
    business: { Company: true, "Job Title": true, "Office Phone": false, "Work Email": true },
    custom: { Instagram: true, Twitter: true, Discord: false, "Custom Field": false },
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

  const handleDelete = () => {
    console.log("User data deleted")
    setShowDeleteConfirm(false)
    onBack()
  }

  const getLiveFields = (mode: string) => {
    return Object.entries(toggles[mode] || {})
      .filter(([_, enabled]) => enabled)
      .map(([field]) => field)
  }

  return (
    <SubpageTemplate title="Settings" onBack={onBack}>
      <div className="space-y-6 max-w-md pb-8">
        <div className="glass-card p-6 rounded-2xl space-y-6 border border-white/20">
          <div>
            <h2 className="text-2xl font-bold text-white/95">Sharing Profiles</h2>
            <p className="text-sm text-white/50 mt-1">Customize what you share in each mode</p>
          </div>

          {/* Profile Zones */}
          <div className="space-y-3">
            {modes.map((mode) => (
              <div key={mode.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                {/* Mode Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-white/95 text-base">{mode.label}</h3>
                    <p className="text-xs text-white/50 mt-0.5">{mode.description}</p>
                    {/* Live Fields Summary */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {getLiveFields(mode.id)
                        .slice(0, 3)
                        .map((field) => (
                          <span
                            key={field}
                            className="inline-block px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
                          >
                            {field}
                          </span>
                        ))}
                      {getLiveFields(mode.id).length > 3 && (
                        <span className="inline-block px-2 py-0.5 bg-white/10 text-white/60 text-xs rounded">
                          +{getLiveFields(mode.id).length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Customize Button */}
                  <button
                    onClick={() => setExpandedMode(expandedMode === mode.id ? null : mode.id)}
                    className={`glass-button px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2 flex-shrink-0 transition-all duration-300 ${
                      expandedMode === mode.id ? "bg-white/20" : ""
                    }`}
                  >
                    Edit
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        expandedMode === mode.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Expandable Toggle List */}
                {expandedMode === mode.id && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    {mode.allFields.map((field) => (
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
                )}
              </div>
            ))}
          </div>

          <button className="w-full glass-button py-3 rounded-lg text-white font-medium mt-2">Save Profiles</button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white/95">Account Settings</h3>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wide">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full glass-button px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none text-sm"
              placeholder="Enter your name"
            />
          </div>

          {/* Bio Field */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wide">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full glass-button px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none min-h-20 resize-none text-sm"
              placeholder="Tell us about yourself"
            />
          </div>

          <button className="w-full glass-button py-3 rounded-lg text-white font-medium text-sm">Save Account</button>
        </div>

        <div className="glass-card p-4 rounded-xl border border-white/10">
          <button className="w-full flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors py-2">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Contact Support</span>
          </button>
        </div>

        <div className="pt-4 border-t border-white/10">
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 backdrop-blur-md px-4 py-3 rounded-lg text-red-300 font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete All Data
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-white/70 text-sm">Are you sure? This cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 glass-button py-2 rounded-lg text-white font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500/40 border border-red-500/60 py-2 rounded-lg text-red-200 font-medium text-sm"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SubpageTemplate>
  )
}
