"use client"

import { useState } from "react"
import { Play, Download } from "lucide-react"
import { cn } from "@/lib/utils"

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

interface MessageVideoProps {
  thumbnailUrl?: string
  mediaUrl?: string
  caption?: string
  duration?: number
  isOutgoing: boolean
}

export function MessageVideo({ thumbnailUrl, mediaUrl, caption, duration, isOutgoing }: MessageVideoProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative max-w-[280px] rounded-xl overflow-hidden group">
        {!playing ? (
          <>
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt="Vídeo"
                className="w-full max-w-[280px] object-cover rounded-xl"
                style={{ aspectRatio: "16/9" }}
              />
            ) : (
              <div
                className="w-[280px] bg-[oklch(0.18_0.04_150)] rounded-xl flex items-center justify-center"
                style={{ aspectRatio: "16/9" }}
              >
                <Play className="w-8 h-8 text-[oklch(0.45_0.08_148)]" />
              </div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl">
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="w-12 h-12 rounded-full bg-black/60 border border-white/30 flex items-center justify-center text-white hover:bg-black/80 hover:scale-105 transition-all"
                aria-label="Reproduzir vídeo"
              >
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              </button>
            </div>
            {duration !== undefined && (
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white bg-black/60 rounded px-1.5 py-0.5">
                {formatDuration(duration)}
              </span>
            )}
            {mediaUrl && (
              <a
                href={mediaUrl}
                download
                onClick={(e) => e.stopPropagation()}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all"
                aria-label="Baixar vídeo"
              >
                <Download className="w-3.5 h-3.5" />
              </a>
            )}
          </>
        ) : (
          <video
            src={mediaUrl}
            controls
            autoPlay
            className="w-full max-w-[280px] rounded-xl"
            style={{ aspectRatio: "16/9" }}
          />
        )}
      </div>
      {caption && (
        <p
          className={cn(
            "text-xs leading-relaxed max-w-[280px]",
            isOutgoing ? "text-white/80" : "text-[oklch(0.75_0.02_150)]"
          )}
        >
          {caption}
        </p>
      )}
    </div>
  )
}
