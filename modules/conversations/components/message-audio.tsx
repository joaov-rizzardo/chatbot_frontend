"use client"

import { useState, useRef } from "react"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

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
}

export function MessageAudio({ duration = 30, isOutgoing, mediaUrl }: MessageAudioProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
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

  const playedCount = Math.round(progress * waveform.length)

  return (
    <div className="flex items-center gap-3 w-[240px]">
      {/* Play/Pause */}
      <button
        type="button"
        onClick={mediaUrl ? toggle : undefined}
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all",
          isOutgoing
            ? "bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground"
            : "bg-primary hover:bg-primary/90 text-primary-foreground"
        )}
        aria-label={playing ? "Pausar" : "Reproduzir áudio"}
      >
        {playing
          ? <Pause className="w-4 h-4" fill="currentColor" />
          : <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
        }
      </button>

      {/* Waveform */}
      <div className="flex-1 flex items-center gap-[2px] h-8">
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

      {mediaUrl && (
        <audio
          ref={audioRef}
          src={mediaUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          preload="metadata"
        />
      )}
    </div>
  )
}
