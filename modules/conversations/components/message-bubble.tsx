import { cn } from "@/lib/utils"
import type { Message } from "../types/message"
import { MessageReplyPreview } from "./message-reply-preview"
import { MessageImage } from "./message-image"
import { MessageVideo } from "./message-video"
import { MessageAudio } from "./message-audio"
import { MessageBubbleStatus } from "./message-bubble-status"

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
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
      style={{ animation: "msgIn 0.18s ease-out both" }}
    >
      {/* Avatar (incoming only) */}
      {!isOutgoing && (
        <div className="shrink-0 w-7 h-7 rounded-full overflow-hidden mb-0.5 bg-primary/10 flex items-center justify-center">
          {message.senderAvatarUrl ? (
            <img src={message.senderAvatarUrl} alt={message.senderName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] font-bold text-primary">
              {message.senderName[0]}
            </span>
          )}
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "relative px-3 py-2 rounded-2xl shadow-sm",
          isOutgoing
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-card text-foreground rounded-bl-sm border border-border",
          isMedia && "px-2 py-2"
        )}
      >
        {message.replyTo && (
          <MessageReplyPreview reply={message.replyTo} isOutgoing={isOutgoing} />
        )}

        {message.type === "text" && message.content && (
          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
            {message.content}
          </p>
        )}
        {message.type === "image" && (
          <MessageImage
            src={message.mediaUrl}
            thumbnailUrl={message.thumbnailUrl}
            messageId={message.id}
            caption={message.caption}
            isOutgoing={isOutgoing}
          />
        )}
        {message.type === "video" && (
          <MessageVideo
            thumbnailUrl={message.thumbnailUrl}
            mediaUrl={message.mediaUrl}
            messageId={message.id}
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
            messageId={message.id}
          />
        )}

        {/* Timestamp + Status */}
        <div className="flex items-center gap-1 mt-1 justify-end">
          <span
            className={cn(
              "text-[10px] tabular-nums",
              isOutgoing ? "text-primary-foreground/60" : "text-muted-foreground"
            )}
          >
            {formatTime(message.sentAt)}
          </span>
          {isOutgoing && <MessageBubbleStatus status={message.status} />}
        </div>
      </div>
    </div>
  )
}
