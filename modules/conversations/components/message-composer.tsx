"use client"

import { Send, Smile, Paperclip, Mic, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { ComposerButton } from "./composer-button"
import { ComposerRecordingBar } from "./composer-recording-bar"
import { ComposerAttachMenu } from "./composer-attach-menu"
import { useMessageComposer } from "../hooks/use-message-composer"

interface MessageComposerProps {
  onSend?: (text: string) => void
}

export function MessageComposer({ onSend }: MessageComposerProps) {
  const {
    text,
    setText,
    recording,
    setRecording,
    recordingSeconds,
    showAttachMenu,
    setShowAttachMenu,
    textareaRef,
    attachRef,
    formatRecording,
    handleSend,
    handleKeyDown,
  } = useMessageComposer(onSend)

  if (recording) {
    return (
      <ComposerRecordingBar
        recordingSeconds={recordingSeconds}
        formatRecording={formatRecording}
        onCancel={() => setRecording(false)}
        onSend={() => setRecording(false)}
      />
    )
  }

  return (
    <div className="px-4 py-3 bg-card border-t border-border shrink-0">
      {/* Attach Menu Popup */}
      <div ref={attachRef} className="relative">
        {showAttachMenu && (
          <ComposerAttachMenu onClose={() => setShowAttachMenu(false)} />
        )}
      </div>

      {/* Main composer */}
      <div className="flex flex-col gap-2">
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

          <ComposerButton
            icon={<Bot className="w-4 h-4" />}
            label="Resposta do chatbot"
            className="text-primary/70 hover:text-primary hover:bg-primary/10"
          />

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
