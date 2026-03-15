"use client"

import { useState, useRef, useEffect } from "react"
import {
  Send,
  Smile,
  Paperclip,
  Image,
  Mic,
  Bot,
  X,
  Film,
  Music,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ComposerButton } from "./composer-button"

interface MessageComposerProps {
  onSend?: (text: string) => void
}

export function MessageComposer({ onSend }: MessageComposerProps) {
  const [text, setText] = useState("")
  const [recording, setRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const attachRef = useRef<HTMLDivElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [text])

  // Recording timer
  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => setRecordingSeconds((s) => s + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setRecordingSeconds(0)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [recording])

  // Close attach menu on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (attachRef.current && !attachRef.current.contains(e.target as Node)) {
        setShowAttachMenu(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const formatRecording = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend?.(trimmed)
    setText("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (recording) {
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

          {/* Cancel */}
          <button
            type="button"
            onClick={() => setRecording(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            aria-label="Cancelar gravação"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Send recording */}
          <button
            type="button"
            onClick={() => setRecording(false)}
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

  return (
    <div className="px-4 py-3 bg-card border-t border-border shrink-0">
      {/* Attach Menu Popup */}
      <div ref={attachRef} className="relative">
        {showAttachMenu && (
          <div
            className="absolute bottom-full mb-2 left-0 flex flex-col gap-1 bg-card border border-border rounded-xl p-2 shadow-lg z-10"
            style={{ animation: "popIn 0.12s ease-out both" }}
          >
            {[
              { icon: <Image className="w-4 h-4" />, label: "Imagem", color: "text-blue-500" },
              { icon: <Film className="w-4 h-4" />, label: "Vídeo", color: "text-purple-500" },
              { icon: <Music className="w-4 h-4" />, label: "Áudio", color: "text-green-600" },
              { icon: <Paperclip className="w-4 h-4" />, label: "Arquivo", color: "text-amber-500" },
            ].map(({ icon, label, color }) => (
              <button
                key={label}
                type="button"
                onClick={() => setShowAttachMenu(false)}
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
        )}
      </div>

      {/* Main composer */}
      <div className="flex flex-col gap-2">
        {/* Textarea */}
        <div
          className={cn(
            "flex items-end gap-2 bg-background rounded-2xl px-3 py-2",
            "border border-border",
            "focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20",
            "transition-all"
          )}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escreva uma mensagem... (Enter para enviar)"
            rows={1}
            className={cn(
              "flex-1 bg-transparent text-sm resize-none outline-none py-1",
              "text-foreground placeholder:text-muted-foreground",
              "leading-relaxed min-h-[28px] max-h-[160px]"
            )}
          />
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-1">
          {/* Left actions */}
          <div className="flex items-center gap-0.5">
            <ComposerButton
              icon={<Smile className="w-4 h-4" />}
              label="Emoji"
              className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
            />
            <ComposerButton
              icon={<Paperclip className="w-4 h-4" />}
              label="Anexar arquivo"
              active={showAttachMenu}
              onClick={() => setShowAttachMenu((v) => !v)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted"
            />
            <ComposerButton
              icon={<Mic className="w-4 h-4" />}
              label="Gravar áudio"
              onClick={() => setRecording(true)}
              className="text-muted-foreground hover:text-green-600 hover:bg-green-50"
            />
          </div>

          <div className="flex-1" />

          {/* AI Chatbot */}
          <ComposerButton
            icon={<Bot className="w-4 h-4" />}
            label="Resposta do chatbot"
            className="text-primary/70 hover:text-primary hover:bg-primary/10"
          />

          {/* Send */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim()}
            className={cn(
              "ml-1 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200",
              text.trim()
                ? "bg-primary text-primary-foreground hover:bg-primary/90 scale-100 shadow-sm"
                : "bg-muted text-muted-foreground scale-90 cursor-not-allowed"
            )}
            aria-label="Enviar mensagem"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: translateY(8px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
