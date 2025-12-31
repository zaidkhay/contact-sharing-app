"use client"

import { useState } from "react"
import { ModeToggle, type ShareMode } from "@/components/mode-toggle"
import { ModePreviewCard } from "@/components/mode-preview-card"
import { FABButton } from "@/components/fab-button"
import { SettingsMenu } from "@/components/settings-menu"
import { AccountProfilePage } from "@/components/pages/account-profile-page"
import { ModeRulesPage } from "@/components/pages/mode-rules-page"
import { ContactUsPage } from "@/components/pages/contact-us-page"

type SettingsPage = null | "account" | "mode-rules" | "contact"

export function HomePage() {
  const [activeMode, setActiveMode] = useState<ShareMode>("professional")
  const [currentPage, setCurrentPage] = useState<SettingsPage>(null)

  const handleSettingsNavigate = (page: string) => {
    setCurrentPage(page as SettingsPage)
  }

  const handleBackToHome = () => {
    setCurrentPage(null)
  }

  if (currentPage === "account") {
    return <AccountProfilePage onBack={handleBackToHome} />
  }
  if (currentPage === "mode-rules") {
    return <ModeRulesPage onBack={handleBackToHome} />
  }
  if (currentPage === "contact") {
    return <ContactUsPage onBack={handleBackToHome} />
  }

  return (
    <div className="flex-1 px-6 pt-6 pb-24">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-sm text-white/40 tracking-wide">Welcome back</p>
          <h1 className="text-2xl font-bold text-white/95 mt-1">Zaid Khayyat</h1>
        </div>
        <SettingsMenu onNavigate={handleSettingsNavigate} />
      </div>

      {/* Mode Toggle Buttons */}
      <div className="mb-6">
        <ModeToggle activeMode={activeMode} onModeChange={setActiveMode} />
      </div>

      {/* Dynamic Preview Area */}
      <div className="transition-all duration-500">
        <ModePreviewCard mode={activeMode} />
      </div>

      {/* FAB for QR Scanning */}
      <FABButton onClick={() => console.log("Open QR Scanner")} />
    </div>
  )
}
