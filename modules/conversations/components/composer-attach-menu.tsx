"use client"

import { Image, Film, Music, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComposerAttachMenuProps {
  onClose: () => void
}

export function ComposerAttachMenu({ onClose }: ComposerAttachMenuProps) {
  const options = [
    { icon: <Image className="w-4 h-4" />, label: "Imagem", color: "text-blue-500" },
    { icon: <Film className="w-4 h-4" />, label: "Vídeo", color: "text-purple-500" },
    { icon: <Music className="w-4 h-4" />, label: "Áudio", color: "text-green-600" },
    { icon: <Paperclip className="w-4 h-4" />, label: "Arquivo", color: "text-amber-500" },
  ]

  return (
    <div
      className="absolute bottom-full mb-2 left-0 flex flex-col gap-1 bg-card border border-border rounded-xl p-2 shadow-lg z-10"
      style={{ animation: "popIn 0.12s ease-out both" }}
    >
      {options.map(({ icon, label, color }) => (
        <button
          key={label}
          type="button"
          onClick={onClose}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium hover:bg-muted transition-colors w-full text-left",
            color
          )}
        >
          {icon}
          <span className="text-foreground">{label}</span>
        </button>
      ))}
    </div>
  )
}
