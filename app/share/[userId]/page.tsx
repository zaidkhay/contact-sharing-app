import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Linkedin, Mail, Download, Smartphone } from "lucide-react"
import Link from "next/link"

// External landing page for when someone scans a QR code
export default function PublicSharePage({ params }: { params: { userId: string } }) {
  // In production, this would fetch real user data based on userId
  const userData = {
    name: "Zaid Khayyat",
    bio: "Product Designer & Developer. Building beautiful digital experiences.",
    avatar: null,
    sharedLinks: [
      { type: "linkedin", label: "LinkedIn", value: "linkedin.com/in/zaid-khayyat", icon: Linkedin },
      { type: "email", label: "Email", value: "zaidkhayyat0@gmail.com", icon: Mail },
    ],
  }

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Main Profile Card */}
        <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center">
          {/* Avatar */}
          <Avatar className="w-24 h-24 border-2 border-white/20 mb-4">
            <AvatarImage src={userData.avatar || undefined} alt={userData.name} />
            <AvatarFallback className="bg-white/10 text-white text-2xl font-bold">
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          {/* Name & Bio */}
          <h1 className="text-2xl font-bold text-white mb-2">{userData.name}</h1>
          <p className="text-sm text-white/60 leading-relaxed mb-6">{userData.bio}</p>

          {/* Shared Links */}
          <div className="w-full space-y-3 mb-6">
            {userData.sharedLinks.map((link, index) => (
              <a
                key={index}
                href={link.type === "email" ? `mailto:${link.value}` : `https://${link.value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 transition-all duration-300 hover:bg-white/10 group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                  <link.icon className="w-5 h-5 text-white/80" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs text-white/50 uppercase tracking-wider">{link.label}</p>
                  <p className="text-sm text-white/90">{link.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Save Contact Button */}
          <button className="w-full py-4 rounded-xl glass-button flex items-center justify-center gap-3 text-white font-semibold transition-all">
            <Download className="w-5 h-5" />
            Save Contact
          </button>
        </div>

        {/* Get the App Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <Smartphone className="w-4 h-4" />
            Get the ConnectCard App
          </Link>
        </div>

        {/* Powered by footer */}
        <p className="text-xs text-white/30 text-center mt-4">Powered by ConnectCard</p>
      </div>
    </div>
  )
}
