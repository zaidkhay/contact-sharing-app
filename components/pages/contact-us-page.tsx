"use client"

import type React from "react"

import { useState } from "react"
import { SubpageTemplate } from "@/components/subpage-template"
import { Send } from "lucide-react"

interface ContactUsPageProps {
  onBack: () => void
}

export function ContactUsPage({ onBack }: ContactUsPageProps) {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ email: "", subject: "", message: "" })
    }, 2000)
  }

  return (
    <SubpageTemplate title="Contact Us" onBack={onBack}>
      <div className="space-y-6 max-w-md">
        {submitted ? (
          <div className="glass-card p-6 rounded-xl text-center space-y-2">
            <p className="text-lg font-semibold text-white/95">Thank you!</p>
            <p className="text-sm text-white/60">Your message has been sent. We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full glass-button px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full glass-button px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none"
                placeholder="What is this about?"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full glass-button px-4 py-3 rounded-lg text-white placeholder:text-white/30 focus:outline-none min-h-32 resize-none"
                placeholder="Tell us your feedback or question..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full glass-button py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:bg-white/15 transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        )}
      </div>
    </SubpageTemplate>
  )
}
