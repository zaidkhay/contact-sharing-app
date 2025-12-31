"use client"

import { useState } from "react"
import { SubpageTemplate } from "@/components/subpage-template"
import { Trash2 } from "lucide-react"

interface AccountProfilePageProps {
  onBack: () => void
}

export function AccountProfilePage({ onBack }: AccountProfilePageProps) {
  const [name, setName] = useState("Zaid Khayyat")
  const [bio, setBio] = useState("Creative digital designer and developer")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    console.log("User data deleted")
    setShowDeleteConfirm(false)
    onBack()
  }

  return (
    <SubpageTemplate title="Account Profile" onBack={onBack}>
      <div className="space-y-6 max-w-md">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full glass-button px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        {/* Bio Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full glass-button px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none min-h-24 resize-none"
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Save Button */}
        <button className="w-full glass-button py-3 rounded-lg text-white font-medium mt-6">Save Changes</button>

        {/* Delete Data Section */}
        <div className="pt-6 border-t border-white/10">
          {!showDeleteConfirm ? (
            <button
              onClick={handleDelete}
              className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 px-4 py-3 rounded-lg text-red-300 font-medium flex items-center justify-center gap-2 transition-colors"
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
                  className="flex-1 glass-button py-2 rounded-lg text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-500/30 border border-red-500/50 py-2 rounded-lg text-red-300 font-medium"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SubpageTemplate>
  )
}
