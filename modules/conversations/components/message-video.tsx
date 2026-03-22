"use client"

import { useState } from "react"
import { Play, Download, Loader2, VideoIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { clientFetch } from "@/lib/client-fetch"

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

interface MessageVideoProps {
  thumbnailUrl?: string
  mediaUrl?: string
  messageId?: string
  caption?: string
  duration?: number
  isOutgoing: boolean
}

export function MessageVideo({ thumbnailUrl, mediaUrl, messageId, caption, duration, isOutgoing }: MessageVideoProps) {
  const [playing, setPlaying] = useState(false)
  const [resolvedUrl, setResolvedUrl] = useState<string | undefined>(mediaUrl)
  const [thumbFailed, setThumbFailed] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!messageId || isDownloading) return
    setIsDownloading(true)
    try {
      const res = await clientFetch(`/api/message/${messageId}/media`)
      if (!res.ok) throw new Error("Falha ao baixar mídia")
      const data = await res.json()
      if (data?.media?.url) {
        setResolvedUrl(data.media.url)
      }
    } catch {
      // silently fail — button remains available to retry
    } finally {
      setIsDownloading(false)
    }
  }

  // Always use w-[280px] on the container so the absolute overlay has a reliable
  // containing block regardless of whether the thumbnail image loads or not.
  const showThumbnail = !!thumbnailUrl && !thumbFailed

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative w-[280px] rounded-xl overflow-hidden group" style={{ aspectRatio: "16/9" }}>
        {!playing ? (
          <>
            {showThumbnail ? (
              <img
                src={thumbnailUrl}
                alt="Vídeo"
                onError={() => setThumbFailed(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <VideoIcon className="w-10 h-10 text-muted-foreground/40" />
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
              {resolvedUrl ? (
                // Media available — play button
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="w-12 h-12 rounded-full bg-black/60 border border-white/30 flex items-center justify-center text-white hover:bg-black/80 hover:scale-105 transition-all"
                  aria-label="Reproduzir vídeo"
                >
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                </button>
              ) : (
                // No media yet — download button
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-12 h-12 rounded-full bg-black/60 border border-white/30 flex items-center justify-center text-white hover:bg-black/80 hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-label="Baixar vídeo"
                >
                  {isDownloading
                    ? <Loader2 className="w-5 h-5 animate-spin" />
                    : <Download className="w-5 h-5" />
                  }
                </button>
              )}
            </div>

            {duration !== undefined && (
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white bg-black/60 rounded px-1.5 py-0.5">
                {formatDuration(duration)}
              </span>
            )}

            {/* Download to file (only when media is available) */}
            {resolvedUrl && (
              <a
                href={resolvedUrl}
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
            src={resolvedUrl}
            controls
            autoPlay
            className="w-full h-full rounded-xl"
          />
        )}
      </div>
      {caption && (
        <p className={cn("text-xs leading-relaxed max-w-[280px]", isOutgoing ? "text-primary-foreground/80" : "text-foreground")}>
          {caption}
        </p>
      )}
    </div>
  )
}
