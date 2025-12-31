"use client"
import { useState, useCallback, memo } from "react"
import {
  Menu,
  X,
  Pencil,
  ArrowLeft,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Globe,
  Github,
  Plus,
  Check,
  Sliders,
  MessageSquare,
  Trash2,
  RotateCcw,
} from "lucide-react"

type SubPage = "main" | "mode-rules" | "contact-us" | "data-management"
type ShareMode = "personal" | "professional" | "custom"

const socialPlatforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, placeholder: "@username" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, placeholder: "linkedin.com/in/username" },
  { id: "twitter", name: "Twitter/X", icon: Globe, placeholder: "@username" },
  { id: "email", name: "Email", icon: Mail, placeholder: "you@example.com" },
  { id: "phone", name: "Phone", icon: Phone, placeholder: "+1 (555) 123-4567" },
  { id: "github", name: "GitHub", icon: Github, placeholder: "github.com/username" },
  { id: "website", name: "Website", icon: Globe, placeholder: "https://yoursite.com" },
]

interface SocialInputProps {
  platform: (typeof socialPlatforms)[number]
  value: string
  isSaved: boolean
  onChangeValue: (id: string, value: string) => void
  onSave: (id: string) => void
}

const SocialInput = memo(function SocialInput({ platform, value, isSaved, onChangeValue, onSave }: SocialInputProps) {
  const Icon = platform.icon
  const hasValue = value.trim().length > 0

  return (
    <div className="glass-card p-4 rounded-xl border border-white/15">
      {/* Icon and Label */}
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-white/70" />
        <span className="text-sm font-medium text-white">{platform.name}</span>
      </div>

      {/* Input and Add Button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChangeValue(platform.id, e.target.value)}
          placeholder={platform.placeholder}
          className="flex-1 bg-black/40 border border-white/20 px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:bg-black/50 text-sm"
          style={{
            transitionProperty: "border-color, background-color",
            transitionDuration: "200ms",
            transitionTimingFunction: "ease-out",
          }}
        />
        <button
          onClick={() => onSave(platform.id)}
          disabled={!hasValue}
          className={`px-5 py-3 rounded-lg flex items-center gap-2 text-sm font-medium ${
            isSaved
              ? "bg-green-500/30 border border-green-500/50 text-green-300"
              : hasValue
                ? "bg-white/25 border border-white/30 text-white hover:bg-white/35 hover:border-white/40"
                : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
          }`}
          style={{
            transitionProperty: "background-color, border-color, color",
            transitionDuration: "200ms",
            transitionTimingFunction: "ease-out",
          }}
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isSaved ? "Saved" : "Add"}</span>
        </button>
      </div>
    </div>
  )
})

export function SettingsPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<SubPage>("main")
  const [userName, setUserName] = useState("Zaid Khayyat")
  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState(userName)

  // Social links state
  const [links, setLinks] = useState<Record<string, string>>({})
  const [savedLinks, setSavedLinks] = useState<Record<string, boolean>>({})

  // Mode rules state
  const [activeModeRule, setActiveModeRule] = useState<ShareMode>("personal")
  const [modeAssignments, setModeAssignments] = useState<Record<ShareMode, string[]>>({
    personal: ["instagram", "phone"],
    professional: ["linkedin", "email", "github"],
    custom: [],
  })

  const handleLinkChange = useCallback((id: string, value: string) => {
    setLinks((prev) => ({ ...prev, [id]: value }))
    setSavedLinks((prev) => ({ ...prev, [id]: false }))
  }, [])

  const handleSaveLink = useCallback((id: string) => {
    setLinks((prev) => {
      if (prev[id]?.trim()) {
        setSavedLinks((s) => ({ ...s, [id]: true }))
      }
      return prev
    })
  }, [])

  const handleNameSave = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim())
    }
    setEditingName(false)
  }

  const toggleSocialInMode = (socialId: string) => {
    setModeAssignments((prev) => {
      const current = prev[activeModeRule]
      if (current.includes(socialId)) {
        return { ...prev, [activeModeRule]: current.filter((id) => id !== socialId) }
      } else {
        return { ...prev, [activeModeRule]: [...current, socialId] }
      }
    })
  }

  const navigateTo = (page: SubPage) => {
    setCurrentPage(page)
    setMenuOpen(false)
  }

  // Main Settings View
  const MainView = () => (
    <div className="flex-1 flex flex-col px-6 pt-6 pb-24 overflow-y-auto">
      {/* Header with Name, Pencil, and Hamburger */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={handleNameSave}
                onKeyDown={(e) => e.key === "Enter" && handleNameSave()}
                autoFocus
                className="bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-xl font-bold text-white focus:outline-none focus:border-white/40"
              />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white">{userName}</h1>
              <button
                onClick={() => {
                  setTempName(userName)
                  setEditingName(true)
                }}
                className="p-2 rounded-lg hover:bg-white/10 transition-all"
              >
                <Pencil className="w-4 h-4 text-white/60" />
              </button>
            </>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="midnight-glass p-3 rounded-xl"
          style={{
            transitionProperty: "background-color",
            transitionDuration: "200ms",
            transitionTimingFunction: "ease-out",
          }}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Social Links Input Section */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white mb-2">Your Links</h3>
        <p className="text-sm font-light text-white/50 mb-4">Add your social handles and contact info</p>

        <div className="space-y-4">
          {socialPlatforms.map((platform) => (
            <SocialInput
              key={platform.id}
              platform={platform}
              value={links[platform.id] || ""}
              isSaved={savedLinks[platform.id] || false}
              onChangeValue={handleLinkChange}
              onSave={handleSaveLink}
            />
          ))}
        </div>
      </div>

      {/* Hamburger Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

          {/* Menu Panel */}
          <div
            className="relative w-72 h-full bg-black/80 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col"
            style={{
              animation: "slideInRight 0.3s ease-out",
            }}
          >
            <style>{`
              @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
            `}</style>

            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end p-2 rounded-lg hover:bg-white/10 transition-all mb-6"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Menu Items */}
            <div className="space-y-3">
              <button
                onClick={() => navigateTo("mode-rules")}
                className="w-full glass-card p-4 rounded-xl border border-white/15 flex items-center gap-3 hover:bg-white/10 transition-all text-left"
              >
                <Sliders className="w-5 h-5 text-white/70" />
                <span className="font-medium text-white">Mode Rules</span>
              </button>

              <button
                onClick={() => navigateTo("contact-us")}
                className="w-full glass-card p-4 rounded-xl border border-white/15 flex items-center gap-3 hover:bg-white/10 transition-all text-left"
              >
                <MessageSquare className="w-5 h-5 text-white/70" />
                <span className="font-medium text-white">Contact Us</span>
              </button>

              <button
                onClick={() => navigateTo("data-management")}
                className="w-full glass-card p-4 rounded-xl border border-white/15 flex items-center gap-3 hover:bg-white/10 transition-all text-left"
              >
                <Trash2 className="w-5 h-5 text-red-400/70" />
                <span className="font-medium text-white">Data Management</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Mode Rules Subpage
  const ModeRulesView = () => {
    const modes: { id: ShareMode; label: string }[] = [
      { id: "personal", label: "Personal" },
      { id: "professional", label: "Professional" },
      { id: "custom", label: "Custom" },
    ]

    const addedSocials = socialPlatforms.filter((p) => links[p.id]?.trim())

    return (
      <div className="flex-1 flex flex-col px-6 pt-6 pb-24 overflow-y-auto">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage("main")}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Mode Rules</h2>

        {/* Mode Switcher (mimics Home Page) */}
        <div className="glass-card p-1.5 rounded-2xl border border-white/15 flex mb-8">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveModeRule(mode.id)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                activeModeRule === mode.id
                  ? "bg-white/20 text-white border border-white/20"
                  : "text-white/50 hover:text-white/80"
              }`}
              style={{
                transitionProperty: "background-color, color, border-color",
                transitionDuration: "200ms",
                transitionTimingFunction: "ease-out",
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Social Assignment List */}
        <div className="glass-card p-5 rounded-2xl border border-white/15">
          <p className="text-sm font-light text-white/50 mb-4">
            Select which links to share in <span className="text-white font-medium">{activeModeRule}</span> mode:
          </p>

          {addedSocials.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-4">Add some links first in the main settings page.</p>
          ) : (
            <div className="space-y-3">
              {addedSocials.map((platform) => {
                const Icon = platform.icon
                const isAssigned = modeAssignments[activeModeRule].includes(platform.id)

                return (
                  <button
                    key={platform.id}
                    onClick={() => toggleSocialInMode(platform.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all text-left"
                  >
                    {/* Bullet Point */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isAssigned ? "bg-green-500 border-green-500" : "border-white/30"
                      }`}
                    >
                      {isAssigned && <Check className="w-3 h-3 text-white" />}
                    </div>

                    <Icon className="w-5 h-5 text-white/70" />
                    <span className="font-medium text-white">{platform.name}</span>
                    <span className="text-xs text-white/40 ml-auto truncate max-w-[120px]">{links[platform.id]}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Contact Us Subpage
  const ContactUsView = () => {
    const [message, setMessage] = useState("")
    const [sent, setSent] = useState(false)

    const handleSend = () => {
      if (message.trim()) {
        setSent(true)
        setMessage("")
        setTimeout(() => setSent(false), 3000)
      }
    }

    return (
      <div className="flex-1 flex flex-col px-6 pt-6 pb-24 overflow-y-auto">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage("main")}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>

        <div className="glass-card p-5 rounded-2xl border border-white/15 space-y-4">
          {/* Company Info */}
          <div className="space-y-2 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-white/60" />
              <span className="text-sm text-white/80">support@qrshare.app</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-white/60" />
              <span className="text-sm text-white/80">+1 (555) 123-4567</span>
            </div>
          </div>

          {/* Message Area */}
          <div>
            <label className="text-sm font-medium text-white/70 mb-2 block">Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you?"
              rows={5}
              className="w-full bg-black/40 border border-white/20 px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 text-sm resize-none"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              sent
                ? "bg-green-500/30 border border-green-500/50 text-green-300"
                : message.trim()
                  ? "bg-white/25 border border-white/30 text-white hover:bg-white/35"
                  : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            {sent ? (
              <>
                <Check className="w-5 h-5" />
                Message Sent!
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </div>
    )
  }

  // Data Management Subpage
  const DataManagementView = () => {
    const [confirmReset, setConfirmReset] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const handleReset = () => {
      setLinks({})
      setSavedLinks({})
      setConfirmReset(false)
    }

    const handleDelete = () => {
      console.log("Account deleted")
      setConfirmDelete(false)
    }

    return (
      <div className="flex-1 flex flex-col px-6 pt-6 pb-24 overflow-y-auto">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage("main")}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Data Management</h2>

        <div className="space-y-4">
          {/* Reset Option */}
          <div className="glass-card p-5 rounded-2xl border border-white/15">
            <div className="flex items-start gap-3 mb-4">
              <RotateCcw className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <h3 className="font-bold text-white">Clear All Links</h3>
                <p className="text-sm font-light text-white/50 mt-1">
                  Wipes all your social links but keeps your account active.
                </p>
              </div>
            </div>

            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="w-full py-3 rounded-xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 font-medium hover:bg-yellow-500/30 transition-all"
              >
                Reset Links
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-3 rounded-lg glass-button text-white font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-lg bg-yellow-500/40 border border-yellow-500/60 text-yellow-200 font-medium text-sm hover:bg-yellow-500/50 transition-all"
                >
                  Confirm Reset
                </button>
              </div>
            )}
          </div>

          {/* Delete Option */}
          <div className="bg-red-500/10 border border-red-500/30 backdrop-blur-md p-5 rounded-2xl">
            <div className="flex items-start gap-3 mb-4">
              <Trash2 className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <h3 className="font-bold text-white">Delete Account</h3>
                <p className="text-sm font-light text-white/50 mt-1">
                  Permanently removes your account and all associated data. This cannot be undone.
                </p>
              </div>
            </div>

            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 font-medium hover:bg-red-500/30 transition-all"
              >
                Delete Account
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 py-3 rounded-lg glass-button text-white font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 rounded-lg bg-red-500/40 border border-red-500/60 text-red-200 font-medium text-sm hover:bg-red-500/50 transition-all"
                >
                  Confirm Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render current page
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {currentPage === "main" && <MainView />}
      {currentPage === "mode-rules" && <ModeRulesView />}
      {currentPage === "contact-us" && <ContactUsView />}
      {currentPage === "data-management" && <DataManagementView />}
    </div>
  )
}
