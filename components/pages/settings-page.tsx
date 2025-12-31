"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, Trash2, Mail, Instagram, Linkedin, Github, Phone, Globe, Plus, Check } from "lucide-react"

const personalPresets = [
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "tiktok", name: "TikTok", icon: Globe },
  { id: "phone", name: "Phone Number", icon: Phone },
  { id: "snapchat", name: "Snapchat", icon: Globe },
]

const professionalPresets = [
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "email", name: "Email", icon: Mail },
  { id: "github", name: "GitHub", icon: Github },
  { id: "phone", name: "Phone Number", icon: Phone },
  { id: "website", name: "Website", icon: Globe },
]

const allPlatforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, placeholder: "@username" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, placeholder: "linkedin.com/in/username" },
  { id: "email", name: "Email", icon: Mail, placeholder: "you@example.com" },
  { id: "github", name: "GitHub", icon: Github, placeholder: "github.com/username" },
  { id: "phone", name: "Phone Number", icon: Phone, placeholder: "+1 (555) 123-4567" },
  { id: "website", name: "Website", icon: Globe, placeholder: "https://yoursite.com" },
  { id: "tiktok", name: "TikTok", icon: Globe, placeholder: "@username" },
  { id: "snapchat", name: "Snapchat", icon: Globe, placeholder: "@username" },
  { id: "twitter", name: "Twitter/X", icon: Globe, placeholder: "@username" },
]

