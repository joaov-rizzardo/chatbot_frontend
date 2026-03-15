import { cn } from "@/lib/utils"
import type { Message } from "../types/message"
import { MessageReplyPreview } from "./message-reply-preview"
import { MessageImage } from "./message-image"
import { MessageVideo } from "./message-video"
import { MessageAudio } from "./message-audio"
import { Check, CheckCheck } from "lucide-react"

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
}

function StatusIcon({ status }: { status: Message["status"] }) {
  if (status === "sent") return <Check className="w-3 h-3 text-white/50" />
  if (status === "delivered") return <CheckCheck className="w-3 h-3 text-white/60" />
  if (status === "read") return <CheckCheck className="w-3 h-3 text-[oklch(0.72_0.22_200)]" />
  return null
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutgoing = message.direction === "outgoing"
  const isMedia = message.type !== "text"

  return (
    <div
      className={cn(
        "flex gap-2 items-end max-w-[75%]",
        isOutgoing ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
      )}
      style={{
        animation: "msgIn 0.18s ease-out both",
      }}
    >
      {/* Avatar (incoming only) */}
      {!isOutgoing && (
        <div className="shrink-0 w-7 h-7 rounded-full overflow-hidden mb-0.5 bg-[oklch(0.25_0.06_148)] flex items-center justify-center">
          {message.senderAvatarUrl ? (
            <img src={message.senderAvatarUrl} alt={message.senderName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] font-bold text-[oklch(0.75_0.12_148)]">
              {message.senderName[0]}
            </span>
          )}
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "relative px-3 py-2 rounded-2xl",
          isOutgoing
            ? "bg-[oklch(0.46_0.16_145)] text-white rounded-br-sm"
            : "bg-[oklch(0.18_0.04_150)] text-[oklch(0.88_0.02_150)] rounded-bl-sm",
          isMedia && "px-2 py-2"
        )}
      >
        {/* Reply preview */}
        {message.replyTo && (
          <MessageReplyPreview reply={message.replyTo} isOutgoing={isOutgoing} />
        )}

        {/* Content */}
        {message.type === "text" && message.content && (
          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
            {message.content}
          </p>
        )}
        {message.type === "image" && (
          <MessageImage
            src={message.mediaUrl ?? ""}
            caption={message.caption}
            isOutgoing={isOutgoing}
          />
        )}
        {message.type === "video" && (
          <MessageVideo
            thumbnailUrl={message.thumbnailUrl}
            mediaUrl={message.mediaUrl}
            caption={message.caption}
            duration={message.duration}
            isOutgoing={isOutgoing}
          />
        )}
        {message.type === "audio" && (
          <MessageAudio
            duration={message.duration}
            isOutgoing={isOutgoing}
            mediaUrl={message.mediaUrl}
          />
        )}

        {/* Timestamp + Status */}
        <div
          className={cn(
            "flex items-center gap-1 mt-1",
            isOutgoing ? "justify-end" : "justify-end"
          )}
        >
          <span
            className={cn(
              "text-[10px] tabular-nums",
              isOutgoing ? "text-white/55" : "text-[oklch(0.48_0.03_150)]"
            )}
          >
            {formatTime(message.sentAt)}
          </span>
          {isOutgoing && <StatusIcon status={message.status} />}
        </div>
      </div>
    </div>
  )
}
