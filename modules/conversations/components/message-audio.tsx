"use client"

import { useState, useRef } from "react"
import { Play, Pause, Download, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { clientFetch } from "@/lib/client-fetch"

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

// Generates a deterministic-looking waveform from the duration
function generateWaveform(duration: number = 30, bars = 36): number[] {
  const seed = duration * 7
  return Array.from({ length: bars }, (_, i) => {
    const t = i / bars
    const base = Math.sin(t * Math.PI * 3 + seed) * 0.3 + 0.5
    const detail = Math.sin(t * Math.PI * 11 + seed * 2) * 0.2
    const peak = Math.sin(t * Math.PI * 1.5) * 0.3
    return Math.max(0.08, Math.min(1, base + detail + peak))
  })
}

interface MessageAudioProps {
  duration?: number
  isOutgoing: boolean
  mediaUrl?: string
  messageId?: string
}

export function MessageAudio({ duration = 30, isOutgoing, mediaUrl, messageId }: MessageAudioProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [resolvedUrl, setResolvedUrl] = useState<string | undefined>(mediaUrl)
  const [isDownloading, setIsDownloading] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const waveform = generateWaveform(duration)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying((v) => !v)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setProgress(audioRef.current.currentTime / (audioRef.current.duration || 1))
  }

  const handleEnded = () => {
    setPlaying(false)
    setProgress(0)
  }

  const handleDownload = async () => {
    if (!messageId || isDownloading) return
    setIsDownloading(true)
    try {
      const res = await clientFetch(`/api/message/${messageId}/media`)
      if (!res.ok) throw new Error("Falha ao baixar áudio")
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

  const playedCount = Math.round(progress * waveform.length)

  const buttonBase = cn(
    "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all",
    isOutgoing
      ? "bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground"
      : "bg-primary hover:bg-primary/90 text-primary-foreground"
  )

  return (
    <div className="flex items-center gap-3 w-[240px]">
      {resolvedUrl ? (
        // Media available — play/pause button
        <button
          type="button"
          onClick={toggle}
          className={buttonBase}
          aria-label={playing ? "Pausar" : "Reproduzir áudio"}
        >
          {playing
            ? <Pause className="w-4 h-4" fill="currentColor" />
            : <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
          }
        </button>
      ) : (
        // No media yet — download button
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className={cn(buttonBase, "disabled:opacity-60 disabled:cursor-not-allowed")}
          aria-label="Baixar áudio"
        >
          {isDownloading
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <Download className="w-4 h-4" />
          }
        </button>
      )}

      {/* Waveform */}
      <div className={cn("flex-1 flex items-center gap-[2px] h-8", !resolvedUrl && "opacity-40")}>
        {waveform.map((height, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-full transition-all duration-100",
              i < playedCount
                ? isOutgoing
                  ? "bg-primary-foreground"
                  : "bg-primary"
                : isOutgoing
                ? "bg-primary-foreground/35"
                : "bg-primary/25"
            )}
            style={{ height: `${Math.round(height * 100)}%` }}
          />
        ))}
      </div>

      {/* Duration */}
      <span
        className={cn(
          "text-[10px] font-mono shrink-0 tabular-nums",
          isOutgoing ? "text-primary-foreground/70" : "text-muted-foreground"
        )}
      >
        {formatDuration(duration)}
      </span>

      {resolvedUrl && (
        <audio
          ref={audioRef}
          src={resolvedUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          preload="metadata"
        />
      )}
    </div>
  )
}
