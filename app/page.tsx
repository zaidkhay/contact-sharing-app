"use client"

import { useState } from "react"
import { BottomNav, type NavPage } from "@/components/bottom-nav"
import { HomePage } from "@/components/pages/home-page"
import { ContactsPage } from "@/components/pages/contacts-page"
import { SettingsPage } from "@/components/pages/settings-page"

export default function App() {
  const [activePage, setActivePage] = useState<NavPage>("home")

  return (
    <div className="min-h-screen mesh-gradient">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Page Content */}
        {activePage === "home" && <HomePage />}
        {activePage === "contacts" && <ContactsPage />}
        {activePage === "settings" && <SettingsPage />}

        {/* Bottom Navigation */}
        <BottomNav activePage={activePage} onPageChange={setActivePage} />
      </div>
    </div>
  )
}
