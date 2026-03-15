import { cn } from "@/lib/utils"
import type { ReplyReference } from "../types/message"
import { Image, Video, Mic, FileText } from "lucide-react"

const TYPE_ICONS: Record<string, React.ReactNode> = {
  image: <Image className="w-3 h-3" />,
  video: <Video className="w-3 h-3" />,
  audio: <Mic className="w-3 h-3" />,
  document: <FileText className="w-3 h-3" />,
  text: null,
}

interface MessageReplyPreviewProps {
  reply: ReplyReference
  isOutgoing: boolean
}

export function MessageReplyPreview({ reply, isOutgoing }: MessageReplyPreviewProps) {
  return (
    <div
      className={cn(
        "flex gap-2 rounded-lg px-3 py-2 mb-2 text-xs border-l-2",
        isOutgoing
          ? "bg-primary-foreground/10 border-primary-foreground/40"
          : "bg-muted border-primary"
      )}
    >
      {reply.thumbnailUrl && (
        <img
          src={reply.thumbnailUrl}
          alt=""
          className="w-8 h-8 rounded object-cover shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-semibold mb-0.5 truncate",
            isOutgoing ? "text-primary-foreground/80" : "text-primary"
          )}
        >
          {reply.senderName}
        </p>
        <p
          className={cn(
            "truncate flex items-center gap-1",
            isOutgoing ? "text-primary-foreground/60" : "text-muted-foreground"
          )}
        >
          {TYPE_ICONS[reply.type]}
          {reply.content}
        </p>
      </div>
    </div>
  )
}
