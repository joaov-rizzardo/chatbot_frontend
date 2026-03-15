"use client"

import { useState } from "react"
import { Download, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageImageProps {
  src: string
  caption?: string
  isOutgoing: boolean
}

export function MessageImage({ src, caption, isOutgoing }: MessageImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative group max-w-[280px] rounded-xl overflow-hidden">
        {!loaded && (
          <div className="w-[280px] h-[180px] bg-muted animate-pulse rounded-xl" />
        )}
        <img
          src={src}
          alt={caption ?? "Imagem"}
          onLoad={() => setLoaded(true)}
          className={cn(
            "max-w-full rounded-xl object-cover transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0 absolute inset-0"
          )}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            aria-label="Ampliar imagem"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <a
            href={src}
            download
            className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            aria-label="Baixar imagem"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
      {caption && (
        <p
          className={cn(
            "text-xs leading-relaxed max-w-[280px]",
            isOutgoing ? "text-primary-foreground/80" : "text-foreground"
          )}
        >
          {caption}
        </p>
      )}
    </div>
  )
}