const validateInput = (id: string, value: string): boolean => {
  if (!value.trim()) return false
  if (id === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  if (id === "instagram" || id === "tiktok" || id === "snapchat" || id === "twitter") {
    return value.startsWith("@") || value.length > 2
  }
  if (id === "phone") return /^[+]?[\d\s()-]{7,}$/.test(value)
  if (id === "website") return value.startsWith("http") || value.includes(".")
  return value.length > 2
}

export function SettingsPage() {
  const [expandedMode, setExpandedMode] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Toggle states for each mode
  const [personalToggles, setPersonalToggles] = useState<Record<string, boolean>>({
    instagram: true,
    tiktok: false,
    phone: true,
    snapchat: false,
  })

  const [professionalToggles, setProfessionalToggles] = useState<Record<string, boolean>>({
    linkedin: true,
    email: true,
    github: false,
    phone: true,
    website: false,
  })

  const [customToggles, setCustomToggles] = useState<Record<string, boolean>>({
    instagram: false,
    linkedin: false,
    email: false,
    github: false,
    phone: false,
    website: false,
    tiktok: false,
    snapchat: false,
    twitter: false,
  })

  // Link values and saved states
  const [links, setLinks] = useState<Record<string, string>>({})
  const [savedLinks, setSavedLinks] = useState<Record<string, boolean>>({})

  const handleLinkChange = (id: string, value: string) => {
    setLinks((prev) => ({ ...prev, [id]: value }))
    setSavedLinks((prev) => ({ ...prev, [id]: false }))
  }

  const handleSaveLink = (id: string) => {
    if (validateInput(id, links[id] || "")) {
      setSavedLinks((prev) => ({ ...prev, [id]: true }))
    }
  }

  const handleDelete = () => {
    console.log("User data deleted")
    setShowDeleteConfirm(false)
  }

  const ToggleSwitch = ({
    enabled,
    onToggle,
  }: {
    enabled: boolean
    onToggle: () => void
  }) => (
    <button
      onClick={onToggle}
      className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
        enabled ? "bg-green-500/60" : "bg-white/10"
      } border border-white/20`}
    >
      <div
        className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  )

  const AccordionItem = ({
    title,
    description,
    isExpanded,
    onToggle,
    presets,
    toggles,
    setToggles,
  }: {
    title: string
    description: string
    isExpanded: boolean
    onToggle: () => void
    presets: typeof personalPresets
    toggles: Record<string, boolean>
    setToggles: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  }) => {
    const activeCount = Object.values(toggles).filter(Boolean).length

    return (
      <div className="glass-card rounded-2xl border border-white/15 overflow-hidden">
        <button onClick={onToggle} className="w-full p-5 flex items-center justify-between text-left">
          <div>
            <h4 className="font-bold text-white text-lg">{title}</h4>
            <p className="text-sm font-light text-white/50 mt-1">{description}</p>
            <p className="text-xs text-blue-400 mt-2">{activeCount} items active</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-white/70 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        {isExpanded && (
          <div className="px-5 pb-5 pt-2 border-t border-white/10 space-y-3">
            {presets.map((preset) => {
              const Icon = preset.icon
              return (
                <div key={preset.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-white/70" />
                    <span className="text-sm font-medium text-white/90">{preset.name}</span>
                  </div>
                  <ToggleSwitch
                    enabled={toggles[preset.id] || false}
                    onToggle={() =>
                      setToggles((prev) => ({
                        ...prev,
                        [preset.id]: !prev[preset.id],
                      }))
                    }
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col px-6 pt-6 pb-24 overflow-y-auto">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Configure Modes</h3>
        <div className="space-y-3">
          <AccordionItem
            title="Personal Mode"
            description="Social & casual sharing"
            isExpanded={expandedMode === "personal"}
            onToggle={() => setExpandedMode(expandedMode === "personal" ? null : "personal")}
            presets={personalPresets}
            toggles={personalToggles}
            setToggles={setPersonalToggles}
          />

          <AccordionItem
            title="Professional Mode"
            description="Work & career connections"
            isExpanded={expandedMode === "professional"}
            onToggle={() => setExpandedMode(expandedMode === "professional" ? null : "professional")}
            presets={professionalPresets}
            toggles={professionalToggles}
            setToggles={setProfessionalToggles}
          />

          <AccordionItem
            title="Custom Mode"
            description="Your personalized selection"
            isExpanded={expandedMode === "custom"}
            onToggle={() => setExpandedMode(expandedMode === "custom" ? null : "custom")}
            presets={allPlatforms}
            toggles={customToggles}
            setToggles={setCustomToggles}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">Update Your Details</h3>
        <p className="text-sm font-light text-white/50 mb-4">Enter your handles and links below</p>

        <div className="glass-card p-5 rounded-2xl border border-white/15 space-y-5">
          {allPlatforms.map((platform) => {
            const Icon = platform.icon
            const value = links[platform.id] || ""
            const isValid = validateInput(platform.id, value)
            const isSaved = savedLinks[platform.id]
            const hasValue = value.trim().length > 0

            return (
              <div key={platform.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-white/70" />
                  <span className="text-sm font-medium text-white/90">{platform.name}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleLinkChange(platform.id, e.target.value)}
                    placeholder={platform.placeholder}
                    className={`flex-1 bg-black/40 px-4 py-3 rounded-lg text-white placeholder:text-white/40 focus:outline-none transition-all text-sm border ${
                      hasValue
                        ? isValid
                          ? "border-green-500/50 focus:border-green-500/70"
                          : "border-red-500/50 focus:border-red-500/70"
                        : "border-white/15 focus:border-white/30"
                    }`}
                  />
                  <button
                    onClick={() => handleSaveLink(platform.id)}
                    disabled={!hasValue || !isValid}
                    className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-all text-sm font-medium ${
                      isSaved
                        ? "bg-green-500/30 border border-green-500/50 text-green-300"
                        : hasValue && isValid
                          ? "glass-button text-white"
                          : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    {isSaved ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">{links[platform.id] ? "Update" : "Add"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mb-8">
        <button className="w-full glass-card p-4 rounded-xl border border-white/15 flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
          <Mail className="w-5 h-5 text-white" />
          <span className="font-medium text-white">Contact Support</span>
        </button>
      </div>

      <div className="pt-6 border-t border-white/10">
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 backdrop-blur-md px-4 py-4 rounded-xl text-red-300 font-medium flex items-center justify-center gap-2 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account & Wipe Data
          </button>
        ) : (
          <div className="bg-red-500/10 border border-red-500/30 backdrop-blur-md p-4 rounded-xl space-y-3">
            <p className="text-white/70 text-sm font-light">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 glass-button py-3 rounded-lg text-white font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500/40 border border-red-500/60 py-3 rounded-lg text-red-200 font-medium text-sm hover:bg-red-500/50 transition-all"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
