"use client"

import { useState } from "react"
import { ChevronDown, Trash2, Mail, Edit2, Instagram, Linkedin, Twitter, Phone } from "lucide-react"

const socialPlatforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, placeholder: "@username" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, placeholder: "linkedin.com/in/username" },
  { id: "twitter", name: "Twitter", icon: Twitter, placeholder: "@username" },
  { id: "email", name: "Email", icon: Mail, placeholder: "you@example.com" },
  { id: "phone", name: "Phone", icon: Phone, placeholder: "+1 (555) 123-4567" },
]

const modes = [
  {
    id: "personal",
    label: "Personal",
    description: "Personal details & social",
    liveFields: ["Email", "Phone", "Instagram"],
  },
  {
    id: "professional",
    label: "Professional",
    description: "Work & career info",
    liveFields: ["LinkedIn", "Email", "Phone"],
  },
  {
    id: "custom",
    label: "Custom",
    description: "Your personalized set",
    liveFields: ["Instagram", "Twitter"],
  },
]

export function SettingsPage() {
  const [name, setName] = useState("Zaid Khayyat")
  const [profilePic] = useState("ZK")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [expandedMode, setExpandedMode] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [socials, setSocials] = useState<Record<string, string>>({
    instagram: "",
    linkedin: "",
    twitter: "",
    email: "",
    phone: "",
  })

  const handleSocialChange = (platform: string, value: string) => {
    setSocials((prev) => ({
      ...prev,
      [platform]: value,
    }))
  }

  const handleDelete = () => {
    console.log("User data deleted")
    setShowDeleteConfirm(false)
  }

  return (
    <div className="flex-1 flex flex-col px-6 pt-6 pb-24 overflow-y-auto">
      {/* Section A: Account Overview */}
      <div className="mb-8">
        <div className="glass-card p-6 rounded-2xl border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{profilePic}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{name}</h2>
                <p className="text-sm font-light text-white/50">Profile Settings</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="glass-button px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Edit</span>
            </button>
          </div>

          {isEditingProfile && (
            <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/60 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                  placeholder="Your name"
                />
              </div>
              <button className="w-full glass-button py-2 rounded-lg text-white font-medium text-sm">
                Save Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section B: Mode Rules - Hero Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Mode Rules</h3>
        <div className="space-y-3">
          {modes.map((mode) => (
            <div key={mode.id} className="glass-card p-4 rounded-xl border border-white/20">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-bold text-white/95">{mode.label}</h4>
                  <p className="text-xs font-light text-white/50 mt-0.5">{mode.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {mode.liveFields.map((field) => (
                      <span
                        key={field}
                        className="inline-block px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setExpandedMode(expandedMode === mode.id ? null : mode.id)}
                  className="glass-button px-4 py-2 rounded-lg text-sm font-medium text-white flex-shrink-0"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expandedMode === mode.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {expandedMode === mode.id && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs font-light text-white/60 mb-3">Customize what data to share in this mode</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section C: Link Socials - Input Hub */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Link Socials</h3>
        <div className="glass-card p-4 rounded-xl border border-white/20 space-y-5">
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon
            return (
              <div key={platform.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-white/70" />
                  <span className="text-sm font-medium text-white/90">{platform.name}</span>
                </div>
                <input
                  type="text"
                  value={socials[platform.id] || ""}
                  onChange={(e) => handleSocialChange(platform.id, e.target.value)}
                  placeholder={platform.placeholder}
                  className="w-full bg-white/5 border border-white/15 px-4 py-3 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-sm"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Section D: Contact Us */}
      <div className="mb-8">
        <button className="w-full glass-card p-4 rounded-xl border border-white/20 flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
          <Mail className="w-5 h-5 text-white" />
          <span className="font-medium text-white">Contact Support</span>
        </button>
      </div>

      {/* Section E: Privacy/Account Deletion - Red-tinted */}
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
