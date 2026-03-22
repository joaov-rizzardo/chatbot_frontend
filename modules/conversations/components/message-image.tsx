"use client"

import { useState } from "react"
import { Download, ZoomIn, Loader2, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { clientFetch } from "@/lib/client-fetch"

interface MessageImageProps {
  src?: string
  thumbnailUrl?: string
  messageId?: string
  caption?: string
  isOutgoing: boolean
}

export function MessageImage({ src, thumbnailUrl, messageId, caption, isOutgoing }: MessageImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [resolvedUrl, setResolvedUrl] = useState<string | undefined>(src)
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
      // silently fail — button will remain available to retry
    } finally {
      setIsDownloading(false)
    }
  }

  // Media is available: show the image with hover controls
  if (resolvedUrl) {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="relative group max-w-[280px] rounded-xl overflow-hidden">
          {!loaded && (
            <div className="w-[280px] h-[180px] bg-muted animate-pulse rounded-xl" />
          )}
          <img
            src={resolvedUrl}
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
              href={resolvedUrl}
              download
              className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              aria-label="Baixar imagem"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
        {caption && (
          <p className={cn("text-xs leading-relaxed max-w-[280px]", isOutgoing ? "text-primary-foreground/80" : "text-foreground")}>
            {caption}
          </p>
        )}
      </div>
    )
  }

  // No media yet: always use w-[280px] on the container so the absolute overlay
  // has a reliable containing block. The img fills it via w-full h-full.
  const showThumbnail = !!thumbnailUrl && !thumbFailed

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative w-[280px] rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {showThumbnail ? (
          <img
            src={thumbnailUrl}
            alt={caption ?? "Imagem"}
            onError={() => setThumbFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-muted-foreground/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-11 h-11 rounded-full bg-black/60 border border-white/30 flex items-center justify-center text-white hover:bg-black/80 hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Baixar imagem"
          >
            {isDownloading
              ? <Loader2 className="w-5 h-5 animate-spin" />
              : <Download className="w-5 h-5" />
            }
          </button>
        </div>
      </div>
      {caption && (
        <p className={cn("text-xs leading-relaxed max-w-[280px]", isOutgoing ? "text-primary-foreground/80" : "text-foreground")}>
          {caption}
        </p>
      )}
    </div>
  )
}
