"use client"

import { Send, X } from "lucide-react"

interface ComposerRecordingBarProps {
  recordingSeconds: number
  formatRecording: (s: number) => string
  onCancel: () => void
  onSend: () => void
}

export function ComposerRecordingBar({
  recordingSeconds,
  formatRecording,
  onCancel,
  onSend,
}: ComposerRecordingBarProps) {
  return (
    <div className="px-4 py-3 bg-card border-t border-border shrink-0">
      <div className="flex items-center gap-3 bg-muted rounded-2xl px-4 py-3">
        <span className="relative w-3 h-3 flex items-center justify-center">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute" />
        </span>
        <span className="text-sm font-semibold text-red-500">Gravando...</span>
        <span className="text-sm font-mono tabular-nums text-muted-foreground">
          {formatRecording(recordingSeconds)}
        </span>

        {/* Fake animated waveform */}
        <div className="flex-1 flex items-center gap-[2px] h-5 overflow-hidden">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="flex-1 rounded-full bg-primary"
              style={{
                height: `${20 + Math.round(Math.random() * 80)}%`,
                animation: `waveBar 0.5s ease-in-out ${i * 0.04}s infinite alternate`,
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          aria-label="Cancelar gravação"
        >
          <X className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onSend}
          className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
          aria-label="Enviar áudio"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      <style>{`
        @keyframes waveBar {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}
